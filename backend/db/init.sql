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

CREATE TABLE IF NOT EXISTS test (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course VARCHAR(100),
  teacher_rut INT,
  name VARCHAR(100)
);

-- Preguntas asociadas a cada prueba
CREATE TABLE IF NOT EXISTS question (
  id INT AUTO_INCREMENT PRIMARY KEY,
  test_id INT,
  text TEXT,
  FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE
);

-- Opciones de respuesta por pregunta
CREATE TABLE IF NOT EXISTS option (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  text VARCHAR(255),
  is_correct BOOLEAN DEFAULT false,
  FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);

-- Respuestas entregadas por los alumnos
CREATE TABLE IF NOT EXISTS student_answer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  test_id INT,
  question_id INT,
  student_rut INT,
  option_id INT,
  FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
  FOREIGN KEY (student_rut) REFERENCES alumno(rut) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES option(id) ON DELETE CASCADE
);