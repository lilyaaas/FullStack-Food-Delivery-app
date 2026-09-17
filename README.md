# QuickFood

> A full-stack food ordering platform built with Laravel and React. QuickFood
> helps users discover restaurants, browse menus, place orders, and manage their
> profiles.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)

## 🎯 Features

- **Restaurant discovery**: Browse restaurants, categories, and menus.
- **Product catalog**: View menu items with details and pricing.
- **Authentication**: Register, log in, manage profiles, and log out.
- **Order management**: Place orders, view order history, and track status.
- **Restaurant tools**: Create restaurants, categories, and products.

## 🛠️ Tech Stack

### Backend API (`/Backend`)

- **Framework**: Laravel 12
- **Language**: PHP 8.2+
- **Authentication**: Laravel Sanctum
- **Database**: Laravel-supported database configured through `.env`

### Frontend SPA (`/Frontend`)

- **Framework**: React 19
- **Build tool**: Vite 7
- **State management**: Redux Toolkit
- **HTTP client**: Axios
- **Routing**: React Router

## 📁 Project Architecture

```text
QuickFood/
├── Backend/                    # Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/   # API endpoint logic
│   │   └── Models/             # Eloquent models
│   ├── database/
│   │   ├── migrations/         # Database schema
│   │   └── seeders/            # Initial data
│   └── routes/api.php          # API routes
│
└── Frontend/                  # React single-page application
	├── src/
	│   ├── api/               # API services
	│   ├── components/        # Reusable UI components
	│   ├── pages/             # Application pages
	│   ├── redux/             # Global state
	│   └── routes/            # Frontend routes
	└── package.json
```

## 🗄️ Core Models

- `User`: Authentication and profile data.
- `Restaurant`: Restaurant information and ownership.
- `Category`: Groups products within a restaurant.
- `Product`: Menu items and pricing.
- `Order` and `OrderItem`: Customer orders and their items.

## 🚀 Getting Started

### Prerequisites

- PHP 8.2 or newer
- Composer
- Node.js and npm

### 1. Backend Setup

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The API runs at `http://localhost:8000`.

### 2. Frontend Setup

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will display the frontend URL in the terminal.
