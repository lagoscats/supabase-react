from django.urls import path
from . import views

urlpatterns = [
    path("create-checkout/", views.create_paystack_checkout),
    path("webhook/", views.paystack_webhook),
]
