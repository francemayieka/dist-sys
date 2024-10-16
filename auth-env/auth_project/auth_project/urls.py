# auth_project/urls.py

from django.contrib import admin
from django.urls import path, include
from auth_app.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),  # Updated to reference the correct app
    path('', home),
]
