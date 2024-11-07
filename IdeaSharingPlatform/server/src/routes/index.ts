
import { Router } from "express";
import userRoutes from '../routes/user'
import postRoutes from '../routes/post'


const router = Router();

router.use('/user',userRoutes);
router.use('/post',postRoutes);

export default router;



