from django.shortcuts import render, redirect
from django.views.generic.base import TemplateView
from .models import Room
from .forms import RoomForm

from .serializers import RoomSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

class Rooms(TemplateView):
    template_name = 'rooms/rooms.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['rooms'] = Room.objects.all()
        return context



def add_room(request, *args, **kwargs):
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            print(form.errors)
        return redirect('add-room')
    form = RoomForm()
    ctx = {'form':form}
    return render(request, 'rooms/room.html', context=ctx)


@api_view(['GET'])
def room_api(request, *args, **kwargs):
    rooms = Room.objects.all()
    # print(rooms)
    data = RoomSerializer(rooms, many=True).data
    # print(data)
    return Response(data)