# 🚀 Task ME - The Universal Task Manager

**Task ME** is a modern, full-stack task management application designed to help you organize your daily activities and accomplish your goals.

This project is split into two parts: a responsive, interactive frontend built with **Next.js/React**, and a robust REST API backend powered by **Django** and **MySQL**.

## ✨ Features

* **Task Creation:** Easily add new tasks, descriptions, and optional due dates.
* **CRUD Operations:** Create, Read, Update, and Delete tasks via the API.
* **Filtering:** Filter tasks by **All**, **Active**, and **Completed** status.
* **Stats Tracking:** View real-time statistics like total tasks, active tasks, and completion rate.
* **Clear Completed:** One-click deletion of all completed tasks.
* **Drag-and-Drop Reordering** (Frontend only): Visually reorder tasks (Note: Persistence of order requires additional backend work).

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **Next.js / React** | User interface and state management (Client-side rendering). |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for fast, responsive design. |
| **Backend API** | **Django / Django REST Framework (DRF)** | Handles business logic, serving RESTful API endpoints. |
| **Database** | **MySQL** | Persistent storage for task data. |
| **Database Connector** | **`mysqlclient`** | Python driver for connecting Django to MySQL. |

## ⚙️ Setup and Installation

To run this project locally, you need to set up both the backend API and the frontend client.

### 1. Backend Setup (Django & MySQL)

#### A. Prerequisites

* **Python 3.8+**
* **MySQL Server** (Running via WampServer, XAMPP, or standalone).

#### B. Installation

1.  **Clone the repository:**
    ```bash
    git clone [Your-Repo-URL]
    cd TaskMi/backend # Navigate to your Django project directory
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/macOS
    .\venv\Scripts\activate  # Windows
    pip install -r requirements.txt # (Assuming you create this file)
    # OR: pip install django djangorestframework mysqlclient django-cors-headers
    ```

3.  **Database Configuration:**
    * Start your **MySQL Server** (e.g., ensure the WampServer icon is green).
    * Manually create the database (e.g., `task_db`) using **phpMyAdmin** or MySQL Workbench.
    * Update the `DATABASES` setting in `taskmanager_project/settings.py` with your MySQL credentials (e.g., `USER='root'`, `PASSWORD=''`, `HOST='127.0.0.1'`).

4.  **Run Migrations:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Start the Server:**
    ```bash
    python manage.py runserver
    ```
    The API will be running at `http://127.0.0.1:8000/`.

---

### 2. Frontend Setup (Next.js)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # (Assuming frontend is in a sibling folder)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Ensure API URL is Correct:**
    The API URL in the frontend (`src/components/todo-app.tsx`) is currently set to:
    ```typescript
    const API_BASE_URL = "[http://127.0.0.1:8000/api/todos/](http://127.0.0.1:8000/api/todos/)";
    ```
    If your backend is running elsewhere, update this constant.

4.  **Start the Frontend:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically open at `http://localhost:3000/`.



## 🤝 Contributing

(If applicable, add instructions on how others can contribute to your project.)
