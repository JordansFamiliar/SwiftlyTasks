# api/dashboard.py

from django.http import JsonResponse
from mydjangoapp.views import dashboard

def handler(request):
    return dashboard(request)
