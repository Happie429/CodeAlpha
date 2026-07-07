from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect
from .forms import ProductForm
from decimal import Decimal
from django.contrib.auth.decorators import login_required
from .models import (
    Product,
    Cart,
    Profile,
    Address,
    Wishlist,
    Order,
    OrderItem,
)

# HOME PAGE

def home(request):

    products = Product.objects.all()[:4]

    cart_count = 0
    wishlist_items = []
    cart_items = {}

    if request.user.is_authenticated:

        cart = Cart.objects.filter(user=request.user)

        cart_count = cart.count()

        # Dictionary:
        # {product_id: quantity}
        cart_items = {
            item.product.id: item.quantity
            for item in cart
        }

        wishlist_items = Wishlist.objects.filter(
            user=request.user
        ).values_list("product_id", flat=True)

    return render(
        request,
        "home.html",
        {
            "products": products,
            "cart_count": cart_count,
            "wishlist_items": wishlist_items,
            "cart_items": cart_items,
        }
    )
def all_products(request):

    products = Product.objects.all()

    cart_count = 0

    if request.user.is_authenticated:
        cart_count = Cart.objects.filter(
            user=request.user
        ).count()

    return render(
        request,
        'all_products.html',
        {
            'products': products,
            'cart_count': cart_count
        }
    )
# PRODUCT DETAIL

def product_detail(request, product_id):

    product = get_object_or_404(
        Product,
        id=product_id
    )

    return render(
        request,
        'product_detail.html',
        {
            'product': product
        }
    )


# ADD TO CART

def add_to_cart(request, product_id):

    if not request.user.is_authenticated:
        return redirect('/login/')

    product = Product.objects.get(id=product_id)

    cart_item = Cart.objects.filter(
        user=request.user,
        product=product
    ).first()

    if cart_item:
        cart_item.quantity += 1
        cart_item.save()
    else:
        Cart.objects.create(
            user=request.user,
            product=product,
            quantity=1
        )

    return redirect('/cart/')
from django.shortcuts import get_object_or_404

def increase_cart(request, product_id):
    if not request.user.is_authenticated:
        return redirect('login')

    product = get_object_or_404(Product, id=product_id)

    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product=product
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return redirect('home')


def decrease_cart(request, product_id):
    if not request.user.is_authenticated:
        return redirect('login')

    product = get_object_or_404(Product, id=product_id)

    cart_item = Cart.objects.filter(
        user=request.user,
        product=product
    ).first()

    if cart_item:
        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
        else:
            cart_item.delete()

    return redirect('home')


# CART PAGE

def cart(request):

    if not request.user.is_authenticated:
        return redirect('/login/')

    cart_items = Cart.objects.filter(
        user=request.user
    )

    total = 0

    for item in cart_items:
        total += item.product.price * item.quantity

    return render(
        request,
        'cart.html',
        {
            'cart_items': cart_items,
            'total': total
        }
    )


# REMOVE ITEM

def remove_from_cart(request, cart_id):

    if not request.user.is_authenticated:
        return redirect('/login/')

    cart_item = Cart.objects.get(id=cart_id)

    cart_item.delete()

    return redirect('/cart/')


# INCREASE QUANTITY

def increase_quantity(request, cart_id):

    cart_item = Cart.objects.get(id=cart_id)

    cart_item.quantity += 1

    cart_item.save()

    return redirect('/cart/')


# DECREASE QUANTITY

def decrease_quantity(request, cart_id):

    cart_item = Cart.objects.get(id=cart_id)

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()

    return redirect('/cart/')


# PROFILE PAGE
@login_required
def profile(request):
    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    if request.method == "POST":
        if "profile_image" in request.FILES:
            profile.profile_image = request.FILES["profile_image"]
            profile.save()

    return render(
        request,
        "profile.html",
        {
            "profile": profile
        }
    )
# ORDERS PAGE

@login_required
def orders(request):
    orders = Order.objects.filter(
        user=request.user
    ).order_by("-ordered_on")

    return render(request, "orders.html", {
        "orders": orders
    })

# PAYMENTS PAGE

def payments(request):

    return render(
        request,
        'payments.html'
    )


# SETTINGS PAGE

def settings(request):

    return render(
        request,
        'settings.html'
    )


# REGISTER

def register(request):

    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():

            return render(
                request,
                'register.html',
                {
                    'error': 'Username already exists'
                }
            )

        User.objects.create_user(
            username=username,
            password=password
        )

        return redirect('/login/')

    return render(request, 'register.html')

def user_login(request):

    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            login(request, user)

            # Sab users Home Page par jayenge
            return redirect('home')

        return render(
            request,
            'login.html',
            {
                'error': 'Invalid Username or Password'
            }
        )

    return render(request, 'login.html')
# LOGOUT

def user_logout(request):

    logout(request)

    return redirect('/')
def category_products(request, category_name):
    products = Product.objects.filter(category__iexact=category_name)

    return render(request, "category_products.html", {
        "products": products,
        "category": category_name,
    })

@login_required
def delivery(request):

    if request.method == "POST":

        print(request.POST)

        Address.objects.create(
            user=request.user,
            full_name=request.POST["full_name"],
            phone=request.POST["phone"],
            email=request.POST["email"],
            address_line1=request.POST["address1"],
            address_line2=request.POST["address2"],
            city=request.POST["city"],
            state=request.POST["state"],
            pincode=request.POST["pincode"],
            country=request.POST["country"],
            latitude=request.POST.get("latitude"),
            longitude=request.POST.get("longitude"),
            current_location=request.POST.get("current_location"),
        )

        return redirect("payment")

    return render(request, "delivery.html")


@login_required
def wishlist(request):

    items = Wishlist.objects.filter(user=request.user)

    return render(request, "wishlist.html", {
        "items": items
    })

@login_required
def remove_wishlist(request, id):
    item = Wishlist.objects.get(id=id, user=request.user)
    item.delete()

    return redirect("wishlist")

@login_required
def add_to_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    Wishlist.objects.get_or_create(
        user=request.user,
        product=product
    )

    return redirect(request.META.get("HTTP_REFERER", "home"))


@login_required
def payment(request):

    if request.method == "POST":

        payment_method = request.POST.get("payment")

        request.session["payment_method"] = payment_method

        return redirect("review")

    return render(request, "payment.html")
def address(request):
    return render(request, "address.html")
@login_required
def review(request):

    address = Address.objects.filter(user=request.user).last()
    cart_items = Cart.objects.filter(user=request.user)

    total = 0

    for item in cart_items:
        total += item.product.price * item.quantity

    if request.method == "POST":

        payment_method = request.session.get("payment_method", "COD")

        order = Order.objects.create(
            user=request.user,
            address=address,
            total_amount=total,
            payment_method=payment_method,
            status="Pending"
        )

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        # Empty cart after placing order
        cart_items.delete()

        return redirect("success")

    return render(request, "review.html", {
        "address": address,
        "cart_items": cart_items,
        "total": total,
    })

@login_required
def success(request):
    return render(request, "success.html")

