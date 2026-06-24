import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', productSchema);