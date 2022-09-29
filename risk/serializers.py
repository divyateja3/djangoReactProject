from rest_framework import serializers

from .models import Equities


class EquitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equities
        fields = ('id', 'name')
