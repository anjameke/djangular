from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from tickets.models import Ticket
from tickets.serializers import TicketSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def ticket_list(request):
    if request.method == 'GET':
        tickets = Ticket.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            tickets = tickets.filter(title__icontains=title)
        
        tickets_serializer = TicketSerializer(tickets, many=True)
        return JsonResponse(tickets_serializer.data, safe=False)
    elif request.method == 'POST':
        ticket_data = JSONParser().parse(request)
        tickets_serializer = TicketSerializer(data=ticket_data)
        if tickets_serializer.is_valid():
            tickets_serializer.save()
            return JsonResponse(tickets_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(tickets_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Ticket.objects.all().delete()
        return JsonResponse({'message': '{} Tickets were sucessfully deleted'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def ticket_detail(request, pk):
    try:
        ticket = Ticket.objects.get(pk=pk)

        if request.method == 'GET':
            ticket_serializer = TicketSerializer(ticket)
            return JsonResponse(ticket_serializer.data)
        elif request.method == 'PUT':
            ticket_data = JSONParser().parse(request)
            ticket_serializer = TicketSerializer(ticket, data=ticket_data)
            if ticket_serializer.is_valid():
                ticket_serializer.save()
                return JsonResponse(ticket_serializer.data)
            return JsonResponse(ticket_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            ticket.delete()
            return JsonResponse({'message': 'Ticket was sucessfully deleted!'})
    except Ticket.DoesNotExist:
        return JsonResponse({'message': 'The ticket does not exist'}, status=status.HTTP_404_NOT_FOUND)
    return

@api_view(['GET'])
def ticket_list_finished(request):
    tickets = Ticket.objects.filter(published=True)

    if request.method == 'GET':
        tickets_serializer = TicketSerializer(tickets, many=True)
        return JsonResponse(tickets_serializer.data, safe=False)