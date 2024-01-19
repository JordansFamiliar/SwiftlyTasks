from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission, Group
from django.db import models
import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # create and return a regular user with an email and password
        email = self.normalise_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # create and return a superuser with an email and password
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password=password, **extra_fields)

    def normalise_email(self, email):
        # Normalize the email by lowercasing the domain part
        email_parts = email.split('@')
        email = '@'.join([email_parts[0], email_parts[1].lower()])
        return email

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=255, blank=False)

    username = models.CharField(max_length=150, unique=False)

    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)

    objects = CustomUserManager()

    def clean(self):
        # Normalize the email using CustomUserManager
        self.email = self.__class__.objects.normalise_email(self.email)
        super().clean()

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    priority = models.IntegerField(default=0, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('todo', 'To Do'), ('in_progress', 'In Progress'), ('done', 'Done')],
                              blank=True, null=True)
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

class CustomPermission(Permission):
    custom_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='custom_user_permissions')
# Create your models here.
