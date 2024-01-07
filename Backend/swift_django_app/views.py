from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .forms import .
from .models import .

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                # handle unsuccessful login
                pass
    else:
        form = UserLoginForm()

    return render(request, 'login.html', {'form': form}

@login_required
def create_task(request):
    if request.method == 'POST':
        form = TaskCreationForm(request.POST, user=request.user)
        if form.is_valid():
            form.save()
            return redirect('task_list')
    else:
        form = TaskCreationForm(user=request.user)

    return render(request, 'create_task.html', {'form': form})

def user_registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = UserCreationForm()

    return render(request, 'registration/register.html', {'form': form})

@login_required
def create_group(request):
    pass

@login_required
def update_task(request):
    pass

@login_required
def update_user(request):
    pass

@login_required
def update_group(request):
    pass

@login_required
def delete_task(request):
    pass

@login_required
def delete_user(request):
    pass

@login_required
def delete_group(request):
    pass

@login_required
def task_list(request):
    """View user tasks"""
    tasks = Task.objects.filter(user=request.user)
    return render(request, 'task_list.html', {'tasks': tasks})
