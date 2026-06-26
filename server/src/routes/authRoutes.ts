import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'votre_cle_secrete_super_secure';

// ==========================================
// 1. INSCRIPTION (Register)
// ==========================================
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hasher le mot de passe (10 est le "salt rounds", le niveau de sécurité)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur avec le mot de passe haché
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'Utilisateur créé avec succès !',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error });
  }
});

// ==========================================
// 2. CONNEXION (Login)
// ==========================================
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur par son email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier si le mot de passe correspond
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer le token JWT (il contient l'ID et le rôle de l'utilisateur)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' } // Le token expire après 24 heures
    );

    // Renvoyer le token au client
    res.json({
      message: 'Connexion réussie !',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
});

export default router;