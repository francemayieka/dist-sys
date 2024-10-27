from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class User(AbstractUser):
    otp = models.CharField(max_length=8, blank=True, null=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='auth_app_users',
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='auth_app_users_permissions',
        blank=True,
    )


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.TextField()
    registration_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.name} ({self.registration_number})"
