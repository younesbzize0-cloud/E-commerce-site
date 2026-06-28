import mongoose, { Schema, Document } from 'mongoose';

// 1. Interface TypeScript
export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand: string; // Rendu obligatoire pour les filtres
  stock: number;
  images: string[];
  specs: Record<string, any>; // Champ flexible pour s'adapter à tout (PC, TV, Phones...)
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schéma Mongoose
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true }, 
    brand: { type: String, required: true, index: true },    
    stock: { type: Number, required: true, default: 0, min: 0 },
    images: [{ type: String, required: true }],
    specs: { type: Schema.Types.Mixed, default: {} } 
  },
  {
    timestamps: true 
  }
);

// // 3. Middleware pré-enregistrement pour générer le slug automatiquement
// productSchema.pre<IProduct>('save', function (next: (err?: Error) => void) {
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
//       .replace(/\s+/g, '-');        // Remplace les espaces par des tirets
//   }
//   next();
// });

export default mongoose.model<IProduct>('Product', productSchema);