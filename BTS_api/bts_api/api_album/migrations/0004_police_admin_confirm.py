# Generated by Django 3.0.2 on 2020-03-04 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_album', '0003_auto_20200302_1551'),
    ]

    operations = [
        migrations.AddField(
            model_name='police',
            name='admin_confirm',
            field=models.BooleanField(default=False),
        ),
    ]