from django.urls import path
from .views import get_available_slots, create_appointment

urlpatterns = [
    path("doctors/<slug:slug>/slots/", get_available_slots),
    path("doctors/<slug:slug>/book/", create_appointment),
]