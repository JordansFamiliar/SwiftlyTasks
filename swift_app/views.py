from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import .
from .models import .

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
        form = UserRegistrationForm(request.POST, 
    pass

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
