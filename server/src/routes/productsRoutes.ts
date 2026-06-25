import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', async (req: Request, res: Response) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// ==========================================

// GET un produit precis
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// UPDATE
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json({ message: 'Produit supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


export default router;