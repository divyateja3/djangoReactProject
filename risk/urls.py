from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/equities', views.equities_list, name='equities_list'),
    path('api/returns', views.returns_list, name='returns_list')
]
