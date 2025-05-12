# Task (story-track)

StoryTrack Web Application for Task and Story Management with Quasar, Vue 3, and the Retool API

StoryTrack is a Kanban-style task management web application developed with the Quasar Framework and Vue.js 3. It is designed to facilitate the efficient visualization and management of stories or tasks within projects. The application integrates two APIs: one simulated using Retool to manage user registration and another for real-world project tracking, offering a production-like experience. The project focuses on a clean and scalable architecture, along with an adaptable user interface, ensuring a smooth experience across all types of devices. It also follows modular development practices for easy maintenance and expansion.

Features

    ✅User authentication via API (plaintext credentials):

    Simple login system that uses plaintext username and password for authentication.
    The Retool API stores user credentials in plain text (not recommended for production environments, but suitable for testing).
    Users can register and log in directly through the API by providing their username and password.
    Authentication is handled by verifying the provided credentials against values ​​stored in the Retool database.

    📋 Task Management (Kanban Style):

    Retrieves task data from the Retool API that represents project tasks or stories.
    Displays tasks on a board organized by status (e.g., To Do, In Progress, Completed).
    Task cards display key information: title, status, due date, assignee, and priority.

    🔍 Drill-down View and Filtering:

    View details of individual tasks.
    Filter tasks by assigned user, status, or priority using URL parameters or local filters.

    ⚙️ State Management:

    Centralized state management with Pinia, which stores user information, session state, and task data.

    🎨 Responsive Design:

    Fully responsive design with Quasar components.
    Mobile-optimized interface with layouts adapted to different screen sizes.

🛠 Technologies Used:

    Quasar Framework: For modern, responsive UI components and designs.
    Vue 3: JavaScript framework for reactive logic and application structure.
    Pinia: For centralized state management.
    Retool API: Mock API for retrieving task and project story data.
    Vite: Frontend development tool for rapid development.

## Retool API Base URLs for Fake Data

These environment variables are used to securely store the base URLs for your Retool APIs.

There are two variables defined in the .env file, which are used to configure your project without hardcoding sensitive information. These are for fake data APIs, making them suitable for testing and development purposes.
API calls:

    VITE_API_BASE_URL_USERS=https://retoolapi.dev/ySaPu3/authBase
    VITE_API_BASE_URL_TASKS=https://retoolapi.dev/f4heCv/StoryTrack

# Install Quasar CLI:

First, make sure you have Quasar CLI installed. You can install it globally by running the following command:

```bash
yarn global add @quasar/cli
# or
npm i -g @quasar/cli
```

# Quasar App (storytrack-app)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### List of implemented icons

- [tarea-completada](https://www.flaticon.es/icono-gratis/tarea-completada_1632670?term=tarea&page=1&position=8&origin=search&related_id=1632670)

### list of implemented APIs

- [Retool-Api-Users](https://retoolapi.dev/ySaPu3/authBase)
- [Retool-Api-Tasks](https://retoolapi.dev/f4heCv/StoryTrack)
