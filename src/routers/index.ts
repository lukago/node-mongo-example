import * as express from 'express';
import {default as postingsRouter} from './postings';

const api = express.Router();

api.use('/v1', postingsRouter);

export default api;
