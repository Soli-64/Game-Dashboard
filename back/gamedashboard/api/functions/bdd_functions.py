from ..models.user_model import CustomUser


def get_verified_emails():
    # Récupérez tous les utilisateurs vérifiés de la base de données
    verified_users = CustomUser.objects.filter(email_verified=True)
    
    # Extraites les adresses e-mail de chaque utilisateur vérifié
    verified_emails = [user.email for user in verified_users]

    return verified_emails
