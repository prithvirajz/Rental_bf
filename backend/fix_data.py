import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import User, BoyfriendProfile

# 1. Reset Admin Password
try:
    admin = User.objects.get(username='admin')
    admin.set_password('password123')
    admin.save()
    print("SUCCESS: Admin password reset to 'password123'")
except User.DoesNotExist:
    print("ERROR: Admin user not found")

# 2. Fix Profile Image for 'arjun_tester'
try:
    user = User.objects.get(username='arjun_tester')
    profile = user.boyfriend_profile
    # Using a sample Unsplash image
    profile.photo = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=60"
    profile.save()
    print(f"SUCCESS: Assigned image to {user.username}")
except Exception as e:
    print(f"ERROR updating profile: {e}")
