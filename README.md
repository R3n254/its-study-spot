ITS Study Spot Finder

ITS Study Spot Finder is a full-stack web application designed to help ITS students find suitable places to study around campus.

Students can view study spots and see information such as location, available facilities, noise level, and opening hours. Study spot data can also be added, edited, and deleted through the application.

Features
View available study spots
Add a new study spot
Edit study spot information
Delete a study spot
Display available facilities:
Wi-Fi
Air Conditioning
Power Outlets
Display noise level
Display opening hours
Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Go
Gin
GORM
Database
PostgreSQL
Application Architecture

The application uses a full-stack architecture:

Next.js Frontend → Go/Gin REST API → GORM → PostgreSQL

The frontend communicates with the backend using HTTP requests. The backend handles the REST API and uses GORM to communicate with the PostgreSQL database.

Study Spot Data

Each study spot contains:

ID
Name
Location
Description
Wi-Fi availability
AC availability
Power outlet availability
Noise level
Opening hours
API Endpoints
Method	Endpoint	Description
GET	/spots	Get all study spots
GET	/spots/:id	Get a study spot by ID
POST	/spots	Create a new study spot
PUT	/spots/:id	Update a study spot
DELETE	/spots/:id	Delete a study spot
Setup
1. Clone the repository

git clone https://github.com/R3n254/its-study-spot.git

Then enter the project directory:

cd its-study-spot

2. Frontend Setup

Install the dependencies:

pnpm install

Start the development server:

pnpm dev

The frontend will run at:

http://localhost:3000

3. Database Setup

Create a PostgreSQL database named:

study_spot_db

4. Backend Environment Variables

Create a .env file inside the backend directory.

Example:

DB_HOST=localhost

DB_USER=postgres

DB_PASSWORD=your_postgresql_password

DB_NAME=study_spot_db

DB_PORT=5432

Do not commit the .env file because it contains database credentials.

5. Backend Setup

Open another terminal:

cd backend

Install Go dependencies if necessary:

go mod download

Run the backend:

go run main.go

The backend API will run at:

http://localhost:8080

Running the Application

Both servers need to be running:

Frontend:

pnpm dev

Backend:

cd backend

go run main.go

Then open http://localhost:3000 in your browser.

CRUD Operations

The application supports the four basic CRUD operations:

Create — Add a new study spot
Read — View study spots
Update — Edit an existing study spot
Delete — Remove a study spot
Future Improvements

Possible improvements include:

Search study spots
Filter by facilities
Filter by noise level
User authentication
Study spot ratings and reviews
More detailed campus location information
