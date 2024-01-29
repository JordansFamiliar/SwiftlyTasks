# api/create_task.py

from django.http import JsonResponse
from swiftlytasks.views import create_task
from django_setup import setup_django

setup_django()

def handler(request):
    return create_task(request)
