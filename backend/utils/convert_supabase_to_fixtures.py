
#!/usr/bin/env python
"""
Utility script to convert Supabase JSON exports to Django fixtures.

This script can be used to migrate data from Supabase to Django.
"""
import os
import json
import argparse
from datetime import datetime

def convert_users(supabase_data, output_file):
    """Convert Supabase users to Django users."""
    django_users = []
    django_roles = []
    
    for i, user in enumerate(supabase_data):
        django_user = {
            "model": "users.user",
            "pk": i + 1,
            "fields": {
                "email": user.get("email", f"user{i}@example.com"),
                "first_name": user.get("first_name", ""),
                "last_name": user.get("last_name", ""),
                "phone_number": user.get("phone", ""),
                "is_staff": user.get("is_staff", False),
                "is_active": user.get("is_active", True),
                "date_joined": user.get("created_at", datetime.now().isoformat()),
                "last_login": user.get("last_login", None)
            }
        }
        
        # Add roles for the user
        for role in user.get("roles", ["user"]):
            django_roles.append({
                "model": "users.userrole",
                "pk": len(django_roles) + 1,
                "fields": {
                    "user": i + 1,
                    "role": role
                }
            })
        
        django_users.append(django_user)
    
    # Combine users and roles
    fixtures = django_users + django_roles
    
    with open(output_file, 'w') as f:
        json.dump(fixtures, f, indent=2)
    
    print(f"Converted {len(django_users)} users and {len(django_roles)} roles to {output_file}")

def convert_properties(supabase_data, output_file):
    """Convert Supabase properties to Django properties."""
    django_properties = []
    django_images = []
    django_features = []
    
    features_set = set()
    
    for i, prop in enumerate(supabase_data):
        django_property = {
            "model": "properties.property",
            "pk": i + 1,
            "fields": {
                "title": prop.get("title", f"Property {i+1}"),
                "description": prop.get("description", ""),
                "property_type": prop.get("property_type", "apartment").lower(),
                "status": prop.get("status", "for_sale"),
                "price": str(prop.get("price", 0)),
                "bedrooms": prop.get("bedrooms", 0),
                "bathrooms": prop.get("bathrooms", 0),
                "area_sqm": prop.get("area_sqm", 0),
                "agent": prop.get("agent_id", None),
                "area": prop.get("area_id", None),
                "address": prop.get("address", ""),
                "latitude": str(prop.get("latitude", 0)),
                "longitude": str(prop.get("longitude", 0)),
                "is_featured": prop.get("is_featured", False),
                "created_at": prop.get("created_at", datetime.now().isoformat()),
                "updated_at": prop.get("updated_at", datetime.now().isoformat())
            }
        }
        
        # Add images for the property
        for j, image_url in enumerate(prop.get("images", [])):
            django_images.append({
                "model": "properties.propertyimage",
                "pk": len(django_images) + 1,
                "fields": {
                    "property": i + 1,
                    "image": image_url,
                    "is_primary": j == 0,
                    "created_at": datetime.now().isoformat()
                }
            })
        
        # Add features for the property
        for feature in prop.get("features", []):
            features_set.add(feature)
            django_features.append({
                "model": "properties.propertyfeaturerelation",
                "pk": len(django_features) + 1,
                "fields": {
                    "property": i + 1,
                    "feature": feature
                }
            })
        
        django_properties.append(django_property)
    
    # Create feature objects
    feature_objects = []
    for i, feature in enumerate(features_set):
        feature_objects.append({
            "model": "properties.propertyfeature",
            "pk": i + 1,
            "fields": {
                "name": feature
            }
        })
    
    # Combine all objects
    fixtures = django_properties + django_images + feature_objects + django_features
    
    with open(output_file, 'w') as f:
        json.dump(fixtures, f, indent=2)
    
    print(f"Converted {len(django_properties)} properties to {output_file}")

def main():
    parser = argparse.ArgumentParser(description='Convert Supabase JSON exports to Django fixtures')
    parser.add_argument('input_file', help='Path to Supabase JSON export file')
    parser.add_argument('output_file', help='Path to Django fixture output file')
    parser.add_argument('model_type', choices=['users', 'properties', 'areas'], 
                        help='Type of model to convert')
    
    args = parser.parse_args()
    
    with open(args.input_file, 'r') as f:
        supabase_data = json.load(f)
    
    if args.model_type == 'users':
        convert_users(supabase_data, args.output_file)
    elif args.model_type == 'properties':
        convert_properties(supabase_data, args.output_file)
    # Add more converters as needed
    
if __name__ == "__main__":
    main()
