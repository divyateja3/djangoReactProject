from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from risk.models import Equities, Returns
from risk.serializers import EquitiesSerializer, ReturnsSerializer


def index(request):
    context = {}
    return render(request, 'index.html', context)


@api_view(['GET'])
def equities_list(request, equity_id):
    if request.method == 'GET':
        data = Equities.objects.filter(pk=equity_id)
        serializer = EquitiesSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def returns_list(request, equity_id):
    if request.method == 'GET':
        data = Returns.objects.filter(equity_id=equity_id)
        serializer = ReturnsSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
