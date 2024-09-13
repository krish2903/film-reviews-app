# movies/models.py
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.FloatField() 
    image = models.URLField()     

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.rating is not None:
            self.rating = round(self.rating, 1)
        super(Movie, self).save(*args, **kwargs)
