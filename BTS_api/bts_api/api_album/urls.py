from django.urls import path

from . import views

urlpatterns= [
    path('', views.AlbumAPI.as_view()),  # get
    path('<int:pk>/', views.AlbumDetailAPI.as_view()),  # get
    path('new/', views.AlbumCreateAPI.as_view()),  # post
    path('edit/<int:pk>/', views.AlbumAPI.as_view()),  # put
    path('detail/<int:pk>/', views.AlbumAPI.as_view()),  # get
    path('delete/', views.AlbumAPI.as_view()),  # delete

    path('comment/new/', views.CommentAPI.as_view()),  # post
    path('comment/<int:pk>/', views.CommentAPI.as_view()),  # put
]
