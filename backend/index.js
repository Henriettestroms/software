const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const alumnoRoutes = require('./routes/alumno.routes');
const docenteRoutes = require('./routes/docente.routes');
const testRoutes = require('./routes/test.routes');

const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT_API || 8081;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/alumnos', alumnoRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/tests', testRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
