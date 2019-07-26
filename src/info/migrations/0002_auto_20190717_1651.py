# Generated by Django 2.2.3 on 2019-07-17 16:51

import django.core.validators
from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='infofield',
            name='choices',
        ),
        migrations.AddField(
            model_name='asset',
            name='deposit_types',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('SWIFT', 'SWIFT'), ('BTC', 'BTC')], default='SWIFT', max_length=30),
        ),
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
