from django.urls import path
from core import views

app_name = "core"

urlpatterns = [
    path('',views.index,name='index'),
    path('login/',views.login,name='login'),
    path('troca_senha/',views.troca_senha,name='troca_senha'),    
    path('logout_view/',views.logout_view,name='logout_view'),
    path('dashboard/', views.dashboard,name='dashboard'),
]