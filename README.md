# Mixer

A simple mixer of a class of students into groups of two (and one group of three, if odd numbers).

## Installation

This project consists of two parts: **backend** and **frontend**.  
The recommended way to run both simultaneously is via **npm**.

### Requirements

- PHP >= 8.0
- Node.js >= 18 (with npm)

---

### 1. Install dependencies

From the project root directory, run:

```bash
npm install
```

---

### 2\. Start the application

Start both backend (on port `4000`) and frontend (on port `8080`) with:

```bash
npm run dev
```

- Backend will be available at [http://localhost:4000](http://localhost:4000)
- Frontend will be available at [http://localhost:8080](http://localhost:8080)

> If you need to change the backend port, update the value on **line 6** in [frontend/index.js](frontend/index.js).

---

### Alternative: run parts manually

If you prefer not to use the npm script, you can start backend and frontend separately:

```bash
# Start backend
cd backend
php -S localhost:4000

# Start frontend in a separate terminal
cd frontend
php -S localhost:8080
```

---

### Tips

- Use `CTRL+C` in the terminal to stop the servers.
- Logs from both processes will be displayed when running `npm run dev`.

---

## Database

The backend depends on a sqlite database, containing a single table (WU22). If you want to change this value, you have to edit [backend/index.php](backend/index.php) at line 8 and 10. Note that the sqlite file is not included in this package, as it could contain personal data. You will need to setup your own sqlite3 file. It should contain a single table, and that table should have the columns id (int), lastname (string) and firstname (string)

## Usage

Now, visit localhost:8080 in your browser and the top-left container should be filled with names. Drag and drop the ones that aren't present to the container below. When done, click "set pair-programmers", and pairings of the present students should emerge to the right.
