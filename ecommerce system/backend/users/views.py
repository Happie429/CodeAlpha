from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login



def register(request):

    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            return render(
                request,
                'register.html',
                {'error': 'Username already exists'}
            )

        User.objects.create_user(
            username=username,
            password=password
        )

        return redirect('/')

    return render(request, 'register.html')


def user_login(request):

    if request.method == "POST":

        username = request.POST['username']
        password = request.POST['password']
        role = request.POST['role']

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            if user.profile.role == role:

                login(request, user)

                if role == 'seller':
                    return redirect('dashboard')

                else:
                    return redirect('home')

        return render(
            request,
            'login.html',
            {'error':'Invalid Credentials'}
        )

    return render(
        request,
        'login.html'
    )


def user_logout(request):
    logout(request)
    return redirect('/')