from django.urls import path
from . import views

urlpatterns = [
    path('add-availability/', views.add_google_calendar_availability, name='add_google_calendar_availability'),
    path('book-appointment/', views.book_google_calendar_appointment, name='book_google_calendar_appointment'),
    ]