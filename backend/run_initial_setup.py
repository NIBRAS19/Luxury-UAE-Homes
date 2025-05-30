
#!/usr/bin/env python
"""
Script to create the initial admin user and set up basic data.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'luxe_properties.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import UserRole, Agent
from properties.models import PropertyFeature
from areas.models import Area

User = get_user_model()

def setup():
    # Create admin user if it doesn't exist
    if not User.objects.filter(email='admin@example.com').exists():
        admin_user = User.objects.create_superuser(
            email='admin@example.com',
            password='adminpassword',
            first_name='Admin',
            last_name='User'
        )
        print("Admin user created!")
        
        # Add admin role
        UserRole.objects.get_or_create(
            user=admin_user,
            role=UserRole.RoleChoices.SUPERADMIN
        )
        print("Admin role assigned!")
    
    # Create agent user if it doesn't exist
    if not User.objects.filter(email='agent@example.com').exists():
        agent_user = User.objects.create_user(
            email='agent@example.com',
            password='agentpassword',
            first_name='Agent',
            last_name='User'
        )
        
        # Add agent role
        UserRole.objects.get_or_create(
            user=agent_user,
            role=UserRole.RoleChoices.AGENT
        )
        
        # Create agent profile
        Agent.objects.get_or_create(
            user=agent_user,
            defaults={
                'bio': 'Experienced real estate agent specializing in luxury properties.',
                'specialties': 'Luxury Villas, Penthouses',
                'years_of_experience': 5
            }
        )
        print("Agent user created with profile!")
    
    # Create common property features
    common_features = [
        'Swimming Pool', 'Gym', 'Balcony', 'Terrace', 'Garden', 
        'Parking', 'Security', '24/7 Concierge', 'Waterfront',
        'Sea View', 'City View', 'Air Conditioning', 'Furnished',
        'Pet Friendly', 'Smart Home', 'Private Beach Access'
    ]
    
    for feature in common_features:
        PropertyFeature.objects.get_or_create(name=feature)
    
    print(f"{len(common_features)} common property features created!")
    
    # Create common areas if they don't exist
    common_areas = [
        {'name': 'Downtown Dubai', 'description': 'Home to the iconic Burj Khalifa and Dubai Mall.'},
        {'name': 'Palm Jumeirah', 'description': 'Luxury artificial island known for high-end residences.'},
        {'name': 'Dubai Marina', 'description': 'Cosmopolitan waterfront community with luxury apartments.'},
        {'name': 'Jumeirah', 'description': 'Prestigious beachfront area with luxury villas.'}
    ]
    
    for area_data in common_areas:
        Area.objects.get_or_create(
            name=area_data['name'],
            defaults={
                'description': area_data['description'],
                'featured': True,
                # Note: Image would need to be added separately
            }
        )
    
    print(f"{len(common_areas)} common areas created!")
    
    print("Initial setup complete!")

if __name__ == "__main__":
    setup()
