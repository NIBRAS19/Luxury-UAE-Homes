
from rest_framework import serializers
from .models import MarketReport, MarketTrend, BlogPost, MarketStatistic
from users.serializers import UserSerializer

class MarketReportSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source='author', read_only=True)
    
    class Meta:
        model = MarketReport
        fields = ['id', 'title', 'slug', 'summary', 'content', 'author', 
                  'author_details', 'cover_image', 'published_date', 
                  'is_featured', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'author': {'write_only': True},
        }

class MarketTrendSerializer(serializers.ModelSerializer):
    area_name = serializers.SerializerMethodField()
    property_type_display = serializers.SerializerMethodField()
    period_display = serializers.SerializerMethodField()
    
    class Meta:
        model = MarketTrend
        fields = ['id', 'area', 'area_name', 'property_type', 'property_type_display',
                  'period', 'period_display', 'period_start_date', 'period_end_date',
                  'average_price', 'price_change', 'trend_direction', 'sales_volume',
                  'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_area_name(self, obj):
        return obj.area.name
    
    def get_property_type_display(self, obj):
        return obj.get_property_type_display()
    
    def get_period_display(self, obj):
        return obj.get_period_display()

class BlogPostSerializer(serializers.ModelSerializer):
    author_details = UserSerializer(source='author', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'author', 
                  'author_details', 'cover_image', 'published_date', 
                  'tags', 'is_published', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'author': {'write_only': True},
        }

class MarketStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketStatistic
        fields = ['id', 'name', 'value', 'description', 'icon', 'is_featured', 'display_order']
