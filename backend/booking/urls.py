from django.http import JsonResponse
from django.urls import path
from .views import get_available_slots, create_appointment

def root(request):
    return JsonResponse({"message": "Server is on"})


urlpatterns = [
    # path('', views.home),
    path("doctors/<slug:slug>/slots/", get_available_slots),
    path("doctors/<slug:slug>/book/", create_appointment),
    path("", root),   # http://127.0.0.1:8000/
]