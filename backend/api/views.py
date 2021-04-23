from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializers
from .models import Todo
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Todo App Dev</h1>")

class TodoView(viewsets.ModelViewSet):
    serializer_class=TodoSerializers
    queryset=Todo.objects.all()


