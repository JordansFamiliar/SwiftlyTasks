from django import forms
from .models import *

class CustomUserLoginForm(forms.ModelForm):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def clean_password(self):
        password = self.cleaned_data.get('password')
        return password

class TaskCreationForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['task_name', 'description', 'priority', 'due_date', 'status', 'user']

    def __init__(self, *args, **kwargs):
        #Get the current user from the form's arguments
        user = kwargs.pop('user', None)

        super(TaskCreationForm, self).__init__(*args, **kwargs)

        #Set the default user as the current user
        if user:
            self.fields['user'].initial = user
class GroupCreationForm(forms.ModelForm):
    class Meta:
        model = Group
        fields = ['group_name', 'description', 'admin']

class UserGroupMembershipForm(forms.Form):
    user = forms.ModelChoiceField(queryset=CustomUser.objects.all(), empty_label=None)
    group = forms.ModelChoiceField(queryset=Group.objects.all(), empty_label=None)
