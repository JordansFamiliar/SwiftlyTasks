from django.db import models

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_name = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.IntegerField(default=0)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('todo', 'To Do'), ('in_progress', 'In Progress'), ('done', 'Done')])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.task_name

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.TextField()

    def __str__(self):
        return self.username

class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(max_length=100)
    description = models.TextField()
    admin = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.group_name
