from rest_framework import serializers
from .models import Doctor, Appointment


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "name", "specialization", "is_active", "slug"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient_name",
            "patient_phone",
            "doctor",
            "scheduled_at",
            "status",
        ]