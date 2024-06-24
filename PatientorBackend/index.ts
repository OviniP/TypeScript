import express from "express";
import cors from "cors";
import diagnosisRouter from './src/routes/diagnoses';
import patientRouter from "./src/routes/patients";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req,_res)=>{
    _res.json('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients',patientRouter);

app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
});