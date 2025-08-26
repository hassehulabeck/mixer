## SQLite template and guide

Open the file `studentdb.sqlite3` using tablePlus or similar program.
Create a table like this:

| id  |  lastname | firstname |
| --- | --------- | --------- |
| 1   | fiktivson | rune      |
| 2   | andersson | hans      |


Run the following commands in your program to create the table Students:

CREATE TABLE IF NOT EXISTS Students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lastname TEXT NOT NULL,
  firstname TEXT NOT NULL
);

If you want to use a randomly generated group of names, run the following commands:

INSERT INTO Students (lastname, firstname) VALUES
('fiktivson','rune'),
('andersson','hans'),
('svensson','lina'),
('nilsson','emma'),
('eriksson','oskar'),
('larsson','nils'),
('karlsson','sara'),
('lindberg','erik'),
('bergström','maria'),
('lundgren','anna'),
('hansson','johan'),
('persson','mats'),
('jonsson','stina'),
('sandberg','lisa'),
('ahlberg','karl'),
('norberg','per'),
('holmqvist','sofia'),
('björk','agnes'),
('eklund','olof'),
('ström','elias');
