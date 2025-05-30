
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    """Custom User model that uses email as the unique identifier."""
    
    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

    def __str__(self):
        return self.email

class UserRole(models.Model):
    """User role model for managing different user types."""
    
    class RoleChoices(models.TextChoices):
        USER = 'user', _('User')
        AGENT = 'agent', _('Agent')
        ADMIN = 'admin', _('Admin')
        SUPERADMIN = 'superadmin', _('Super Admin')
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roles')
    role = models.CharField(max_length=20, choices=RoleChoices.choices, default=RoleChoices.USER)
    
    class Meta:
        unique_together = ('user', 'role')
    
    def __str__(self):
        return f"{self.user.email} - {self.role}"

class Agent(models.Model):
    """Agent model with additional information about real estate agents."""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='agent_profile')
    bio = models.TextField(blank=True)
    specialties = models.CharField(max_length=255, blank=True)
    years_of_experience = models.PositiveSmallIntegerField(default=0)
    listings_count = models.PositiveIntegerField(default=0)
    sales_volume = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    def __str__(self):
        return self.user.email
