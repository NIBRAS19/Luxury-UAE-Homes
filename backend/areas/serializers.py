
from rest_framework import serializers
from .models import Area, AreaImage, AreaPerk, AreaGuide

class AreaImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaImage
        fields = ['id', 'image', 'is_primary']

class AreaPerkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaPerk
        fields = ['id', 'name', 'description']

class AreaGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaGuide
        fields = ['id', 'content', 'attractions', 'lifestyle', 'schools', 'transportation']

class AreaListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Area
        fields = ['id', 'name', 'description', 'primary_image', 'properties_count', 'average_price', 'featured']
    
    def get_primary_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return self.context['request'].build_absolute_uri(primary.image.url)
        
        # If no primary image, return area image or first additional image
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        
        first_image = obj.images.first()
        if first_image:
            return self.context['request'].build_absolute_uri(first_image.image.url)
        
        return None

class AreaDetailSerializer(serializers.ModelSerializer):
    images = AreaImageSerializer(many=True, read_only=True)
    perks = AreaPerkSerializer(many=True, read_only=True)
    guide = AreaGuideSerializer(read_only=True)
    
    class Meta:
        model = Area
        fields = ['id', 'name', 'description', 'image', 'images', 'perks', 
                  'guide', 'properties_count', 'average_price', 'featured', 
                  'latitude', 'longitude', 'created_at', 'updated_at']

class AreaCreateUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True, required=False
    )
    perks = serializers.ListField(
        child=serializers.DictField(),
        write_only=True, required=False
    )
    guide_data = serializers.DictField(write_only=True, required=False)
    
    class Meta:
        model = Area
        fields = ['id', 'name', 'description', 'image', 'featured', 
                  'latitude', 'longitude', 'images', 'perks', 'guide_data']
    
    def create(self, validated_data):
        images = validated_data.pop('images', [])
        perks = validated_data.pop('perks', [])
        guide_data = validated_data.pop('guide_data', None)
        
        area = Area.objects.create(**validated_data)
        
        # Add images
        for image in images:
            AreaImage.objects.create(
                area=area,
                image=image,
                is_primary=(image == images[0])  # First uploaded image is primary
            )
        
        # Add perks
        for perk_data in perks:
            AreaPerk.objects.create(
                area=area,
                name=perk_data.get('name', ''),
                description=perk_data.get('description', '')
            )
        
        # Add guide if provided
        if guide_data:
            AreaGuide.objects.create(
                area=area,
                content=guide_data.get('content', ''),
                attractions=guide_data.get('attractions', ''),
                lifestyle=guide_data.get('lifestyle', ''),
                schools=guide_data.get('schools', ''),
                transportation=guide_data.get('transportation', '')
            )
        
        return area
    
    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])
        perks = validated_data.pop('perks', [])
        guide_data = validated_data.pop('guide_data', None)
        
        # Update area fields
        instance = super().update(instance, validated_data)
        
        # Add new images
        if images:
            for image in images:
                AreaImage.objects.create(
                    area=instance,
                    image=image
                )
        
        # Update perks if provided
        if perks:
            # Remove existing perks
            AreaPerk.objects.filter(area=instance).delete()
            
            # Add new perks
            for perk_data in perks:
                AreaPerk.objects.create(
                    area=instance,
                    name=perk_data.get('name', ''),
                    description=perk_data.get('description', '')
                )
        
        # Update guide if provided
        if guide_data:
            guide, created = AreaGuide.objects.get_or_create(area=instance)
            
            guide.content = guide_data.get('content', guide.content)
            guide.attractions = guide_data.get('attractions', guide.attractions)
            guide.lifestyle = guide_data.get('lifestyle', guide.lifestyle)
            guide.schools = guide_data.get('schools', guide.schools)
            guide.transportation = guide_data.get('transportation', guide.transportation)
            guide.save()
        
        return instance
