# Generated by Django 5.1.6 on 2025-03-07 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_alter_usuario_options_remove_usuario_tipo_usuario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='rol',
            field=models.CharField(choices=[('admin', 'Administrador'), ('usuario', 'Usuario Normal')], default='usuario', max_length=20),
        ),
    ]
