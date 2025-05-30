
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MarketReportViewSet, MarketTrendViewSet, BlogPostViewSet, MarketStatisticViewSet

router = DefaultRouter()
router.register('reports', MarketReportViewSet)
router.register('trends', MarketTrendViewSet)
router.register('blog', BlogPostViewSet, basename='blog')
router.register('statistics', MarketStatisticViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
