from django.contrib import admin
from .models.user_model import CustomUser
from .models.project_model import Project

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'id', 'password', 'is_admin', 'name')
    search_fields = ['email', 'name']

# Register your models here.
    
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'version', 'user_id', 'description', 'repository_url')
    search_fields = ['name', 'user_id']

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Project, ProjectAdmin)
