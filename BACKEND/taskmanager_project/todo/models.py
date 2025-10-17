from django.db import models
import uuid

class Todo(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    dueDate = models.DateField(blank=True, null=True) 
    createdAt = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title