from django.http import JsonResponse
from django.urls import path
from .views import get_available_slots, create_appointment, get_all_doctors

def root(request):
    return JsonResponse({"message": "Server is on"})


urlpatterns = [
    path("doctors/", get_all_doctors),                          # GET all doctors
    path("doctors/<slug:slug>/slots/", get_available_slots),    # GET slots for doctor
    path("doctors/<slug:slug>/book/", create_appointment),      # POST book appointment
    path("", root),
]