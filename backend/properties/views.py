
from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, PropertyImage, PropertyFeature, Favorite, PropertyInquiry
from .serializers import (
    PropertyListSerializer, 
    PropertyDetailSerializer,
    PropertyCreateUpdateSerializer,
    PropertyImageSerializer,
    FavoriteSerializer,
    PropertyInquirySerializer
)
from users.models import UserRole

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner
        return obj.user == request.user

class IsAgentOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow agents or admins to access certain views.
    """
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        return UserRole.objects.filter(
            user=request.user,
            role__in=[UserRole.RoleChoices.AGENT, 
                     UserRole.RoleChoices.ADMIN, 
                     UserRole.RoleChoices.SUPERADMIN]
        ).exists()

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['property_type', 'status', 'bedrooms', 'bathrooms', 'area__id', 'is_featured']
    search_fields = ['title', 'description', 'address', 'area__name']
    ordering_fields = ['price', 'created_at', 'bedrooms', 'bathrooms', 'area_sqm']
    ordering = ['-created_at']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated, IsAgentOrAdmin]
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PropertyCreateUpdateSerializer
        return PropertyDetailSerializer
    
    def perform_create(self, serializer):
        # If agent not specified and user is an agent, set current user as agent
        if not serializer.validated_data.get('agent') and hasattr(self.request.user, 'agent_profile'):
            serializer.save(agent=self.request.user.agent_profile)
        else:
            serializer.save()
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_images(self, request, pk=None):
        property = self.get_object()
        
        # Check if user has permission
        if not (hasattr(request.user, 'agent_profile') and property.agent == request.user.agent_profile):
            if not UserRole.objects.filter(
                user=request.user,
                role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
            ).exists():
                return Response({'detail': 'You do not have permission to add images to this property.'}, 
                                status=status.HTTP_403_FORBIDDEN)
        
        # Upload images
        images = request.FILES.getlist('images')
        is_primary = request.data.get('is_primary', 'false').lower() == 'true'
        
        if not images:
            return Response({'detail': 'No images provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        for image in images:
            PropertyImage.objects.create(property=property, image=image, is_primary=is_primary)
            # Only first image is primary if multiple are uploaded
            is_primary = False
        
        return Response({'detail': 'Images uploaded successfully.'}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        property = self.get_object()
        user = request.user
        
        favorite = Favorite.objects.filter(user=user, property=property).first()
        
        if favorite:
            favorite.delete()
            return Response({'detail': 'Property removed from favorites.'}, status=status.HTTP_200_OK)
        else:
            Favorite.objects.create(user=user, property=property)
            return Response({'detail': 'Property added to favorites.'}, status=status.HTTP_201_CREATED)

class PropertyImageViewSet(viewsets.ModelViewSet):
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated, IsAgentOrAdmin]
        return [permission() for permission in permission_classes]
    
    def perform_update(self, serializer):
        # If setting as primary, unset any other primary images for this property
        if serializer.validated_data.get('is_primary', False):
            PropertyImage.objects.filter(
                property=serializer.instance.property, 
                is_primary=True
            ).exclude(id=serializer.instance.id).update(is_primary=False)
        
        serializer.save()

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

class PropertyInquiryViewSet(viewsets.ModelViewSet):
    queryset = PropertyInquiry.objects.all()
    serializer_class = PropertyInquirySerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated, IsAgentOrAdmin]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        
        # If user is agent, return inquiries for their properties
        if hasattr(user, 'agent_profile'):
            return PropertyInquiry.objects.filter(property__agent=user.agent_profile)
        
        # If user is admin, return all inquiries
        if UserRole.objects.filter(
            user=user,
            role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
        ).exists():
            return PropertyInquiry.objects.all()
        
        # For normal users, return their own inquiries
        return PropertyInquiry.objects.filter(user=user)
