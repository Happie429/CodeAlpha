from django.contrib import admin
from .models import Product, Cart, Profile, Address,Wishlist

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Profile)
admin.site.register(Address)
admin.site.register(Wishlist)