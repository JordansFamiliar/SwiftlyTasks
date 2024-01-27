from django.http import JsonResponse
from ..swiftlytasks.views import edit_task

def handler(request, task_id):
    return edit_task(request, task_id)
