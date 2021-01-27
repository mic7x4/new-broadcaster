import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './Routes/usersRoutes.js'


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', usersRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`[!]: Server is Running on Port ${PORT}`));