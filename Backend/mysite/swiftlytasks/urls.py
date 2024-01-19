from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.CustomLoginView, name="login"),
    path("register/", views.user_registration, name="register"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("add_task/", views.create_task, name="add_task"),
    path("delete_task/<uuid:task_id>/", views.delete_task, name="delete_task"),
    path("edit_task/<uuid:task_id>/", views.edit_task, name="edit_task"),
    path("logout/", LogoutView.as_view(), name="logout"),
    ]
