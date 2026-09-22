# ITS Study Spot Finder

A full-stack web application for finding and managing study spots around the ITS campus.

ITS Study Spot Finder helps students view information about study locations, including available facilities, noise level, and opening hours.

---

## Features

- View available study spots
- Add new study spots
- Edit existing study spots
- Delete study spots
- View study spot information such as:
  - Wi-Fi availability
  - Air conditioning
  - Power outlets
  - Noise level
  - Opening hours

---

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Go, Gin |
| ORM | GORM |
| Database | PostgreSQL |
| Version Control | Git & GitHub |

---

## Application Architecture

```text
┌─────────────────────┐
│      Next.js        │
│      Frontend       │
│   localhost:3000    │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│      Go + Gin       │
│       Backend       │
│   localhost:8080    │
└──────────┬──────────┘
           │
           │ GORM
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      Database       │
└─────────────────────┘
```

The Next.js frontend communicates with the Go backend through REST API requests. The backend uses GORM to interact with the PostgreSQL database.

---

## Study Spot Data

Each study spot contains the following information:

| Field | Description |
|------|-------------|
| ID | Unique identifier |
| Name | Name of the study spot |
| Location | Location around campus |
| Description | Description of the study area |
| Wi-Fi | Wi-Fi availability |
| AC | Air conditioning availability |
| Power Outlet | Power outlet availability |
| Noise Level | Quiet, Moderate, or Loud |
| Opening Hours | Available study hours |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/spots` | Get all study spots |
| `GET` | `/spots/:id` | Get a study spot by ID |
| `POST` | `/spots` | Add a new study spot |
| `PUT` | `/spots/:id` | Update an existing study spot |
| `DELETE` | `/spots/:id` | Delete a study spot |

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- pnpm
- Go
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/R3n254/its-study-spot.git
cd its-study-spot
```

### 2. Install Frontend Dependencies

```bash
pnpm install
```

### 3. Set Up PostgreSQL

Create a PostgreSQL database named:

```text
study_spot_db
```

### 4. Configure the Backend

Create a `.env` file inside the `backend` directory:

```text
its-study-spot/
└── backend/
    └── .env
```

Add your PostgreSQL configuration:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_NAME=study_spot_db
DB_PORT=5432
```

> **Note:** Never commit the `.env` file because it contains database credentials.

### 5. Run the Backend

Open a terminal:

```bash
cd backend
go mod download
go run main.go
```

The backend will run at:

```text
http://localhost:8080
```

### 6. Run the Frontend

Open another terminal from the project root:

```bash
pnpm dev
```

The frontend will run at:

```text
http://localhost:3000
```

Open it in your browser to use the application.

---

## CRUD Operations

The application implements the four main CRUD operations:

| Operation | Implementation |
|-----------|----------------|
| **Create** | Add a new study spot |
| **Read** | View study spots |
| **Update** | Edit study spot information |
| **Delete** | Remove a study spot |

---

## Project Structure

```text
its-study-spot/
│
├── app/
│   ├── spots/
│   │   ├── new/
│   │   │   └── page.tsx
│   │   │
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx
│   │
│   └── page.tsx
│
├── backend/
│   ├── main.go
│   ├── go.mod
│   └── go.sum
│
├── components/
│   └── DeleteButton.tsx
│
├── public/
├── package.json
└── README.md
```

---

## Future Improvements

Some features that could be added in the future:

- Search for study spots
- Filter by available facilities
- Filter by noise level
- User authentication
- Ratings and reviews
- More detailed campus location information

---
