import express from 'express';
import { getSearchedResults, initiateQuery } from '../controller/jobs';
import { fetchInBackground } from '../middleware/jobs';

const router = express.Router();
// route for trigger search and background jobs
router.get("/search", initiateQuery, fetchInBackground);
// route for getting the searched results.
router.get("/results", getSearchedResults);

export default router;