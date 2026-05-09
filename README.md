# UniClass Web Group Project

UniClass is a group-management API for university classes. It helps lecturers view a course roster, generate student groups automatically, move students between groups, and publish the final group list.

The backend now uses local JWT auth. A lecturer must log in first, then send the bearer token on the protected endpoints.

## What Problem This Solves

The app still seeds Oracle with local course and student data on startup, so the lecturers can run and test every endpoint immediately without external access.

This version keeps that demo data and adds auth by:
- using local Oracle seed data for students and courses
- keeping the same group-generation flow
- requiring JWT auth on users, courses, and groups endpoints

## Backend Setup

### 1. Go to the backend folder

```bash
cd uniclass-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run start
```

The app seeds the database automatically on startup.

Seeded lecturer login:

- `regNumber`: `LECT/001/24`
- `password`: `Lecturer@123`

## Environment Variables

Create `uniclass-backend/.env` and add:

- `JWT_SECRET`: used by the app for JWT setup. Keep it long and random.
- `DB_HOST`: Oracle host, usually `localhost`.
- `DB_PORT`: Oracle listener port, usually `1521`.
- `DB_USER`: Oracle username for the app.
- `DB_PASS`: Oracle password for that user.
- `DB_SERVICE_NAME`: Oracle PDB service name. In this project it is `medispdb`.

## API Overview

Base URL: `http://localhost:3000`

Swagger: `http://localhost:3000/api/docs`

The most useful endpoints to start with are:

### 1. Log in

`POST /api/v1/auth/login`

Body:

```json
{
  "regNumber": "LECT/001/24",
  "password": "Lecturer@123"
}
```

Returns `accessToken`, `tokenType`, and the lecturer profile. Store `accessToken` in `localStorage` and send it as `Authorization: Bearer <token>`.

### 2. List seeded students

`GET /api/v1/users`

Requires `Authorization: Bearer <token>`.

Returns the seeded student roster with registration numbers.

Expected output: an array of students such as `BSC/48/24` and `COM2` cohort data.

### 3. List seeded courses

`GET /api/v1/courses`

Requires `Authorization: Bearer <token>`.

Returns the seeded courses.

Expected output: courses like `COM221`, `COM222`, `INF221`, `INF222`, and `MAT222`.

### 4. View a single course

`GET /api/v1/courses/:id`

Requires `Authorization: Bearer <token>`.

Shows the course details and the seeded students assigned to it.

Expected output: course code, name, credits, course type, and student list.

### 5. Generate groups

`POST /api/v1/courses/:id/groups/generate`

Body:

```json
{
  "groupSize": 4
}
```

Requires `Authorization: Bearer <token>`.

Expected output: a list of groups named `Group 1`, `Group 2`, etc., with students distributed across them.

### 6. View groups

`GET /api/v1/courses/:id/groups`

Requires `Authorization: Bearer <token>`.

Shows all groups created for that course.

### 7. Move a student

`PATCH /api/v1/groups/:id/move-student`

Body:

```json
{
  "studentRegNumber": "BSC/48/24",
  "targetGroupId": 2
}
```

Requires `Authorization: Bearer <token>`.

Expected output: the student moves from one group to another.

### 8. Publish groups

`POST /api/v1/courses/:id/groups/publish`

Requires `Authorization: Bearer <token>`.

Marks the groups as final.

## Suggested Testing Order

1. Call `POST /api/v1/auth/login` with the lecturer credentials.
2. Copy the returned `accessToken` into `localStorage`.
3. Call `GET /api/v1/users` with `Authorization: Bearer <token>`.
4. Call `GET /api/v1/courses`.
5. Pick one course ID and call `GET /api/v1/courses/:id`.
6. Generate groups with `POST /api/v1/courses/:id/groups/generate`.
7. Check the results with `GET /api/v1/courses/:id/groups`.
8. Move a student with `PATCH /api/v1/groups/:id/move-student`.
9. Publish the groups when done.

## Notes for Lecturers

- No Google login is needed.
- The lecturer must log in first before using the protected endpoints.
- Store the JWT in `localStorage` and send it as a bearer token.
- Restarting the backend resets the demo data because the seed runs on startup.
- If Oracle is not running or `.env` values are wrong, the app will not start.
