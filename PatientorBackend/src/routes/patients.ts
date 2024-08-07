import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get("/", (_req, res)=> 
{
    res.send(patientService.getNonSensitiveData());
});

patientRouter.post("/",(_req,_res) => {
    try
    {
    const patient = utils.toNewPatient(_req.body);
    const result = patientService.addPatient(patient);
    _res.send(result);
    }
    catch(error:unknown){
        let message = 'An error occured';
        if(error instanceof Error){
            message += 'Error' + error;
        }
        _res.status(400).send(message);
    }
});

patientRouter.get("/:id",(req,res) => {
    try{
        const patient = patientService.getPatientById(req.params.id);
        if(patient === undefined)
            return res.sendStatus(404);
        else
            return res.json(patient);
    }
    catch(error:unknown){
        let message = 'An error occured';
        if(error instanceof Error){
            message += 'Error' + error;
        }
       return  res.status(400).send(message);
    }
});

patientRouter.post("/:id/entries", (req,res) => {
    try{
        const id = req.params.id;
        const entry = utils.toNewEntry(req.body);

        const newEntry = patientService.addEntry(id, entry);
        return res.status(200).json(newEntry);
    }
    catch(error:unknown){
        let errorMessage = "something went wrong.";
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

export default patientRouter;