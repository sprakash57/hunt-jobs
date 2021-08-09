import express from 'express';
import { getSearchedResults, initiateQuery } from '../controller/jobs';
import { fetchInBackground } from '../middleware/jobs';

const router = express.Router();

router.get("/search", initiateQuery, fetchInBackground);
router.get("/results", getSearchedResults);

export default router;