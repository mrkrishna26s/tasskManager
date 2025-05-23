import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
const allowedOrigins = [
  'http://localhost:5173',
  'https://tassk-manager.vercel.app',
  'https://tassk-manager-dm9m3iv8d-mrkrishna26s-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log('Server started on port', process.env.PORT));
  })
  .catch(err => console.error(err));