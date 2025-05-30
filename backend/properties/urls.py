
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, PropertyImageViewSet, FavoriteViewSet, PropertyInquiryViewSet

router = DefaultRouter()
router.register('', PropertyViewSet)
router.register('images', PropertyImageViewSet)
router.register('favorites', FavoriteViewSet, basename='favorite')
router.register('inquiries', PropertyInquiryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
