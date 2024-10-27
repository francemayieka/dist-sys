from django.contrib import admin
from .models import User, Contact  # Import the Contact model

# Create a custom UserAdmin class if needed
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('username', 'email')

# Create a custom ContactAdmin class
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_number', 'phone_number', 'email', 'address')
    search_fields = ('name', 'registration_number', 'email')

# Register the User model with the custom UserAdmin class
admin.site.register(User, UserAdmin)

# Register the Contact model with the custom ContactAdmin class
admin.site.register(Contact, ContactAdmin)
