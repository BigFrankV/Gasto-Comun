from django.db import models
from usuarios.models import Usuario

class Multa(models.Model):
    residente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    motivo = models.TextField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')], default='pendiente')

    def __str__(self):
        return f"Multa: {self.motivo} - ${self.monto}"
