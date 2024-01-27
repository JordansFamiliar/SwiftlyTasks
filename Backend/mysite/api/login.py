from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from mydjangoapp.views import CustomLoginView

@ensure_csrf_cookie
def handler(request):
    return CustomLoginView(request)
