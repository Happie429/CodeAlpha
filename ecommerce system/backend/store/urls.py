from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.all_products, name='all_products'),

    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart, name='cart'),
    path('remove-cart/<int:cart_id>/', views.remove_from_cart, name='remove_cart'),

    path('profile/', views.profile, name='profile'),
    path('orders/', views.orders, name='orders'),
    path('wishlist/', views.wishlist, name='wishlist'),
    path('payments/', views.payments, name='payments'),
    path('settings/', views.settings, name='settings'),

    path('increase-quantity/<int:cart_id>/', views.increase_quantity, name='increase_quantity'),
    path('decrease-quantity/<int:cart_id>/', views.decrease_quantity, name='decrease_quantity'),
path('cart/increase/<int:product_id>/', views.increase_cart, name='increase_cart'),
path('cart/decrease/<int:product_id>/', views.decrease_cart, name='decrease_cart'),

    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),

path("wishlist/", views.wishlist, name="wishlist"),
path("wishlist/add/<int:product_id>/", views.add_to_wishlist, name="add_wishlist"),
path("wishlist/remove/<int:wishlist_id>/", views.remove_wishlist, name="remove_wishlist"),

path("checkout/payment/", views.payment, name="payment"),

path("checkout/address/", views.address, name="address"),
path("checkout/delivery/", views.delivery, name="delivery"),
path("checkout/payment/", views.payment, name="payment"),
path("checkout/review/", views.review, name="review"),
path("checkout/success/", views.success, name="success"),
path('delivery/', views.delivery, name='delivery'),
    # Category page
    path('category/<str:category_name>/', views.category_products, name='category_products'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)