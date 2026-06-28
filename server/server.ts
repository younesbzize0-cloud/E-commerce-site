import express, { Application, Request, Response } from 'express';
// 1. Importation de tes fichiers de routes
// Note : Même si les fichiers s'appellent .ts, on n'écrit pas l'extension dans l'import
import authRoutes from './src/routes/authRoutes';
import productsRoutes from './src/routes/productsRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares indispensables
app.use(express.json()); // Permet à Express de lire le JSON (req.body)

// ---------------------------------------------------------
// 2. MONTAGE DES ROUTES
// ---------------------------------------------------------

// Lie tes routes d'authentification à l'URL : http://localhost:5000/api/auth
app.use('/api/auth', authRoutes);

// Lie tes routes de produits à l'URL : http://localhost:5000/api/products
app.use('/api/products', productsRoutes);

// ---------------------------------------------------------

// Route de test de base
app.get('/', (req: Request, res: Response) => {
  res.send('Le serveur TypeScript fonctionne parfaitement !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`[server]: Serveur démarré sur http://localhost:${PORT}`);
});