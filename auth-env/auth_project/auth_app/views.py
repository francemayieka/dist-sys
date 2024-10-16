# auth_app/views.py
import random
import string
from django.utils.timezone import now, timedelta
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import User
from .serializers import SignupSerializer
from django.http import JsonResponse
import os


def home(request):
    return JsonResponse({'message': 'Welcome to the Auth API!'})


def generate_otp():
    """Generate an 8-character alphanumeric OTP."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Signup successful!'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user:
        return Response({'message': f'Welcome, {user.username}!'}, status=200)
    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['PATCH'])
def forgot_password(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
        otp = generate_otp()
        expiry_time = now() + timedelta(minutes=15)  # OTP valid for 15 minutes

        # Update user with OTP and expiry time
        user.otp = otp
        user.otp_expiry = expiry_time
        user.save()

        # Send OTP via email
        send_mail(
            'Password Reset OTP',
            f'Your OTP is: {otp}. It will expire in 15 minutes.',
            os.getenv('EMAIL_HOST_USER'),  # Sender email from .env
            [user.email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent to your email.'}, status=200)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)

@api_view(['PATCH'])
def reset_password(request):
    email = request.data.get('email')
    otp = request.data.get('otp')
    new_password = request.data.get('new_password')

    try:
        user = User.objects.get(email=email)

        if user.otp != otp:
            return Response({'error': 'Invalid OTP.'}, status=400)
        if now() > user.otp_expiry:
            return Response({'error': 'OTP has expired.'}, status=400)

        # Update password
        user.set_password(new_password)
        user.otp = None  # Clear OTP
        user.otp_expiry = None
        user.save()

        return Response({'message': 'Password reset successful.'}, status=200)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)