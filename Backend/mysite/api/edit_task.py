from django.http import JsonResponse
from swiftlytasks.views import edit_task
from django_setup import setup_django

setup_django()

def handler(request, task_id):
    return edit_task(request, task_id)
