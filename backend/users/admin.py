
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserRole, Agent

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom admin view for User model."""
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone_number', 'profile_picture')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    """Admin view for UserRole model."""
    
    list_display = ('user', 'role')
    list_filter = ('role',)
    search_fields = ('user__email', 'role')

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    """Admin view for Agent model."""
    
    list_display = ('user', 'years_of_experience', 'listings_count', 'sales_volume')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
