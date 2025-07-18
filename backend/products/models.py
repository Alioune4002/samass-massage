from django.db import models
from django.contrib.auth.models import AbstractUser
import json

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()
    is_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name
    
class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    durations_prices = models.JSONField(default=dict)  # Ex. : {"60": 60.00, "90": 80.00}
    image = models.ImageField(upload_to='services/', null=True, blank=True)

    def __str__(self):
        return self.title
    
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_massage_therapist = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
class Availability(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.date} {self.start_time}"

class Tip(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    delay = models.PositiveIntegerField(default=5000)

    def __str__(self):
        return self.title
    
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
    
class Appointment(models.Model):
    user_name = models.CharField(max_length=100)
    user_email = models.EmailField()
    user_phone = models.CharField(max_length=15, blank=True)
    service = models.CharField(max_length=100)
    duration = models.IntegerField()
    date = models.DateField()
    time = models.TimeField()
    special_request = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=[('pending', 'En attente'), ('confirmed', 'Confirmé'), ('canceled', 'Annulé')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_name} - {self.service} ({self.date} {self.time})"