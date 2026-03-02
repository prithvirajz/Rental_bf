from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_boyfriend = models.BooleanField(default=False)
    
class BoyfriendProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='boyfriend_profile')
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    bio = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    photo = models.ImageField(upload_to='boyfriend_photos/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending_payment', 'Pending Payment'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    boyfriend = models.ForeignKey(BoyfriendProfile, on_delete=models.CASCADE, related_name='bookings')
    date = models.DateTimeField()
    hours = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_payment')
    message = models.TextField(blank=True)
    
    razorpay_order_id = models.CharField(max_length=100, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.boyfriend.name} ({self.status})"
