from django.urls import path, include
from .views import MovieListAPIView, MovieDetailAPIView, signup, login_view, logout_view, auth_status

urlpatterns = [
    path('api/movies/', MovieListAPIView.as_view(), name='movie-list'),
    path('api/movies/<int:id>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path('api/signup/', signup, name='signup'),
    path('api/auth/login/', login_view, name='login'),
    path('api/auth/logout/', logout_view, name='logout'),
    path('api/auth/status/', auth_status, name='auth_status'),
]
