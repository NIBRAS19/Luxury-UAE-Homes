
from django.db import models
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField
from users.models import User

class MarketReport(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    summary = models.TextField()
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    cover_image = models.ImageField(upload_to='report_covers/')
    published_date = models.DateField()
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # Generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class MarketTrend(models.Model):
    TREND_CHOICES = (
        ('up', 'Up'),
        ('down', 'Down'),
        ('stable', 'Stable'),
    )
    
    area = models.ForeignKey('areas.Area', on_delete=models.CASCADE, related_name='market_trends')
    property_type = models.CharField(max_length=20, choices=(
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('penthouse', 'Penthouse'),
        ('commercial', 'Commercial'),
        ('off_plan', 'Off-Plan'),
    ))
    period = models.CharField(max_length=20, choices=(
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
    ))
    period_start_date = models.DateField()
    period_end_date = models.DateField()
    average_price = models.DecimalField(max_digits=14, decimal_places=2)
    price_change = models.DecimalField(max_digits=5, decimal_places=2)  # Percentage change
    trend_direction = models.CharField(max_length=10, choices=TREND_CHOICES)
    sales_volume = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('area', 'property_type', 'period', 'period_start_date')
    
    def __str__(self):
        return f"{self.area.name} - {self.get_property_type_display()} - {self.period_start_date.strftime('%b %Y')}"

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    excerpt = models.TextField()
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    cover_image = models.ImageField(upload_to='blog_covers/')
    published_date = models.DateField()
    tags = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # Generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class MarketStatistic(models.Model):
    """Model for storing key market statistics."""
    
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # For frontend icon name
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveSmallIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order']
    
    def __str__(self):
        return self.name
