import express from 'express';
import { getAllJobs, initiateQuery } from '../controller/jobs';
import { fetchJobs } from '../middleware/jobs';

const router = express.Router();

router.get("/search", initiateQuery, fetchJobs);
router.get("/results", getAllJobs);

export default router;