
from django.db import models
from users.models import Agent, User

class PropertyType(models.TextChoices):
    APARTMENT = 'apartment', 'Apartment'
    VILLA = 'villa', 'Villa'
    PENTHOUSE = 'penthouse', 'Penthouse'
    COMMERCIAL = 'commercial', 'Commercial'
    OFF_PLAN = 'off_plan', 'Off-Plan'

class PropertyStatus(models.TextChoices):
    FOR_SALE = 'for_sale', 'For Sale'
    FOR_RENT = 'for_rent', 'For Rent'
    SOLD = 'sold', 'Sold'
    RENTED = 'rented', 'Rented'
    UNDER_OFFER = 'under_offer', 'Under Offer'

class Property(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=20, choices=PropertyType.choices)
    status = models.CharField(max_length=20, choices=PropertyStatus.choices)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    bedrooms = models.PositiveSmallIntegerField()
    bathrooms = models.PositiveSmallIntegerField()
    area_sqm = models.PositiveIntegerField()
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, related_name='properties', null=True)
    area = models.ForeignKey('areas.Area', on_delete=models.SET_NULL, related_name='properties', null=True)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Properties'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Image for {self.property.title}"

class PropertyFeature(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class PropertyFeatureRelation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='features')
    feature = models.ForeignKey(PropertyFeature, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ['property', 'feature']
    
    def __str__(self):
        return f"{self.property.title} - {self.feature.name}"

class Favorite(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='favorited_by')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['property', 'user']
    
    def __str__(self):
        return f"{self.user.email} - {self.property.title}"

class PropertyInquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='inquiries', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = 'Property inquiries'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Inquiry for {self.property.title} by {self.name}"
