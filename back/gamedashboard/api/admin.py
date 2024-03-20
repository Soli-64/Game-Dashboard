from django.contrib import admin
from .models.user_model import CustomUser

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'id', 'password', 'is_admin', 'name')
    search_fields = ['email', 'name']

# Register your models here.

admin.site.register(CustomUser, UserAdmin)
