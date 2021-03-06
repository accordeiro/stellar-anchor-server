# Generated by Django 2.2.3 on 2019-07-26 20:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='name',
            field=models.TextField(unique=True, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name='infofield',
            name='name',
            field=models.TextField(validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name='withdrawaltype',
            name='name',
            field=models.TextField(validators=[django.core.validators.MinLengthValidator(1)]),
        ),
    ]
