import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import playersRoute from './routes/playersRoute.js';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware for handling CORS POLICY

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});




app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hola bebe')
});


app.use('/api', playersRoute);

app.use(morgan('dev'));

app.use("/api", authRoutes);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to dababase');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });