# 👟 Sneaker Store – Mobile E-commerce App

A full-featured mobile e-commerce app for a sneaker store, built with **Ionic 8, Angular 18 and Capacitor 6** for Android. It includes a complete shopping flow for customers and an admin panel to manage the catalog and sales, with local persistence using **SQLite**.

> Final project for the Mobile Application Development course – Computer Engineering, Duoc UC.

## 📸 Screenshots

| Home | Product detail | Cart | Admin panel |
|------|----------------|------|-------------|
| ![Home] | ![Detail] | ![Cart] | ![Admin]|

## ✨ Features

### Customers
- Sign up, log in and password recovery via security question
- Browse sneakers by category and brand
- Product detail with stock availability
- Shopping cart and checkout flow (simulated payment)
- Order history and digital receipts
- Profile editing with photo from the device camera

### Administrators
- Role-based access (admin / customer)
- Full CRUD for products and categories
- Inventory and stock management
- Sales overview and receipt details for all customers

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Ionic 8 + Angular 18 |
| Language | TypeScript |
| Native runtime | Capacitor 6 (Android) |
| Database | SQLite (cordova-sqlite-storage) |
| Native features | Camera, Native Storage, Browser |
| Testing | Jasmine + Karma |

## 🏗️ Architecture

- **Pages**: 25+ feature pages (customer and admin flows), each lazy-loaded with its own routing module.
- **Services**: data access is separated by domain (users, roles, sneakers, categories, brands, inventory, sales, sale details, payment methods, order history).
- **Database layer**: all SQL queries use parameterized statements to prevent SQL injection.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Ionic CLI: `npm install -g @ionic/cli`
- Android Studio (to run on a device or emulator)

### Installation

```bash
git clone https://github.com/benjvv19/Proyecto-Movile-Fin.git
cd Proyecto-Movile-Fin
npm install
```

### Run on Android

```bash
ionic build
npx cap sync android
npx cap open android
```

Then run the app from Android Studio on an emulator or physical device.

> ⚠️ SQLite is a native plugin, so the app must run on Android (not in the browser with `ionic serve`).

### Download the APK
You can download the latest APK from the [Releases](../../releases) section.

## 🧪 Tests

```bash
npm test
```

## 🗺️ Roadmap

- [ ] Hash passwords (bcrypt) instead of storing them in plain text
- [ ] Route guards to protect admin pages
- [ ] Move data to a cloud backend (Supabase / Firebase) for multi-device sync
- [ ] Real payment integration (Mercado Pago sandbox)
- [ ] Split the database service into smaller repositories

## 👤 Author

**Benjamín Camus** – Computer Engineering student at Duoc UC  
[LinkedIn](https://www.linkedin.com/in/benjam%C3%ADn-camus/) · [GitHub](https://github.com/benjvv19)
