# Mixer

A simple mixer of a class of students into groups of two (and one group of three, if odd numbers).

**NOTE** This is mainly thought of as an assignment for my students at the [Web developer education, YRGO, Gothenburg](https://www.yrgo.se/program/webbutvecklare). I appreciate your interest in this project, but allow me to focus more on their future this time.

## Installation

The application consist of a backend part and a frontend. The backend would prefarably run on port 4000 (otherwise, change value of backPort in [frontend/index.js](frontend/index.js))

```bash
cd backend
php -S localhost:4000
```

Also, you need to run the frontend part from a server

```bash
cd frontend
php -S localhost:8080
```

## Database

The backend depends on a sqlite database, containing a single table (WU22). If you want to change this value, you have to edit [backend/index.php](backend/index.php) at line 8 and 10. Note that the sqlite file is not included in this package, as it could contain personal data. You will need to setup your own sqlite3 file. It should contain a single table, and that table should have the columns id (int), lastname (string) and firstname (string)

## Usage

Now, visit localhost:8080 in your browser and the top-left container should be filled with names. Drag and drop the ones that aren't present to the container below. When done, click "set pair-programmers", and pairings of the present students should emerge to the right.
