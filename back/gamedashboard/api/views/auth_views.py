from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import login, logout
from rest_framework.decorators import api_view
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.http import JsonResponse
from ..functions.email_functions import verify_email
from ..models.user_model import CustomUser
from..classes.error import Error
from ..functions.bdd_functions import get_verified_emails


@api_view(['POST'])
def signup_view(request):
    if request.method == 'POST':
        email: str = request.data.get('email')
        password: str = request.data.get('password')

        code = get_random_string(length=6)

        if email and password:

            if '@' not in email:
                return JsonResponse(Error.throw(400, 'Adresse e-mail invalide'), status=400)

            # Vérification des conditions du mot de passe (ajoutez votre propre validation si nécessaire)
            if len(password) < 8 or not any(char.isdigit() for char in password) or not any(char.isupper() for char in password) or not any(char.islower() for char in password):
                return JsonResponse(Error.throw(400, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'), status=400)

            # preexisting_user = CustomUser.objects.get(email=email)
            if not email in get_verified_emails():

                user = CustomUser.objects.create(email=email, password=make_password(password), verification_code=code)

                subject = 'Validation de votre adresse e-mail'
                message = f" Votre code de confirmation: {code} "
                
                send_mail(subject, message, 'ToolBox Email Confirmation', [email])

                user_data = {
                    'id': user.id,
                    'email': user.email,
                    # Ajoutez d'autres champs utilisateur si nécessaire
                }

                return JsonResponse({ 'success': True, 'user': user_data}, status=200)
            
            else:

                return JsonResponse(Error.throw(400, 'Duplicate Email: There is already an account with this email'), status=400)


        else:
            return JsonResponse(Error.throw(400, 'Wrong email or password'), status=400)
    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)
    

@api_view(['POST'])
def validate_email_view(request):
    if request.method == 'POST':
        try:
            
            user_id = request.data.get('id')
            submit_code = request.data.get('submitCode')

            user = CustomUser.objects.get(id=user_id)

            if verify_email(user, submit_code):
                user.email_verified = True
                user.save()
                login(request, user)

                user_data = {
                    'id': user.id,
                    'email': user.email,
                    'is_admin': user.is_admin  # Utiliser is_admin de CustomUser
                    # Ajoutez d'autres champs utilisateur si nécessaire
                }

                return JsonResponse({ 'success': True, 'user': user_data })
            
            else:

                return JsonResponse(Error.throw(400, 'Bad email code.'))


        except:
            return JsonResponse(Error.throw(500, 'Error while verifing email code.'), status=500)
    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)
    
    
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':

        email = request.data.get('email')
        password = request.data.get('password')

        user = CustomUser.objects.get(email=email)
        
        if user:
            if check_password(password, user.password):
                user.save()
                login(request, user)

                user_data = {
                    'id': user.id,
                    'email': user.email,
                    'is_admin': user.is_admin  # Utiliser is_admin de CustomUser
                }

                return JsonResponse({ 'success': True, 'user': user_data })
            else: 
                return JsonResponse(Error.throw(401, 'Mauvais mot de passe'), status=401)
        else:
            return JsonResponse(Error.throw(401, 'Aucun utilisateur trouvé avec cet email.'), status=401)
    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)
    
    
@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({ 'success': True })
    else:
        return JsonResponse(Error.throw(405, f'Method not allowed: {request.method}'), status=405)
