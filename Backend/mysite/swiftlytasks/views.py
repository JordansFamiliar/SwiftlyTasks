from django.contrib.auth.hashers import make_password
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.template import loader
from datetime import datetime
import json
from .models import *

def index(request):
    return HttpResponse("Hello, world. You're at the swiftlytasks index.")

@ensure_csrf_cookie
def CustomLoginView(request):
    template = loader.get_template("swiftlytasks/base.html")

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')

            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'success': True, 'message': 'Login successful'})
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': request.COOKIES.get('csrftoken', '')})

@ensure_csrf_cookie
def user_registration(request):
    template = loader.get_template("swiftlytasks/base.html")

    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')
            username = data.get('username')

            # Check if a user with the provided email already exists
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email is already registered'})

            # Add any additional validation logic here

            user = CustomUser.objects.create_user(email=email, password=password, username=username)

            user.backend = 'swiftlytasks.backends.EmailBackend'
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Registration successful'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return render(request, 'base.html')

@login_required
def create_task(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        task_name = data.get('task_name')
        description = data.get('description', '')
        priority = data.get('priority', 1)
        due_date_str = data.get('due_date')
        status = data.get('status', 'todo')

        try:
            due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None
        except ValueError:
            return JsonResponse({'success': False, 'message': 'Invalid due date format. Please use YYYY-MM-DD.'})

        task = Task.objects.create(
            task_name=task_name,
            description=description,
            priority=priority,
            due_date=due_date,
            status=status,
            user=request.user
        )

        return JsonResponse({'success': True, 'message': 'Task created successfully.'})

    return render(request, 'base.html')

@login_required
def dashboard(request):
    if request.user.is_authenticated:
        tasks = Task.objects.filter(user=request.user)
        return JsonResponse({'success': True, 'tasks': list(tasks.values())})
    else:
        return JsonResponse({'success': False, 'message': 'User not authenticated'})

@require_POST
def delete_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        task.delete()
        return JsonResponse({'success': True, 'message': 'Task deleted successfully'})
    except Task.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Task not found'})


def edit_task(request, task_id):
    task = Task.objects.get(id=task_id)

    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        try:
            task_instance = Task.objects.get(id=task_id)
            task_instance.task_name=data.get('task_name')
            task_instance.description=data.get('description')
            task_instance.priority=data.get('priority')
            task_instance.due_date=data.get('due_date')
            task_instance.status=data.get('status')
            task_instance.user=request.user
            task_instance.save()
            return JsonResponse({'success': True, 'message': 'Task updated successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    return render(request, 'base.html')
