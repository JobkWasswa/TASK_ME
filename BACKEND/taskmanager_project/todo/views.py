from rest_framework import viewsets
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-createdAt') 
    serializer_class = TodoSerializer

    @action(detail=False, methods=['delete'])
    def clear_completed(self, request):  
        
        """Custom endpoint to delete all completed tasks."""
        count, _ = Todo.objects.filter(completed=True).delete()
        
        return Response({'message': f'Cleared {count} completed tasks.'}, 
                        status=status.HTTP_204_NO_CONTENT)