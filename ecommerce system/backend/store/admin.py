from django.contrib import admin
from .models import Product, Profile, Cart, Wishlist, Address, Order, OrderItem


admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Cart)
admin.site.register(Wishlist)
admin.site.register(Address)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_price",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "user__username",
        "id",
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "product",
        "quantity",
        "price",
    )