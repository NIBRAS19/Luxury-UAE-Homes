
from django.db import models

class Area(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='area_images/')
    properties_count = models.PositiveIntegerField(default=0)
    average_price = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    featured = models.BooleanField(default=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def update_stats(self):
        """Update properties count and average price based on properties in this area."""
        from properties.models import Property
        
        properties = Property.objects.filter(area=self)
        self.properties_count = properties.count()
        
        if self.properties_count > 0:
            self.average_price = properties.aggregate(avg_price=models.Avg('price'))['avg_price']
        else:
            self.average_price = 0
        
        self.save()

class AreaImage(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='area_images/')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Image for {self.area.name}"

class AreaPerk(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='perks')
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.area.name} - {self.name}"

class AreaGuide(models.Model):
    area = models.OneToOneField(Area, on_delete=models.CASCADE, related_name='guide')
    content = models.TextField()
    attractions = models.TextField(blank=True)
    lifestyle = models.TextField(blank=True)
    schools = models.TextField(blank=True)
    transportation = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Guide for {self.area.name}"
