from django.shortcuts import render, HttpResponse, redirect


import json
import requests
 
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

# For wallet
API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNkZWE2NmExLTNlNzAtNGI3MC05NzBlLTA1OWM3ODUwYWExMSIsIm9yZ0lkIjoiMzY4MzUyIiwidXNlcklkIjoiMzc4NTc0IiwidHlwZUlkIjoiMWM5NjNhZjMtNmI0MS00MjNmLWIxZjMtZmQzNmIyNWViZTcyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDI2NjA2NjcsImV4cCI6NDg1ODQyMDY2N30.aAvDulvldaEoYavWBUAJ3MzJlsh-RgX9gQYebctAGxU'
if API_KEY == 'WEB3_API_KEY_HERE':
    print("API key is not set")
    raise SystemExit


def moralis_auth(request):
    return render(request, 'login.html', {})

def my_profile(request):
    return render(request, 'profile.html', {})

def request_message(request):
    data = json.loads(request.body)
    print(data)

    REQUEST_URL = 'https://authapi.moralis.io/challenge/request/evm'
    request_object = {
      "domain": "defi.finance",
      "chainId": 1,
      "address": data['address'],
      "statement": "Please confirm",
      "uri": "https://defi.finance/",
      "expirationTime": "2023-01-01T00:00:00.000Z",
      "notBefore": "2020-01-01T00:00:00.000Z",
      "timeout": 15
    }
    x = requests.post(
        REQUEST_URL,
        json=request_object,
        headers={'X-API-KEY': API_KEY})

    return JsonResponse(json.loads(x.text))


def verify_message(request):
    data = json.loads(request.body)
    print(data)

    REQUEST_URL = 'https://authapi.moralis.io/challenge/verify/evm'
    x = requests.post(
        REQUEST_URL,
        json=data,
        headers={'X-API-KEY': API_KEY})
    print(json.loads(x.text))
    print(x.status_code)
    if x.status_code == 201:
        # user can authenticate
        eth_address=json.loads(x.text).get('address')
        print("eth address", eth_address)
        try:
            user = User.objects.get(username=eth_address)
        except User.DoesNotExist:
            user = User(username=eth_address)
            user.is_staff = False
            user.is_superuser = False
            user.save()
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['auth_info'] = data
                request.session['verified_data'] = json.loads(x.text)
                return JsonResponse({'user': user.username})
            else:
                return JsonResponse({'error': 'account disabled'})
    else:
        return JsonResponse(json.loads(x.text))


# For webpages

def index(request):
    dic = {
        'variable1':'1',
        'variable2':'2',
        'variable3':'3'
    }
    return render(request, 'index.html',dic)


def about(request):
    return HttpResponse('hello')
    