
from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature, Favorite, PropertyInquiry, PropertyFeatureRelation
from users.serializers import AgentSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_primary']

class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['id', 'name']

class PropertyListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    agent_name = serializers.SerializerMethodField()
    area_name = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = ['id', 'title', 'property_type', 'status', 'price', 'bedrooms', 
                  'bathrooms', 'area_sqm', 'address', 'primary_image', 'agent_name',
                  'area_name', 'is_featured', 'features']
    
    def get_primary_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return self.context['request'].build_absolute_uri(primary.image.url)
        
        # If no primary image, return first image or None
        first_image = obj.images.first()
        if first_image:
            return self.context['request'].build_absolute_uri(first_image.image.url)
        return None
    
    def get_agent_name(self, obj):
        if obj.agent:
            return f"{obj.agent.user.first_name} {obj.agent.user.last_name}".strip()
        return None
    
    def get_area_name(self, obj):
        if obj.area:
            return obj.area.name
        return None
    
    def get_features(self, obj):
        features = PropertyFeatureRelation.objects.filter(property=obj).values_list('feature__name', flat=True)
        return list(features)

class PropertyDetailSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    features = serializers.SerializerMethodField()
    agent = AgentSerializer(read_only=True)
    area_name = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = ['id', 'title', 'description', 'property_type', 'status', 'price', 
                  'bedrooms', 'bathrooms', 'area_sqm', 'agent', 'area', 'area_name',
                  'address', 'latitude', 'longitude', 'is_featured', 'images',
                  'features', 'created_at', 'updated_at', 'is_favorited']
    
    def get_features(self, obj):
        features = PropertyFeatureRelation.objects.filter(property=obj).values_list('feature__name', flat=True)
        return list(features)
    
    def get_area_name(self, obj):
        if obj.area:
            return obj.area.name
        return None
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, property=obj).exists()
        return False

class PropertyCreateUpdateSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True, required=False
    )
    features = serializers.ListField(
        child=serializers.CharField(max_length=100),
        write_only=True, required=False
    )

    class Meta:
        model = Property
        fields = ['id', 'title', 'description', 'property_type', 'status', 'price', 
                  'bedrooms', 'bathrooms', 'area_sqm', 'agent', 'area', 
                  'address', 'latitude', 'longitude', 'is_featured', 'images',
                  'uploaded_images', 'features']
    
    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        features = validated_data.pop('features', [])
        
        property = Property.objects.create(**validated_data)
        
        # Add images
        for image in uploaded_images:
            PropertyImage.objects.create(
                property=property,
                image=image,
                is_primary=(image == uploaded_images[0])  # First uploaded image is primary
            )
        
        # Add features
        for feature_name in features:
            feature, _ = PropertyFeature.objects.get_or_create(name=feature_name)
            PropertyFeatureRelation.objects.create(property=property, feature=feature)
        
        return property
    
    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        features = validated_data.pop('features', [])
        
        # Update property fields
        instance = super().update(instance, validated_data)
        
        # Add new images
        if uploaded_images:
            for image in uploaded_images:
                PropertyImage.objects.create(
                    property=instance,
                    image=image
                )
        
        # Update features
        if features:
            # Remove existing features
            PropertyFeatureRelation.objects.filter(property=instance).delete()
            
            # Add new features
            for feature_name in features:
                feature, _ = PropertyFeature.objects.get_or_create(name=feature_name)
                PropertyFeatureRelation.objects.create(property=instance, feature=feature)
        
        return instance

class FavoriteSerializer(serializers.ModelSerializer):
    property_details = PropertyListSerializer(source='property', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'property', 'user', 'created_at', 'property_details']
        read_only_fields = ['user', 'created_at']
        extra_kwargs = {
            'property': {'write_only': True}
        }
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

class PropertyInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyInquiry
        fields = ['id', 'property', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['created_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)
