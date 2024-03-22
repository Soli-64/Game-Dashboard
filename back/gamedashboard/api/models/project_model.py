from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=64, default='Projet')
    description = models.CharField(max_length=256, default='Votre description')
    version = models.CharField(max_length=8, default='0.0.1')
    repository_url = models.CharField(max_length=2048, default='git/default/url')
    user_id = models.IntegerField(default=0)

    def __str__(self):
        return self.name
