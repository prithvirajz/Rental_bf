from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.shortcuts import get_object_or_404
import razorpay
from .models import BoyfriendProfile, Booking
from .serializers import (
    RegisterSerializer, BoyfriendProfileSerializer, BookingSerializer, UserSerializer,
    CustomTokenObtainPairSerializer
)

# Initialize Razorpay Client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class BoyfriendProfileViewSet(viewsets.ModelViewSet):
    queryset = BoyfriendProfile.objects.all()
    serializer_class = BoyfriendProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # 1. Create Booking in DB (status=pending_payment)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        hours = serializer.validated_data['hours']
        boyfriend = serializer.validated_data['boyfriend']
        total_amount = boyfriend.price * hours
        
        booking = serializer.save(
            user=request.user, 
            status='pending_payment',
            amount=total_amount
        )
        
        # 2. Create Razorpay Order
        data = { "amount": int(total_amount * 100), "currency": "INR", "receipt": str(booking.id) }
        order = client.order.create(data=data)
        
        # 3. Save order_id to booking
        booking.razorpay_order_id = order['id']
        booking.save()
        
        # Return booking + order info
        return Response({
            'booking': BookingSerializer(booking).data,
            'razorpay_order': order
        }, status=status.HTTP_201_CREATED)

class PaymentVerificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_signature = request.data.get('razorpay_signature')
            
            # Verify signature
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })
            
            # Update booking status
            booking = Booking.objects.get(razorpay_order_id=razorpay_order_id)
            booking.status = 'confirmed'
            booking.razorpay_payment_id = razorpay_payment_id
            booking.save()
            
            return Response({'status': 'Payment verified'}, status=status.HTTP_200_OK)
            
        except razorpay.errors.SignatureVerificationError:
            return Response({'error': 'Signature verification failed'}, status=status.HTTP_400_BAD_REQUEST)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
