# Generated by Django 5.0 on 2024-01-11 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('swiftlytasks', '0003_rename_permission_custompermission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=150),
        ),
    ]
