# api/create_task.py

from django.http import JsonResponse
from mydjangoapp.views import create_task

def handler(request):
    return create_task(request)
