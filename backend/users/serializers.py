
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserRole, Agent

User = get_user_model()

class UserRoleSerializer(serializers.ModelSerializer):
    """Serializer for user roles."""
    
    class Meta:
        model = UserRole
        fields = ['role']

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""
    
    roles = UserRoleSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 
                  'profile_picture', 'roles', 'date_joined']
        read_only_fields = ['id', 'date_joined']
    
    def create(self, validated_data):
        """Create a new user with encrypted password and return it."""
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        # Add default user role
        UserRole.objects.create(user=user, role=UserRole.RoleChoices.USER)
        
        return user
    
    def update(self, instance, validated_data):
        """Update and return an existing user."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
        
        return user

class AgentSerializer(serializers.ModelSerializer):
    """Serializer for agent profiles."""
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Agent
        fields = ['id', 'user', 'bio', 'specialties', 'years_of_experience', 
                  'listings_count', 'sales_volume']
        read_only_fields = ['id', 'listings_count', 'sales_volume']

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'phone_number']
    
    def validate(self, attrs):
        """Validate that passwords match."""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        """Create a new user with encrypted password and return it."""
        validated_data.pop('password2')  # Remove password2 field
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        # Add default user role
        UserRole.objects.create(user=user, role=UserRole.RoleChoices.USER)
        
        return user
