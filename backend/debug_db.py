import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import User, BoyfriendProfile

print("--- Users ---")
for u in User.objects.all():
    print(f"ID: {u.id} | Username: {u.username} | Email: {u.email} | Is Active: {u.is_active} | Is Staff: {u.is_staff}")

print("\n--- Boyfriend Profiles ---")
for p in BoyfriendProfile.objects.all():
    print(f"User: {p.user.username} | Name: {p.name} | Photo: {p.photo} | Photo URL: {p.photo.url if p.photo else 'None'}")
