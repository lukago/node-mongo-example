import * as express from 'express';
import {JobPostingsRoute} from './jobPostingsRoute';

const postings = express.Router();

postings.use('', new JobPostingsRoute().getRoutes());

export default postings;
