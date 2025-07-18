from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'availabilities', views.AvailabilityViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'tips', views.TipViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_form_submit, name='contact_form_submit'),
    path('book/', views.book_appointment, name='book_appointment'),
    path('appointments/<int:appointment_id>/status/', views.update_appointment_status, name='update_appointment_status'),
    path('checkout/', views.create_checkout_session, name='create_checkout_session'),
]
                   