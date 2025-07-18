from django.contrib import admin
from .models import Product, Service, Availability, Tip

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'is_active')

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_prices_display', 'description')

    def get_prices_display(self, obj):
        return obj.durations_prices  
    get_prices_display.short_description = 'Prix'

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('date', 'start_time', 'end_time', 'is_booked')

class TipAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'delay')

admin.site.register(Product, ProductAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Availability, AvailabilityAdmin)
admin.site.register(Tip, TipAdmin)