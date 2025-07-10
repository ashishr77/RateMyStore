// routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  updateUserPassword,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
 
const router = express.Router();

router.post('/register', registerUser); // only normal users can register
router.post('/login', loginUser);
router.put('/update-password', verifyToken, checkRole(['user', 'admin']), updateUserPassword);

export default router;
