from django.db import models
from usuarios.models import Usuario

class GastoComun(models.Model):
    # Residente asociado al gasto
    residente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    
    # Detalles de los gastos comunes
    agua = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    luz = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gas = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    calefaccion = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Gastos generales del edificio
    seguridad = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    mantenimiento = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    aseo = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Monto total de todos los gastos
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Estado del pago
    estado = models.CharField(max_length=10, choices=[('pendiente', 'Pendiente'), ('pagado', 'Pagado')], default='pendiente')
    
    # Fecha de emisión del gasto
    fecha = models.DateField(auto_now_add=True)

    def calcular_total(self):
        """Método para calcular el total del gasto común basado en los campos individuales."""
        self.total = (self.agua + self.luz + self.gas + self.calefaccion + 
                      self.seguridad + self.mantenimiento + self.aseo)
        self.save()

    def __str__(self):
        return f"Gasto Común de {self.residente.username} - Total: ${self.total} ({self.estado})"
