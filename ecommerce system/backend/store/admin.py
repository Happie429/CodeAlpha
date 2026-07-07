from django.contrib import admin
from .models import (
    Product,
    Cart,
    Profile,
    Wishlist,
    Address,
    Order,
    OrderItem,
)

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Profile)
admin.site.register(Wishlist)
admin.site.register(Address)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_amount",
        "payment_method",
        "status",
        "ordered_on",
    )

    list_filter = (
        "status",
        "ordered_on",
    )

    search_fields = (
        "user__username",
        "id",
    )

    inlines = [OrderItemInline]