from rest_framework import viewsets
from .models import GastoComun
from .serializers import GastoComunSerializer
from rest_framework.permissions import IsAuthenticated

class GastoComunViewSet(viewsets.ModelViewSet):
    queryset = GastoComun.objects.all()
    serializer_class = GastoComunSerializer
    permission_classes = [IsAuthenticated]
