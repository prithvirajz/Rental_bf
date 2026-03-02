from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, MeView, BoyfriendProfileViewSet, 
    BookingViewSet, PaymentVerificationView, CustomLoginView
)

router = DefaultRouter()
router.register(r'boyfriends', BoyfriendProfileViewSet, basename='boyfriend')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', MeView.as_view(), name='me'),
    
    # API
    path('verify-payment/', PaymentVerificationView.as_view(), name='verify_payment'),
    
    # Routers
    path('', include(router.urls)),
]
