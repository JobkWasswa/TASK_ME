from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateField(required=False, allow_null=True)
    
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'dueDate', 'createdAt']
        read_only_fields = ['id', 'createdAt'] 