from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/equities/<int:equity_id>', views.equities_list, name='equities_list'),
    path('api/returns/<int:equity_id>', views.returns_list, name='returns_list')
]
