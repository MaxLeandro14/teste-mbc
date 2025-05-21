import express from 'express';
import routes from './src/routes.js'

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173'
}));

const port = 3001;

app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});

app.use(routes);