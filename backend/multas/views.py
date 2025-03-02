from rest_framework import viewsets
from .models import Multa
from .serializers import MultaSerializer
from rest_framework.permissions import IsAuthenticated

class MultaViewSet(viewsets.ModelViewSet):
    queryset = Multa.objects.all()
    serializer_class = MultaSerializer
    permission_classes = [IsAuthenticated]
