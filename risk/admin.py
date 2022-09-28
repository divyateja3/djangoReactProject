from django.contrib import admin

# Register your models here.
from risk.models import Equities, Returns

admin.site.register(Equities)
admin.site.register(Returns)
