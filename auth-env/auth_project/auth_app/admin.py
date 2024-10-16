# auth_app/admin.py

from django.contrib import admin
from .models import User  # Adjust if your user model is in a different location

# Register the User model to be accessible in the admin panel
admin.site.register(User)
