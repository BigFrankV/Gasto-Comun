from rest_framework import serializers
from .models import GastoComun

class GastoComunSerializer(serializers.ModelSerializer):
    class Meta:
        model = GastoComun
        fields = '__all__'
