from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):

    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    patient_name = models.CharField(max_length=255)
    patient_phone = models.CharField(max_length=15)

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    scheduled_at = models.DateTimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='scheduled'
    )

    def __str__(self):
        return f"{self.patient_name} - {self.doctor.name}"