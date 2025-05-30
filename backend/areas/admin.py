
from django.contrib import admin
from .models import Area, AreaImage, AreaPerk, AreaGuide

class AreaImageInline(admin.TabularInline):
    model = AreaImage
    extra = 1

class AreaPerkInline(admin.TabularInline):
    model = AreaPerk
    extra = 1

class AreaGuideInline(admin.StackedInline):
    model = AreaGuide
    can_delete = False
    max_num = 1

@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('name', 'properties_count', 'average_price', 'featured')
    list_filter = ('featured',)
    search_fields = ('name', 'description')
    inlines = [AreaImageInline, AreaPerkInline, AreaGuideInline]
    readonly_fields = ('properties_count', 'average_price')
    
    def save_model(self, request, obj, form, change):
        """Update area stats after saving."""
        super().save_model(request, obj, form, change)
        obj.update_stats()

@admin.register(AreaImage)
class AreaImageAdmin(admin.ModelAdmin):
    list_display = ('area', 'is_primary', 'created_at')
    list_filter = ('is_primary',)
    search_fields = ('area__name',)

@admin.register(AreaPerk)
class AreaPerkAdmin(admin.ModelAdmin):
    list_display = ('area', 'name')
    search_fields = ('area__name', 'name', 'description')

@admin.register(AreaGuide)
class AreaGuideAdmin(admin.ModelAdmin):
    list_display = ('area', 'created_at', 'updated_at')
    search_fields = ('area__name', 'content')
