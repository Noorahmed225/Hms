from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def signup(request):

    if request.method == "POST":

        try:
            data = json.loads(request.body)

            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            print("DATA RECEIVED:", data)

            if not name or not email or not password:
                return JsonResponse(
                    {"error": "All fields are required"},
                    status=400
                )

            if User.objects.filter(username=email).exists():
                return JsonResponse(
                    {"error": "User already exists"},
                    status=400
                )

            user = User.objects.create(
                username=email,
                email=email,
                first_name=name,
                password=make_password(password)
            )

            print("USER CREATED:", user)

            return JsonResponse(
                {"message": "Signup successful"},
                status=201
            )

        except Exception as e:

            print("ERROR:", e)

            return JsonResponse(
                {"error": str(e)},
                status=500
            )

    return JsonResponse(
        {"error": "Only POST request allowed"},
        status=405
    )

@csrf_exempt
def login(request):

    if request.method == "POST":

        try:
            data = json.loads(request.body)

            email = data.get("email")
            password = data.get("password")

            print("LOGIN DATA:", data)

            if not email or not password:
                return JsonResponse(
                    {"error": "Email and password are required"},
                    status=400
                )

            # Since signup stores email as username
            user = authenticate(
                username=email,
                password=password
            )

            if user is not None:

                print("LOGIN SUCCESS:", user.email)

                return JsonResponse(
                    {"message": "Login successful"},
                    status=200
                )

            else:

                print("LOGIN FAILED")

                return JsonResponse(
                    {"error": "Invalid email or password"},
                    status=401
                )

        except Exception as e:

            print("LOGIN ERROR:", e)

            return JsonResponse(
                {"error": str(e)},
                status=500
            )

    return JsonResponse(
        {"error": "Only POST request allowed"},
        status=405
    )