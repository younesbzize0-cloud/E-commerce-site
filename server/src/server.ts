import { Router, Request, Response } from 'express';
import Product from './models/Product';

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

export default router;