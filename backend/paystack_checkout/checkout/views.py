import os
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from supabase import create_client

from django.conf import settings

# Supabase client
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@api_view(['POST'])
def create_paystack_checkout(request):
    data = request.data
    email = data.get("email")
    items = data.get("items", [])
    amount = sum(item["price"] * item["quantity"] for item in items) * 100  # in kobo

    # 1. Save order in Supabase
    order_data = {
        "email": email,
        "status": "pending",
        "total_amount": amount / 100,
        "items": items
    }
    supabase.table("orders").insert(order_data).execute()

    # 2. Create Paystack payment request
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "email": email,
        "amount": amount,
        "callback_url": "http://localhost:3000/order-confirmation"
    }
    r = requests.post("https://api.paystack.co/transaction/initialize",
                      json=payload, headers=headers)
    res = r.json()

    return Response(res)
    
@api_view(['POST'])
def paystack_webhook(request):
    payload = request.data
    event = payload.get("event")
    
    if event == "charge.success":
        reference = payload["data"]["reference"]
        email = payload["data"]["customer"]["email"]

        # Update order status in Supabase
        supabase.table("orders").update({"status": "paid"}).eq("email", email).execute()

    return Response({"status": "success"})
