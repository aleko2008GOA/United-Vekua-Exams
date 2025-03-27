import express from 'express';
import cors from 'cors';
import userRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Server is working!'));
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
