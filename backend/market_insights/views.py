
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import MarketReport, MarketTrend, BlogPost, MarketStatistic
from .serializers import (
    MarketReportSerializer, 
    MarketTrendSerializer, 
    BlogPostSerializer,
    MarketStatisticSerializer
)
from users.models import UserRole

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit, but allow anyone to read.
    """
    
    def has_permission(self, request, view):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to admins
        if not request.user.is_authenticated:
            return False
        
        return UserRole.objects.filter(
            user=request.user,
            role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
        ).exists()

class BlogPostViewPermission(permissions.BasePermission):
    """
    Custom permission for blog posts.
    - Anyone can read published posts
    - Authors can view their own unpublished posts
    - Admins can view all posts
    """
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Anyone can read published posts
        if request.method in permissions.SAFE_METHODS and obj.is_published:
            return True
        
        if not request.user.is_authenticated:
            return False
        
        # Authors can edit their own posts
        if obj.author == request.user:
            return True
        
        # Admins can do anything
        return UserRole.objects.filter(
            user=request.user,
            role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
        ).exists()

class MarketReportViewSet(viewsets.ModelViewSet):
    queryset = MarketReport.objects.all()
    serializer_class = MarketReportSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_featured']
    search_fields = ['title', 'summary', 'content']
    ordering_fields = ['published_date', 'created_at']
    lookup_field = 'slug'

class MarketTrendViewSet(viewsets.ModelViewSet):
    queryset = MarketTrend.objects.all()
    serializer_class = MarketTrendSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['area', 'property_type', 'period', 'trend_direction']
    ordering_fields = ['period_start_date', 'average_price', 'price_change']

class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [BlogPostViewPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['tags', 'is_published']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_date', 'created_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        user = self.request.user
        
        # Admin users can see all blog posts
        if user.is_authenticated:
            is_admin = UserRole.objects.filter(
                user=user,
                role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
            ).exists()
            
            if is_admin:
                return BlogPost.objects.all()
            
            # Authors can see their own posts (published or not)
            if self.action != 'list':  # For retrieving specific posts
                return BlogPost.objects.filter(author=user) | BlogPost.objects.filter(is_published=True)
        
        # Regular users can only see published posts
        return BlogPost.objects.filter(is_published=True)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class MarketStatisticViewSet(viewsets.ModelViewSet):
    queryset = MarketStatistic.objects.all()
    serializer_class = MarketStatisticSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_featured']
    ordering_fields = ['display_order']
