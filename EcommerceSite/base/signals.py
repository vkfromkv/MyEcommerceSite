from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    """
    Signal handler to update a user's username with their email address.

    This function is connected to the pre_save signal of the User model.
    It modifies the `username` field of the User instance, setting it to
    the value of the `email` field, provided the email field is not empty.

    Parameters:
    sender (Model): The model class sending the signal. Should be `User`.
    instance (User): The instance of the User being saved.
    kwargs: Additional keyword arguments (not used in this function).
    """
    user = instance
    if user.email != '':
        user.username = user.email

# Connect the updateUser function to the pre_save signal for the User model
pre_save.connect(updateUser, sender=User)
