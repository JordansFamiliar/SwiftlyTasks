from django.http import JsonResponse
from swiftlytasks.views import dashboard
from django_setup import setup_django

setup_django()

def handler(request):
    return dashboard(request)
