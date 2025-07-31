import express from 'express';
import { createMedia, deleteMedia, getAllMedia, updateMedia } from '../controllers/media.controller';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/media', getAllMedia);
router.post("/media", upload.single("image"), createMedia);
router.patch("/media/:id", upload.single("image"), updateMedia);
router.delete("/media/:id", deleteMedia);

export default router;
