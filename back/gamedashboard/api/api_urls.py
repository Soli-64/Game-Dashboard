from django.urls import path
from .views.auth_views import signup_view, login_view, logout_view, validate_email_view
from .views.projects_views import create_project, get_user_projects

urlpatterns = [
    path('signup', signup_view),
    path('login', login_view),
    path('validate-email', validate_email_view),
    path('logout', logout_view),
    path('create-project', create_project),
    path('get-projects', get_user_projects),
]
