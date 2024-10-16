# auth_app/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    otp = models.CharField(max_length=8, blank=True, null=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)

    # You can customize the related_name attributes to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='auth_app_users',  # change this to a unique name
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='auth_app_users_permissions',  # change this to a unique name
        blank=True,
    )
