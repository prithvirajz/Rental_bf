from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, BoyfriendProfile, Booking

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_boyfriend', 'is_staff')
    list_filter = ('is_boyfriend', 'is_staff')

@admin.register(BoyfriendProfile)
class BoyfriendProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'price', 'username')
    search_fields = ('name', 'city', 'email')
    
    def username(self, obj):
        return obj.user.username

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'boyfriend', 'date', 'amount', 'status')
    list_filter = ('status', 'date')
    search_fields = ('user__username', 'boyfriend__name')
