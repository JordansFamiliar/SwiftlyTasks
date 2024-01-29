from django.http import JsonResponse
from swiftlytasks.views import dashboard

def handler(request):
    return dashboard(request)
