from django.db import models

class Perfil(models.Model):
    id_perfil = models.AutoField(
        primary_key=True,        

    )
    descricao_perfil = models.CharField(
        max_length=100,        
    )

    def __str__(self):
        return self.descricao_perfil

    class Meta:
        db_table = 'perfil'