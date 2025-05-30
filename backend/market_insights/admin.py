
from django.contrib import admin
from .models import MarketReport, MarketTrend, BlogPost, MarketStatistic

@admin.register(MarketReport)
class MarketReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_featured')
    list_filter = ('is_featured', 'published_date')
    search_fields = ('title', 'summary', 'content', 'author__email')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'

@admin.register(MarketTrend)
class MarketTrendAdmin(admin.ModelAdmin):
    list_display = ('area', 'property_type', 'period', 'period_start_date', 'average_price', 'price_change', 'trend_direction')
    list_filter = ('property_type', 'period', 'trend_direction', 'area')
    search_fields = ('area__name',)
    date_hierarchy = 'period_start_date'

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_published')
    list_filter = ('is_published', 'published_date', 'tags')
    search_fields = ('title', 'excerpt', 'content', 'author__email')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'

@admin.register(MarketStatistic)
class MarketStatisticAdmin(admin.ModelAdmin):
    list_display = ('name', 'value', 'is_featured', 'display_order')
    list_filter = ('is_featured',)
    search_fields = ('name', 'value', 'description')
    ordering = ('display_order',)
