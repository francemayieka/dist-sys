from django.contrib import admin
from .models import User, Contact

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('username', 'email')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_number', 'phone_number', 'email', 'address')
    search_fields = ('name', 'registration_number', 'email')

admin.site.register(User, UserAdmin)
admin.site.register(Contact, ContactAdmin)
