

// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const path = require('path');


// // const app = express();

// // // CORS - Allow localhost:3000
// // app.use(cors({
// //   origin: ['http://localhost:3000','http://localhost:3001'],
// //   credentials: true
// // }));

// // app.use(express.json());
// // app.use(express.static(path.join(__dirname, 'public')));

// // // MongoDB
// // mongoose.connect(process.env.MONGODB_URI)
// //   .then(() => console.log('MongoDB Connected'))
// //   .catch(err => console.log('MongoDB Error:', err));

// // // Test Route
// // app.get('/', (req, res) => {
// //   res.json({ message: 'BACKEND IS LIVE!' });
// // });

// // // College Schema
// // const collegeSchema = new mongoose.Schema({
// //   name: String,
// //   stream: String,
// //   location: String,
// //   fees: String,
// //   ranking: Number,
// //   cutoff: Number,
// //   campusSize: String,
// //   established: Number,
// //   students: Number,
// //   affiliation: String,
// //   courses: String,
// //   facilities: String,
// //   description: String,
// //   image: String,
// //   rating: Number
// // });

// // const College = mongoose.model('College', collegeSchema);

// // // Routes
// // app.get('/colleges', async (req, res) => {
// //   try {
// //     const colleges = await College.find();
// //     res.json(colleges);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/colleges', async (req, res) => {
// //   console.log('📥 Request received:', req.body); // Debug ke liye
// //   try {
// //     const college = new College(req.body);
// //     const saved = await college.save();
// //     console.log('✅ College saved:', saved._id); // Debug
// //     res.status(201).json(saved);
// //   } catch (error) {
// //     console.error('❌ Error:', error.message); // Debug
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // app.put('/colleges/:id', async (req, res) => {
// //   try {
// //     await College.findByIdAndUpdate(req.params.id, req.body);
// //     res.json({ message: 'Updated' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.delete('/colleges/:id', async (req, res) => {
// //   try {
// //     await College.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Deleted' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // const PORT = 5001;
// // app.listen(PORT, '0.0.0.0', () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const app = express();

// // CORS - Allow frontend
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeduniya';

// console.log('🔧 Connecting to MongoDB...');

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//   });

// // ✅ FIXED: College Schema
// const collegeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   stream: { type: String, required: true },
//   location: { type: String, required: true },
//   fees: { type: String, default: 'Not specified' },
//   ranking: { type: Number, default: 0 },
//   cutoff: { type: Number, default: 0 },
//   campusSize: { type: String, default: 'Not specified' },
//   established: { type: Number, default: 0 },
//   students: { type: Number, default: 0 },
//   affiliation: { type: String, default: 'Not specified' },
//   courses: { type: String, default: 'Not specified' },
//   facilities: { type: String, default: 'Not specified' },
//   description: { type: String, default: 'No description available' },
//   image: { type: String, default: 'https://via.placeholder.com/300x180?text=No+Image' },
//   rating: { type: Number, default: 0, min: 0, max: 5 }
// }, {
//   timestamps: true
// });

// const College = mongoose.model('College', collegeSchema);

// // ✅ FIXED: BETTER ROUTES

// // Root route - FIXED
// app.get('/', (req, res) => {
//   res.json({ 
//     message: '🎉 BACKEND IS WORKING!', 
//     database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       colleges: '/colleges',
//       health: '/health',
//       test: '/test'
//     }
//   });
// });

// // Test route
// app.get('/test', (req, res) => {
//   res.json({ message: '✅ Test route is working!' });
// });

// // Health check
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime()
//   });
// });

// // GET all colleges
// app.get('/colleges', async (req, res) => {
//   try {
//     console.log('📚 Fetching colleges from database...');
//     const colleges = await College.find().sort({ ranking: 1 });
//     console.log(`✅ Found ${colleges.length} colleges`);
//     res.json(colleges);
//   } catch (error) {
//     console.error('❌ Error fetching colleges:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch colleges',
//       message: error.message 
//     });
//   }
// });

// // POST new college
// app.post('/colleges', async (req, res) => {
//   console.log('📥 Received college data:', JSON.stringify(req.body, null, 2));
  
//   try {
//     // Validate required fields
//     if (!req.body.name || !req.body.stream || !req.body.location) {
//       return res.status(400).json({ 
//         error: 'Missing required fields',
//         required: ['name', 'stream', 'location']
//       });
//     }

//     const college = new College(req.body);
//     const savedCollege = await college.save();
    
//     console.log('✅ College saved successfully:', savedCollege._id);
//     res.status(201).json(savedCollege);
    
