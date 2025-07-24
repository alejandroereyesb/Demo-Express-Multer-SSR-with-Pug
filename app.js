const express = require('express');
const path = require('path');
const { upload, errorFileHandler } = require('./middlewares/fileMiddleware');

const app = express();

// Array para almacenar los datos enviados
const records = [
  {
    title: 'Imagen de ejemplo 1',
    description: 'Esta es la descripción de ejemplo para imagen 1',
    year: 2023,
    file: { originalName: '100.jpg', path: 'uploads/100.jpg' },
  },
  {
    title: 'Imagen de ejemplo 2',
    description: 'Esta es la descripción de ejemplo para imagen 2',
    year: 2020,
    file: { originalName: '498.jpg', path: 'uploads/498.jpg' },
  },
  {
    title: 'Imagen de ejemplo 3',
    description: 'Esta es la descripción de ejemplo para imagen 3',
    year: 2020,
    file: { originalName: '500.jpg', path: 'uploads/500.jpg' },
  },
  {
    title: 'Imagen de ejemplo 2',
    description: 'Esta es la descripción de ejemplo para imagen 4',
    year: 2020,
    file: { originalName: '599.jpg', path: 'uploads/599.jpg' },
  },
];

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ficheros estáticos de la carpeta uploads

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), errorFileHandler, (req, res) => {
  const { title, description, year } = req.body;
  const fileInfo = req.file
    ? { 
        originalName: req.file.originalname, 
        path: `${req.protocol}://${req.get('host')}/uploads/${path.basename(req.file.path)}` // Path completo
      }
    : null;

  // Guardar los datos en el array
  const record = { title, description, year, file: fileInfo };
  records.push(record);

  res.json({
    success: true,
    data: record,
  });
});

app.get('/records', (req, res) => {
  const normalizedRecords = records.map(record => ({
    ...record,
    file: record.file
      ? { 
          ...record.file, 
          path: record.file.path.startsWith('http') 
            ? record.file.path 
            : `${req.protocol}://${req.get('host')}/uploads/${path.basename(record.file.path)}`
        }
      : null,
  }));

  res.json({
    success: true,
    data: normalizedRecords,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
