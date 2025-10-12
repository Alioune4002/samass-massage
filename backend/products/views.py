from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, Service, Availability, ContactMessage, Appointment, Tip
from .serializers import ProductSerializer, ServiceSerializer, AvailabilitySerializer, TipSerializer
from django.core.mail import send_mail, BadHeaderError
import stripe
import logging
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import json
import datetime
import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY

class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"message": "Disponibilité ajoutée avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({"message": "Disponibilité mise à jour avec succès"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Disponibilité supprimée avec succès"})

@api_view(['POST'])
def contact_form_submit(request):
    logger.info(f"Requête reçue sur /api/contact/: {request.method} {request.POST}")
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            phone = request.POST.get('phone', '')
            message = request.POST.get('message')
            if not all([name, email, message]):
                logger.warning("Champs manquants dans le formulaire de contact")
                return Response({'error': 'Tous les champs sont requis'}, status=status.HTTP_400_BAD_REQUEST)

            # Sauvegarde en base
            ContactMessage.objects.create(name=name, email=email, phone=phone, message=message)
            logger.info(f"Message sauvegardé pour {name} ({email})")

            # Email au masseur
            full_message = f"Nom: {name}\nEmail: {email}\nTéléphone: {phone or 'Non fourni'}\nMessage: {message}\n\nPour répondre, utilisez l'email {email}."
            try:
                send_mail(
                    subject=f'Nouveau message de {name} (Email: {email}, Téléphone: {phone or "N/A"})',
                    message=full_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                logger.info("Email envoyé au masseur avec succès")
            except BadHeaderError as bhe:
                logger.error(f"Erreur BadHeaderError lors de l'envoi au masseur: {str(bhe)}")
                return Response({'error': 'Erreur d\'en-tête email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error(f"Erreur SMTP lors de l'envoi au masseur: {str(e)}")
                return Response({'error': f'Erreur d\'envoi au masseur: {str(e)}. Vérifiez les logs.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Confirmation au client
            client_message = f"Bonjour {name},\n\nVotre message a été envoyé avec succès. Sammy vous contactera bientôt à {email} pour répondre à votre demande.\n\nMerci pour votre intérêt !\n\nMeilleures salutations,\nL'équipe SAMASS"
            try:
                send_mail(
                    subject='Confirmation d\'envoi - SAMASS',
                    message=client_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    fail_silently=False,
                )
                logger.info("Email de confirmation envoyé au client avec succès")
            except BadHeaderError as bhe:
                logger.error(f"Erreur BadHeaderError lors de l'envoi au client: {str(bhe)}")
                return Response({'error': 'Erreur d\'en-tête pour la confirmation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.error(f"Erreur SMTP lors de l'envoi au client: {str(e)}")
                return Response({'error': f'Erreur d\'envoi de confirmation: {str(e)}. Vérifiez les logs.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'Message envoyé avec succès. Vous recevrez une confirmation par email.'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Erreur inattendue dans contact_form_submit: {str(e)}")
            return Response({'error': f'Erreur inattendue: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'error': 'Méthode non autorisée'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def book_appointment(request):
    if request.method == 'POST':
        try:
            user_name = request.POST.get('user_name')
            user_email = request.POST.get('user_email')
            user_phone = request.POST.get('user_phone', '')
            service = request.POST.get('service')
            duration = int(request.POST.get('duration'))
            date = request.POST.get('date')
            time = request.POST.get('time')
            special_request = request.POST.get('special_request', '')
            price = float(request.POST.get('price', 0.00))

            if not all([user_name, user_email, service, duration, date, time]):
                return Response({'error': 'Tous les champs obligatoires sont requis'}, status=status.HTTP_400_BAD_REQUEST)

            if Availability.objects.filter(date=date, start_time__lte=time, end_time__gte=time, is_booked=True).exists():
                return Response({'error': 'Ce créneau est déjà réservé'}, status=status.HTTP_400_BAD_REQUEST)

            appointment = Appointment.objects.create(
                user_name=user_name, user_email=user_email, user_phone=user_phone,
                service=service, duration=duration, date=date, time=time,
                special_request=special_request, price=price
            )
            Availability.objects.filter(date=date, start_time__lte=time, end_time__gte=time).update(is_booked=True)

            admin_message = f"Nouvelle réservation:\nNom: {user_name}\nEmail: {user_email}\nTéléphone: {user_phone or 'Non fourni'}\nService: {service}\nDurée: {duration} min\nDate: {date}\nHeure: {time}\nPrix: {price} €\nDemande spéciale: {special_request}\n\nPour annuler ou donner des infos, contactez {user_email} ou {user_phone or 'N/A'}."
            send_mail(
                subject=f'Nouvelle réservation de {user_name}',
                message=admin_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            user_message = f"Merci {user_name} ! Votre réservation pour {service} ({duration} min) le {date} à {time} est confirmée. Prix: {price} €.\nAdresse : 1 place Guy Ropartz, Quimper, place 31\nMerci de nous appeler ou d'envoyer un message pour confirmer et donner plus de détails (code porte, appartement).\nMerci de prévenir à l'avance en cas d'imprévus."
            send_mail(
                subject=f'Confirmation de réservation - SAMASS',
                message=user_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user_email],
                fail_silently=False,
            )

            logger.info("Emails envoyés avec succès pour la réservation")
            return Response({'message': 'Réservation envoyée avec succès'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Erreur lors de la réservation: {str(e)}")
            return Response({'error': f'Erreur lors de l\'envoi du mail: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'error': 'Méthode non autorisée'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def update_appointment_status(request, appointment_id):
    if request.method == 'POST':
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            action = request.POST.get('action')
            if action == 'confirm':
                appointment.status = 'confirmed'
                message = f"Votre réservation pour {appointment.service} le {appointment.date} à {appointment.time} a été confirmée. Merci !"
                subject = f'Confirmation de réservation - SAMASS'
            elif action == 'cancel':
                appointment.status = 'canceled'
                message = f"Votre réservation pour {appointment.service} le {appointment.date} à {appointment.time} a été annulée. Nous sommes désolés !"
                subject = f'Annulation de réservation - SAMASS'
                Availability.objects.filter(date=appointment.date, start_time__lte=appointment.time, end_time__gte=appointment.time).update(is_booked=False)
            else:
                return Response({'error': 'Action non valide'}, status=status.HTTP_400_BAD_REQUEST)

            appointment.save()
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[appointment.user_email],
                fail_silently=False,
            )
            logger.info(f"Statut de la réservation {appointment_id} mis à jour: {action}")
            return Response({'message': f'Réservation {action}ée avec succès'})
        except Appointment.DoesNotExist:
            return Response({'error': 'Réservation non trouvée'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Erreur lors de la mise à jour: {str(e)}")
            return Response({'error': f'Erreur lors de la mise à jour: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'error': 'Méthode non autorisée'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'eur',
                        'product_data': {'name': 'Panier SAMASS'},
                        'unit_amount': int(float(request.POST.get('total')) * 100),
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url='http://localhost:3000/shop?success=true',
                cancel_url='http://localhost:3000/shop?canceled=true',
            )
            return Response({'id': session.id})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_google_calendar_availability(request):
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build
    from google.auth.transport.requests import Request

    if request.method == 'POST':
        try:
            date = request.POST.get('date')
            start_time = request.POST.get('start_time')
            duration = int(request.POST.get('duration'))
            end_time = (datetime.datetime.strptime(f"{date} {start_time}", '%Y-%m-%d %H:%M')
                       + datetime.timedelta(minutes=duration)).strftime('%H:%M')

            creds = None
            if os.path.exists(settings.GOOGLE_CALENDAR_CREDENTIALS):
                creds = Credentials.from_authorized_user_file(settings.GOOGLE_CALENDAR_CREDENTIALS, ['https://www.googleapis.com/auth/calendar'])
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        settings.GOOGLE_CALENDAR_CREDENTIALS, ['https://www.googleapis.com/auth/calendar']
                    )
                    creds = flow.run_local_server(port=0)
                with open(settings.GOOGLE_CALENDAR_CREDENTIALS, 'w') as token:
                    token.write(creds.to_json())

            service = build('calendar', 'v3', credentials=creds)
            event = {
                'summary': 'Disponibilité - SAMASS',
                'start': {'dateTime': f"{date}T{start_time}:00+02:00", 'timeZone': 'Europe/Paris'},
                'end': {'dateTime': f"{date}T{end_time}:00+02:00", 'timeZone': 'Europe/Paris'},
                'status': 'confirmed',
            }
            service.events().insert(calendarId='primary', body=event).execute()

            Availability.objects.create(date=date, start_time=start_time, end_time=end_time, is_booked=False)
            return Response({"message": "Disponibilité ajoutée avec succès"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Erreur Google Calendar: {str(e)}")
            return Response({'error': f'Erreur lors de l\'ajout: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def book_google_calendar_appointment(request):
    if request.method == 'POST':
        try:
            user_name = request.POST.get('user_name')
            user_email = request.POST.get('user_email')
            user_phone = request.POST.get('user_phone', '')
            service = request.POST.get('service')
            duration = int(request.POST.get('duration'))
            date = request.POST.get('date')
            time = request.POST.get('time')
            special_request = request.POST.get('special_request', '')
            price = float(request.POST.get('price', 0.00))

            if not all([user_name, user_email, service, duration, date, time]):
                return Response({'error': 'Tous les champs obligatoires sont requis'}, status=status.HTTP_400_BAD_REQUEST)

            if Availability.objects.filter(date=date, start_time__lte=time, end_time__gte=time, is_booked=True).exists():
                return Response({'error': 'Ce créneau est déjà réservé'}, status=status.HTTP_400_BAD_REQUEST)

            end_time = (datetime.datetime.strptime(f"{date} {time}", '%Y-%m-%d %H:%M')
                       + datetime.timedelta(minutes=duration)).strftime('%H:%M')

            from google.oauth2.credentials import Credentials
            from googleapiclient.discovery import build
            from google.auth.transport.requests import Request

            creds = None
            if os.path.exists(settings.GOOGLE_CALENDAR_CREDENTIALS):
                creds = Credentials.from_authorized_user_file(settings.GOOGLE_CALENDAR_CREDENTIALS, ['https://www.googleapis.com/auth/calendar'])
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        settings.GOOGLE_CALENDAR_CREDENTIALS, ['https://www.googleapis.com/auth/calendar']
                    )
                    creds = flow.run_local_server(port=0)
                with open(settings.GOOGLE_CALENDAR_CREDENTIALS, 'w') as token:
                    token.write(creds.to_json())

            service = build('calendar', 'v3', credentials=creds)
            event = {
                'summary': f'Réservation - {user_name} ({service})',
                'start': {'dateTime': f"{date}T{time}:00+02:00", 'timeZone': 'Europe/Paris'},
                'end': {'dateTime': f"{date}T{end_time}:00+02:00", 'timeZone': 'Europe/Paris'},
                'status': 'confirmed',
                'attendees': [{'email': settings.EMAIL_HOST_USER}],
            }
            event_result = service.events().insert(calendarId='primary', body=event).execute()

            appointment = Appointment.objects.create(
                user_name=user_name, user_email=user_email, user_phone=user_phone,
                service=service, duration=duration, date=date, time=time,
                special_request=special_request, price=price
            )
            Availability.objects.filter(date=date, start_time__lte=time, end_time__gte=time).update(is_booked=True)

            admin_message = f"Nouvelle réservation:\nNom: {user_name}\nEmail: {user_email}\nTéléphone: {user_phone or 'Non fourni'}\nService: {service}\nDurée: {duration} min\nDate: {date}\nHeure: {time}\nPrix: {price} €\nDemande spéciale: {special_request}\nLien Google Calendar: {event_result.get('htmlLink', 'N/A')}"
            send_mail(
                subject=f'Nouvelle réservation de {user_name}',
                message=admin_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            user_message = f"Merci {user_name} ! Votre réservation pour {service} ({duration} min) le {date} à {time} est confirmée. Prix: {price} €.\nAdresse : 1 place Guy Ropartz, Quimper, place 31\nMerci de nous appeler ou d'envoyer un message pour confirmer et donner plus de détails (code porte, appartement).\nMerci de prévenir à l'avance en cas d'imprévus.\nLien Google Calendar: {event_result.get('htmlLink', 'N/A')}"
            send_mail(
                subject=f'Confirmation de réservation - SAMASS',
                message=user_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user_email],
                fail_silently=False,
            )

            logger.info("Emails et événement Google Calendar créés avec succès")
            return Response({'message': 'Réservation confirmée, emails envoyés'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Erreur lors de la réservation Google Calendar: {str(e)}")
            return Response({'error': f'Erreur lors de la réservation: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)