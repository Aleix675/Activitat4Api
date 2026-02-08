require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Modelo
const carSchema = new mongoose.Schema({
  any: Number,
  dataAlta: String,
  marca: String,
  model: String,
  moneda: String,
  origen: String,
  preu: Number,
  tipus: String,
  traccio: String
});

const Car = mongoose.model('Car', carSchema, 'cars');

// 👉 RUTA RAÍZ (MUY IMPORTANTE)
app.get('/', (req, res) => {
  res.send('API Activitat 4 funcionant 🚀');
});

// LIST
app.get('/list', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// ADD
app.post('/add', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json({ message: 'Car afegit correctament' });
});

// UPDATE
app.put('/update/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Car actualitzat correctament' });
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car eliminat correctament' });
});

// 👇 ESTO ES LO CLAVE PARA VERCEL
module.exports = app;