//   } catch (error) {
//     console.error('❌ Error saving college:', error);
//     res.status(400).json({ 
//       error: 'Failed to save college',
//       message: error.message 
//     });
//   }
// });

// // PUT update college
// app.put('/colleges/:id', async (req, res) => {
//   try {
//     const updatedCollege = await College.findByIdAndUpdate(
//       req.params.id, 
//       req.body, 
//       { new: true, runValidators: true }
//     );
    
//     if (!updatedCollege) {
//       return res.status(404).json({ error: 'College not found' });
//     }
    
//     console.log('✅ College updated:', req.params.id);
//     res.json(updatedCollege);
//   } catch (error) {
//     console.error('❌ Error updating college:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // DELETE college
// app.delete('/colleges/:id', async (req, res) => {
//   try {
//     const deletedCollege = await College.findByIdAndDelete(req.params.id);
    
//     if (!deletedCollege) {
//       return res.status(404).json({ error: 'College not found' });
//     }
    
//     console.log('✅ College deleted:', req.params.id);
//     res.json({ message: 'College deleted successfully' });
//   } catch (error) {
//     console.error('❌ Error deleting college:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // 404 handler for undefined routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     error: 'Route not found',
//     availableRoutes: [
//       'GET /',
//       'GET /health',
//       'GET /test',
//       'GET /colleges',
//       'POST /colleges',
//       'PUT /colleges/:id',
//       'DELETE /colleges/:id'
//     ]
//   });
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
//   console.log(`🔍 Test the server: http://localhost:${PORT}/`);
//   console.log(`📚 Colleges API: http://localhost:${PORT}/colleges`);
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS - Allow frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeduniya';

console.log('🔧 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// College Schema
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stream: { type: String, required: true },
  location: { type: String, required: true },
  fees: { type: String, default: 'Not specified' },
  ranking: { type: Number, default: 0 },
  cutoff: { type: Number, default: 0 },
  campusSize: { type: String, default: 'Not specified' },
  established: { type: Number, default: 0 },
  students: { type: Number, default: 0 },
  affiliation: { type: String, default: 'Not specified' },
  courses: { type: String, default: 'Not specified' },
  facilities: { type: String, default: 'Not specified' },
  description: { type: String, default: 'No description available' },
  image: { type: String, default: 'https://via.placeholder.com/300x180?text=No+Image' },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, {
  timestamps: true
});

const College = mongoose.model('College', collegeSchema);

// ✅ FIXED ROUTES:

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 BACKEND IS WORKING!', 
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    timestamp: new Date().toISOString(),
    endpoints: {
      colleges: '/colleges',
      health: '/health',
      test: '/test'
    }
  });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: '✅ Test route is working!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET all colleges
app.get('/colleges', async (req, res) => {
  try {
    console.log('📚 Fetching colleges from database...');
    const colleges = await College.find().sort({ ranking: 1 });
    console.log(`✅ Found ${colleges.length} colleges`);
    res.json(colleges);
  } catch (error) {
    console.error('❌ Error fetching colleges:', error);
    res.status(500).json({ 
      error: 'Failed to fetch colleges',
      message: error.message 
    });
  }
});

// POST new college
app.post('/colleges', async (req, res) => {
  console.log('📥 Received college data:', JSON.stringify(req.body, null, 2));
  
  try {
    // Validate required fields
    if (!req.body.name || !req.body.stream || !req.body.location) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'stream', 'location']
      });
    }

    const college = new College(req.body);
    const savedCollege = await college.save();
    
    console.log('✅ College saved successfully:', savedCollege._id);
    res.status(201).json(savedCollege);
    
  } catch (error) {
    console.error('❌ Error saving college:', error);
    res.status(400).json({ 
      error: 'Failed to save college',
      message: error.message 
    });
  }
});

// PUT update college
app.put('/colleges/:id', async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedCollege) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    console.log('✅ College updated:', req.params.id);
    res.json(updatedCollege);
  } catch (error) {
    console.error('❌ Error updating college:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE college
app.delete('/colleges/:id', async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);
    
    if (!deletedCollege) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    console.log('✅ College deleted:', req.params.id);
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting college:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ FIXED: 404 handler - Use proper Express syntax
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /health', 
      'GET /test',
      'GET /colleges',
      'POST /colleges',
      'PUT /colleges/:id',
      'DELETE /colleges/:id'
    ]
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`🔍 Test the server: http://localhost:${PORT}/`);
  console.log(`📚 Colleges API: http://localhost:${PORT}/colleges`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});