
from django.http import JsonResponse
from ..models.user_model import CustomUser


def verify_email(user, submit_code):
    try:

        if submit_code == user.verification_code:
            return True

    except CustomUser.DoesNotExist:
        return JsonResponse({ "success": False, "errors": {
            "description": "L'utilisateur demmandé n'existe pas ou n'est pas en attente.",
            "status": 400
        }})
    
