# 🌸 Tungal's Flower Shop - POS & Management System

A comprehensive, web-based Point of Sale (POS) and shop management system built for Tungal's Flower Shop. This application streamlines daily operations by integrating inventory tracking, sales processing, employee payroll, refund/return management, and delivery logistics into a single, cohesive platform.

## 🚀 Tech Stack

This project is built using a modern monolithic architecture:

* **Backend:** [Laravel](https://laravel.com/) (PHP Framework)
* **Frontend:** [React.js](https://reactjs.org/) with [Inertia.js](https://inertiajs.com/) (Server-driven SPA)
* **Styling:** Custom CSS & Bootstrap 5
* **Bundler:** [Vite](https://vitejs.dev/)
* **Database:** MySQL

## ✨ Key Features

### 🛡️ Admin Portal (Management)
* **Dashboard & Analytics:** Real-time metrics on sales, inventory levels, and store performance.
* **Inventory Management:** Add, update, and track flower stocks (including bundled/quantifier multipliers).
* **Employee Management:** Register new employees and manage role-based access.
* **Payroll System:** Generate, view, and manage detailed employee payrolls and deductions.
* **Returns & Auditing:** Audit and process refund/return requests submitted by cashiers with automated inventory restocking.

### 🛒 Cashier Portal (Point of Sale)
* **Product Catalog:** Browse available flowers and variants.
* **Dynamic Cart & Checkout:** Process orders dynamically based on base unit multipliers (e.g., individual stems vs. bouquets).
* **Order History:** View past transactions and generate formatted Invoice Receipts.
* **Refund Requests:** Integrated multi-step modal to initiate return requests directly to the Admin.

### 🚚 Delivery Portal
* **Logistics Tracking:** View pending deliveries and manage route details.
* **Delivery Confirmation:** Update statuses upon successful drop-off.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites
* [PHP](https://www.php.net/) (v8.2 or higher recommended)
* [Composer](https://getcomposer.org/)
* [Node.js & npm](https://nodejs.org/)
* [MySQL](https://www.mysql.com/) (or XAMPP/Laragon)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/soft-eng.git](https://github.com/your-username/soft-eng.git)
cd soft-eng/Tungal_Flower_Shop-master