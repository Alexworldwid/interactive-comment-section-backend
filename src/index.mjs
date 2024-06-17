import 'dotenv/config';
import express, { request, response } from 'express';
import routes from "./routes/index.mjs";
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

const app = express();
// @ts-ignore
mongoose.connect(mongoUri)
    .then(() => {
        console.log('database sucessfully connected')
    })
    .catch((err) => {
        console.log(`error: ${err}`)
    })
        
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.status(200).send('hello from express on vercel')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})