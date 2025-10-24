const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));
// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',  // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:',err));

// 
// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is LIVE!' });
});

// Routes
// app.get('/colleges', async (req, res) => {
//   const colleges = await College.find();
//   res.json(colleges);
// });

// ... other routes

// const PORT =process.env.PORT || 5000;
// app.listen(PORT,'0.0.0.0', () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// 


// College Schema
const collegeSchema = new mongoose.Schema({
  name: String,
  stream: String,
  location: String,
  fees: String,
  ranking: Number,
  cutoff: Number,
  campusSize: String,
  established: Number,
  students: Number,
  affiliation: String,
  courses: String,
  facilities: String,
  description: String,
  image: String,
  rating: Number
});

const College = mongoose.model('College', collegeSchema);

// Routes
app.get('/colleges', async (req, res) => {
  const colleges = await College.find();
  res.json(colleges);
});
// app.get('/', (req, res) => {
//   res.json({ message: 'Backend is LIVE!' });
// });

// app.post('/colleges', async (req, res) => {
//   const college = new College(req.body);
//   await college.save();
//   res.json(college);
// });
app.post('/colleges', async (req, res) => {
  try {
    const college = new College(req.body);
    const saved = await college.save();
    res.json(saved); // _id wapas bhejo
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.put('/colleges/:id', async (req, res) => {
  await College.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Updated' });
});

app.delete('/colleges/:id', async (req, res) => {
  await College.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// app.listen(5000, () => console.log('Server running on port 5000'));

// In your server.js or similar
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});