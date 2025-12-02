from rest_framework import serializers
from .models import Service, Availability, Booking, ContactMessage


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class AvailabilitySerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(),
        source="service",
        write_only=True
    )

    class Meta:
        model = Availability
        fields = [
            "id",
            "service",
            "service_id",
            "start_datetime",
            "end_datetime",
            "is_booked",
            "created_at",
            "updated_at",
        ]


class BookingSerializer(serializers.ModelSerializer):
    availability = AvailabilitySerializer(read_only=True)
    availability_id = serializers.PrimaryKeyRelatedField(
        queryset=Availability.objects.all(),
        source="availability",
        write_only=True
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "client_name",
            "client_email",
            "client_phone",
            "service",
            "availability",
            "availability_id",
            "status",
            "created_at",
            "updated_at",
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
