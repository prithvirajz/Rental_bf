import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from core.models import BoyfriendProfile

User = get_user_model()

def seed():
    # Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')
        print("Created superuser: admin/admin")
    else:
        print("Admin user already exists")

    # Boyfriends
    boyfriends = [
        {
            'username': 'arjun',
            'name': 'Arjun Mehta',
            'city': 'Mumbai',
            'price': 500,
            'bio': 'Empathetic listener and coffee enthusiast. I love long walks and deep conversations.',
            'photo': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop'
        },
        {
            'username': 'rahul',
            'name': 'Rahul Verma',
            'city': 'Delhi',
            'price': 800,
            'bio': 'Corporate professional available for events and emotional support. Polite and well-read.',
            'photo': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop'
        },
        {
            'username': 'kabir',
            'name': 'Kabir Singh',
            'city': 'Bangalore',
            'price': 600,
            'bio': 'Techie by day, good listener by night. Let\'s talk about life, code, or movies.',
            'photo': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop'
        }
    ]

    for data in boyfriends:
        if not User.objects.filter(username=data['username']).exists():
            u = User.objects.create_user(username=data['username'], email=f"{data['username']}@example.com", password='password123', is_boyfriend=True)
            
            # Create profile
            BoyfriendProfile.objects.create(
                 user=u,
                 name=data['name'],
                 city=data['city'],
                 price=data['price'],
                 bio=data['bio'],
                 photo=data['photo']
            )
            print(f"Created boyfriend: {data['name']}")
        else:
            print(f"User {data['username']} already exists")

if __name__ == '__main__':
    seed()
