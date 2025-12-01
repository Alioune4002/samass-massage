from pathlib import Path
import os
import datetime

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-pt(izojve4xr&#_8red)nx-+ca9t7s0f9rjr8uw^zmw90z)f91'
DEBUG = False
ALLOWED_HOSTS = ['samass-massage.onrender.com']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'products',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # En haut
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
# STATICFILES_DIRS = [BASE_DIR / 'static'] 
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  
    ],
}

# AUTH_USER_MODEL = 'products.CustomUser'
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)
SITE_ID = 1

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://samass-massage-qy2b.vercel.app",
    "https://samassbysam.com",
    "https://samass-massage-git-master-aliounes-projects-6b545933.vercel.app",
]
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'OPTIONS',
    'PUT',
    'DELETE',
]
CORS_ALLOW_HEADERS = [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
]
CORS_ALLOW_CREDENTIALS = True

# Configuration SendGrid avec variable d'environnement
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.environ.get('SENDGRID_API_KEY', 'default_key_if_not_set')
DEFAULT_FROM_EMAIL = 'noreply@samassbysam.com'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=1),
}

STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY', 'your_test_secret_key')
STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY', 'your_test_public_key')

GOOGLE_CALENDAR_CREDENTIALS = BASE_DIR / 'credentials.json'