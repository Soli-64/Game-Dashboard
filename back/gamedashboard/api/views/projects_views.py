from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from ..models.project_model import Project
from ..models.user_model import CustomUser
from ..functions.bdd_functions import get_verified_ids
from ..functions.verif_functions import is_valid_version
from ..classes.error import Error

@api_view(['POST'])
def create_project(request):
    if request.method == 'POST':
        name: str = request.data.get('name')
        user_id: int = request.data.get('user_id')
        repository_url: str = request.data.get('repo_url')
        version: str = request.data.get('version')

        if name and user_id:
            if user_id in get_verified_ids():

                if is_valid_version(version):

                    Project.objects.create(
                        name= name,
                        description= '',
                        version= version,
                        repository_url= repository_url,
                        user_id= user_id,
                    )

                else: 
                    return JsonResponse(Error.throw(400, 'L\'utilisateur choisi n\'est pas vérifiez, essayez de vous deconnecter ou contactez le support'), status=400)

        else:
            return JsonResponse(Error.throw(400, 'Erreur nom user ou user_id'), status=400)
        
    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)


@api_view(['POST'])
def get_user_projects(request):
    if request.method == 'POST':

        user_id = request.data.get('user_id')

        if user_id:

            projects = list(Project.objects.filter(user_id= user_id).values())

            return JsonResponse({
                "success": True,
                "content": projects
            })

        else:
            return JsonResponse(Error.throw(400, 'Erreur user_id'), status=400)

    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)


@api_view(['POST'])
def del_user_project(request):
    if request.method == 'POST':

        user_id = request.data.get('user_id')
        project_id = request.data.get('proj_id')
        submit_password = request.data.get('password')

        try:

            user = CustomUser.objects.get(id= user_id)

            if check_password(submit_password, user.password):
                Project.objects.delete(id= project_id)

        except:

            return JsonResponse( Error.throw(400, 'Erreur user_id ou get Custome_User'), status=400 )
        