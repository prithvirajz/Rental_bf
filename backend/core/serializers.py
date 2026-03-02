from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import BoyfriendProfile, Booking

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_boyfriend'] = user.is_boyfriend
        return token

    def validate(self, attrs):
        username_or_email = attrs.get('username')
        password = attrs.get('password')

        if username_or_email and password:
            # Try to find user by email or username
            user = User.objects.filter(
                Q(username=username_or_email) | Q(email=username_or_email)
            ).first()

            if user:
                # If user found, ensure we pass the actual username to super().validate()
                # because standard Django auth expects username
                attrs['username'] = user.username
            
        return super().validate(attrs)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_boyfriend')
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'is_boyfriend')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_boyfriend=validated_data.get('is_boyfriend', False)
        )
        if user.is_boyfriend:
            BoyfriendProfile.objects.create(user=user, name=user.username, price=0)
        return user

class BoyfriendProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    photo = serializers.SerializerMethodField()

    class Meta:
        model = BoyfriendProfile
        fields = ('id', 'user', 'username', 'email', 'name', 'city', 'bio', 'price', 'photo')
        read_only_fields = ('user',)

    def get_photo(self, obj):
        if not obj.photo:
            return None
            
        # If it is a string (e.g. from seed data forcing a URL)
        photo_str = str(obj.photo)
        if photo_str.startswith('http'):
             return photo_str

        # If it is an ImageFieldFile
        try:
             url = obj.photo.url
             if url.startswith('http'):
                 return url
             
             request = self.context.get('request')
             if request:
                 return request.build_absolute_uri(url)
             return url
        except Exception:
             return photo_str

class BookingSerializer(serializers.ModelSerializer):
    boyfriend_name = serializers.CharField(source='boyfriend.name', read_only=True)
    boyfriend_photo = serializers.ImageField(source='boyfriend.photo', read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'user', 'boyfriend', 'boyfriend_name', 'boyfriend_photo', 'date', 'hours', 'amount', 'status', 'message', 'razorpay_order_id', 'created_at')
        read_only_fields = ('user', 'amount', 'status', 'razorpay_order_id', 'created_at')
