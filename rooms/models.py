from django.db import models

# Create your models here.

class Room(models.Model):
    username = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    address = models.CharField(max_length=300)
    coordX = models.FloatField()
    coordY = models.FloatField()
    picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.username} - {self.address}'