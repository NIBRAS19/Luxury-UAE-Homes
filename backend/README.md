
# Luxe UAE Homes - Django Backend

This is the Django backend for the Luxe UAE Homes application, providing a RESTful API for the React frontend.

## Setup Instructions

### Prerequisites
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository
2. Create a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example`:
```
cp .env.example .env
```
Then edit the `.env` file to add your database credentials and other settings.

5. Apply migrations:
```
python manage.py migrate
```

6. Create initial data:
```
python run_initial_setup.py
```

7. Run the development server:
```
python manage.py runserver
```

### Authentication

The API uses JWT authentication. To authenticate:

1. Obtain a token:
```
POST /api/users/login/
{
    "email": "your_email@example.com",
    "password": "your_password"
}
```

2. Include the token in API requests:
```
Authorization: Bearer <your_access_token>
```

3. Refresh the token when it expires:
```
POST /api/users/login/refresh/
{
    "refresh": "<your_refresh_token>"
}
```

### API Documentation

The API endpoints are available at:

- Users: `/api/users/`
- Properties: `/api/properties/`
- Areas: `/api/areas/`
- Market Insights: `/api/market-insights/`
