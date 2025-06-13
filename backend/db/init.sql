CREATE TABLE IF NOT EXISTS alumno (
  rut INT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  curso VARCHAR(100),
  historial_ensayos TEXT,
  fecha_nacimiento DATE,
  correo VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS docente (
  rut INT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  asignaturas TEXT,
  sueldo FLOAT,
  ensayos_generados INT,
  correo VARCHAR(100),
  fecha_nacimiento DATE
);
