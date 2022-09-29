from rest_framework import serializers

from .models import Equities, Returns


class EquitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equities
        fields = ('id', 'name')


class ReturnsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Returns
        fields = ('date', 'returns')
