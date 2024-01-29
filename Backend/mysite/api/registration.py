from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from swiftlytasks.views import user_registration

@ensure_csrf_cookie
def handler(request):
    return user_registration(request)
