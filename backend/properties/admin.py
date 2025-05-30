
from django.contrib import admin
from .models import Property, PropertyImage, PropertyFeature, PropertyFeatureRelation, Favorite, PropertyInquiry

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

class PropertyFeatureInline(admin.TabularInline):
    model = PropertyFeatureRelation
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'property_type', 'status', 'price', 'bedrooms', 'bathrooms', 'area_sqm', 'agent', 'is_featured')
    list_filter = ('property_type', 'status', 'is_featured', 'bedrooms')
    search_fields = ('title', 'description', 'address')
    inlines = [PropertyImageInline, PropertyFeatureInline]

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('property', 'image', 'is_primary', 'created_at')
    list_filter = ('is_primary',)
    search_fields = ('property__title',)

@admin.register(PropertyFeature)
class PropertyFeatureAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'property', 'created_at')
    search_fields = ('user__email', 'property__title')

@admin.register(PropertyInquiry)
class PropertyInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'property', 'created_at', 'is_processed')
    list_filter = ('is_processed', 'created_at')
    search_fields = ('name', 'email', 'property__title', 'message')
