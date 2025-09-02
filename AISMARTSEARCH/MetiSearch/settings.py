# settings.py
import os
from pathlib import Path
from corsheaders.defaults import default_headers, default_methods

BASE_DIR = Path(__file__).resolve().parent.parent

# ── Core ───────────────────────────────────────────────────────────────────────
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-only-not-for-prod")
DEBUG = os.environ.get("DEBUG", "True") == "True"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".onrender.com",
    "lexx-ia.onrender.com",  # your API host on Render
]

# If behind Render's proxy, ensure request.is_secure() is correct
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# ── Apps ───────────────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    "corsheaders",                 # must be before Django’s common apps (installed apps order is fine)
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "Questions",
]

# ── Middleware (CORS FIRST!) ───────────────────────────────────────────────────
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",      # ✅ FIRST
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",  # keep after CorsMiddleware
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "MetiSearch.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "MetiSearch.wsgi.application"

# ── DB ─────────────────────────────────────────────────────────────────────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ── Auth ───────────────────────────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ── I18N/Time ──────────────────────────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ── Static/Media ───────────────────────────────────────────────────────────────
STATIC_URL = "/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Your paths (if you need them) ──────────────────────────────────────────────
STATIC_UPLOAD_DIR = os.path.join(BASE_DIR, "static/uploads")
BASE_LAWS = os.path.join(BASE_DIR, "static/BaseLaws")
CONTRACT_TEMPALTES = os.path.join(BASE_DIR, "static/ContractTemplates")  # (typo kept if used elsewhere)
GENERATED_FILES = os.path.join(BASE_DIR, "static/Generated_File")
INTERNAL_ACT = os.path.join(BASE_DIR, "static/Internal_Act")
LEAGLEREVIEW = os.path.join(BASE_DIR, "static/LeaglReview")

# ── OpenAI key (don’t raise on import; fail at runtime instead) ───────────────
OPENAI_KEY = os.environ.get("OPENAI_API_KEY")

# ── DRF/JWT ────────────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

# ── CORS (critical part) ───────────────────────────────────────────────────────
# Allow your dev origin and (if needed) prod web origin
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://lexx-ia-frontend.onrender.com",  # your frontend on Render
    "https://lexx-ia-1.onrender.com",

    # add your real frontend origin if different in prod, e.g. "https://your-frontend.tld"
]

# Allow cookies if you need them
CORS_ALLOW_CREDENTIALS = True

# Make sure JSON headers/methods and preflight are allowed
CORS_ALLOW_HEADERS = list(default_headers) + ["content-type", "authorization"]
CORS_ALLOW_METHODS = list(default_methods) + ["OPTIONS"]

# Only apply CORS to API routes (optional)
CORS_URLS_REGEX = r"^/api/.*$"

# If you sometimes test from a 192.168.* dev box, you may also need:
# CORS_ALLOW_PRIVATE_NETWORK = True

# If you use CSRF on authenticated endpoints, trust your web origins:
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://lexx-ia.onrender.com",
    "https://*.onrender.com",
    "https://lexx-ia-frontend.onrender.com",  # your frontend on Render
    "https://lexx-ia-1.onrender.com"


]

