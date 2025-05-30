
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserRole, Agent
from .serializers import UserSerializer, AgentSerializer, RegisterSerializer

class RegisterView(generics.CreateAPIView):
    """View for user registration."""
    
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing user instances."""
    
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def get_queryset(self):
        """Filter queryset based on user permissions."""
        user = self.request.user
        
        # Check if user has admin or superadmin role
        is_admin = UserRole.objects.filter(
            user=user, 
            role__in=[UserRole.RoleChoices.ADMIN, UserRole.RoleChoices.SUPERADMIN]
        ).exists()
        
        if is_admin:
            return User.objects.all()
        else:
            return User.objects.filter(id=user.id)

class AgentViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing agent instances."""
    
    serializer_class = AgentSerializer
    queryset = Agent.objects.all()
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

@api_view(['GET'])
def get_user_roles(request):
    """Get roles for authenticated user."""
    
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, 
                        status=status.HTTP_401_UNAUTHORIZED)
    
    roles = UserRole.objects.filter(user=request.user).values_list('role', flat=True)
    return Response({"roles": list(roles)})

class LogoutView(APIView):
    """Logout view to blacklist the refresh token."""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
