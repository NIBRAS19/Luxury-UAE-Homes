
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Area, AreaImage
from .serializers import AreaListSerializer, AreaDetailSerializer, AreaCreateUpdateSerializer
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

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['featured']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'properties_count', 'average_price']
    permission_classes = [IsAdminOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AreaListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return AreaCreateUpdateSerializer
        return AreaDetailSerializer
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def update_stats(self, request, pk=None):
        area = self.get_object()
        area.update_stats()
        return Response({'status': 'area stats updated'})
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_areas = Area.objects.filter(featured=True)
        serializer = AreaListSerializer(featured_areas, many=True, context={'request': request})
        return Response(serializer.data)
