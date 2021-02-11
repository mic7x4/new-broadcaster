import express from 'express';
import recordControllers from '../controllers/recordControllers.js';
import validation from '../validation/recordValidation.js';


const recordRoute = express.Router();
//Getting all records
recordRoute.post('/records',recordControllers.createRecord);
recordRoute.get('/records',recordControllers.getRecords);
recordRoute.get('/records/:id',recordControllers.getSingleRecord);
recordRoute.patch('/records/:id/comment',recordControllers.editComment);
recordRoute.patch('/records/:id/location',recordControllers.editLocation);
recordRoute.delete('/records/:id',recordControllers.deleteRecord);


export default recordRoute;