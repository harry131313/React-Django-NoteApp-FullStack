from ast import Not
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializer import NoteSerializer
# from mynotes.api import serializer

# Create your views here.

@api_view(['GET'])
def getRoutes(req):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(req):
    note = Note.objects.all()
    serializer = NoteSerializer(note, many= True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(req, pk):
    note = Note.objects.get(id = pk)
    serializer = NoteSerializer(note, many= False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(req, pk):
    data = req.data 
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def createNote(req):
    data = req.data 
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many= False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(req, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted')
    