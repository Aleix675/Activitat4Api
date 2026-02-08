require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3021;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Modelo de datos para colección "cars"
const carSchema = new mongoose.Schema({
  any: Number,
  dataAlta: { type: Date, default: Date.now },
  marca: String,
  model: String,
  moneda: String,
  origen: String,
  preu: Number,
  tipus: String,
  traccio: String
});

const Car = mongoose.model('Car', carSchema, 'cars'); // El tercer parámetro fuerza usar la colección "cars"

// ---------- RUTAS ---------- //

// Test rápido
app.get('/', (req, res) => {
  res.send('API REST funcionando 🚀');
});

// 1️⃣ Listar todos los coches
app.get('/list', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars', error: err.message });
  }
});

// 2️⃣ Añadir un coche
app.post('/add', async (req, res) => {
  try {
    const carData = req.body;

    // Convierte dataAlta a Date si viene como string
    if (carData.dataAlta) carData.dataAlta = new Date(carData.dataAlta);

    const car = new Car(carData);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: 'Error adding car', error: err.message });
  }
});

// 3️⃣ Listar coches por rango de fechas (dataAlta)
app.get('/list/:dataini/:datafi', async (req, res) => {
  const { dataini, datafi } = req.params;
  try {
    const start = new Date(dataini);
    const end = new Date(datafi);

    const cars = await Car.find({
      dataAlta: { $gte: start, $lte: end }
    });

    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars by date', error: err.message });
  }
});

// 4️⃣ Actualizar coche por ID
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const carData = req.body;

  // Convierte dataAlta a Date si viene
  if (carData.dataAlta) carData.dataAlta = new Date(carData.dataAlta);

  try {
    const car = await Car.findByIdAndUpdate(id, carData, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ message: 'Error updating car', error: err.message });
  }
});

// 5️⃣ Eliminar coche por ID
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car', error: err.message });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
