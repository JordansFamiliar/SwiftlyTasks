import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, Group as AuthGroup, Permission as AuthPermission

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(AuthGroup, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(AuthPermission, related_name='custom_user_set', blank=True)

    def __str__(self):
        return self.username

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_name = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.IntegerField(default=0)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('todo', 'To Do'), ('in_progress', 'In Progress'), ('done', 'Done')])
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.task_name

class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(max_length=100)
    description = models.TextField()
    admin = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='custom_groups')

    def __str__(self):
        return self.group_name

class Permission(AuthPermission):
    custom_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='custom_user_permissions')
