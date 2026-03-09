from datetime import datetime, timedelta, time

from django.utils import timezone
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

# from django.http import JsonResponse

# def home(request):
#     return JsonResponse({"message": "Doctor Booking API running"})


@api_view(["GET"])
def get_available_slots(request, slug):

    doctor = get_object_or_404(Doctor, slug=slug, is_active=True)

    today = timezone.now().date()
    all_slots = []

    # generate slots for next 7 days
    for day in range(7):

        current_day = today + timedelta(days=day)

        for hour in range(9, 17):

            slot = timezone.make_aware(
                datetime.combine(current_day, time(hour))
            )

            all_slots.append(slot)

    # booked slots
    booked_slots = set(
        Appointment.objects.filter(
            doctor=doctor,
            status="scheduled"
        ).values_list("scheduled_at", flat=True)
    )

    # remove booked slots
    available_slots = [
        slot.isoformat()
        for slot in all_slots
        if slot not in booked_slots
    ]

    doctor_data = DoctorSerializer(doctor).data

    return Response({
        "doctor": doctor_data,
        "available_slots": available_slots
    })


@api_view(["POST"])
def create_appointment(request, slug):

    doctor = get_object_or_404(Doctor, slug=slug)
    
    data = request.data.copy()
    data["doctor"] = doctor.id

    slot = data.get("scheduled_at")

    if not slot:
        return Response({"error": "scheduled_at required"}, status=400)

    slot_dt = datetime.fromisoformat(slot)

    # if naive → make timezone aware
    if timezone.is_naive(slot_dt):
        slot_dt = timezone.make_aware(slot_dt)

    # prevent double booking
    if Appointment.objects.filter(
        doctor=doctor,
        scheduled_at=slot_dt,
        status="scheduled"
    ).exists():

        return Response(
            {"error": "Slot already booked"},
            status=400
        )

    data["scheduled_at"] = slot_dt

    serializer = AppointmentSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(["GET"])
def get_all_doctors(request):
    doctors = Doctor.objects.filter(is_active=True)
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)