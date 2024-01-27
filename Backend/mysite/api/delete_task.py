from django.http import JsonResponse
from django.views.decorators.http import require_POST
from mydjangoapp.views import delete_task

@require_POST
def handler(request, task_id):
    return delete_task(request, task_id)
