// routes/usersRoute.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import {
  getAllStores,    
  getAllUsers,      
  updatePassword    
} from '../controllers/userController.js';

const router = express.Router();

// USER-only routes
router.get('/stores', verifyToken, checkRole(['user']), getAllStores);
// router.get('/stores', getAllStores);

router.put('/update-password', verifyToken, checkRole(['user']), updatePassword);

// see all users (with role 'user')
router.get('/list', verifyToken, checkRole(['admin']), getAllUsers);

export default router;
