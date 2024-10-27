from django.urls import path, re_path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('contacts/add/', views.add_contact, name='add_contact'),
    re_path(r'^contacts/search/(?P<registration_number>[\w\/\-\.\@]+)/$', views.search_contact, name='search_contact'),
    re_path(r'^contacts/delete/(?P<registration_number>[\w\/\-\.\@]+)/$', views.delete_contact, name='delete_contact'),
    re_path(r'^contacts/update/(?P<registration_number>[\w\/\-\.\@]+)/$', views.update_contact, name='update_contact'),
]

