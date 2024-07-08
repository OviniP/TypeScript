import data from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitiveData = (): NonSensitivePatient [] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return data.map(({ssn,...nonSensitivePatient }) => nonSensitivePatient);
};

const getPatientById = (id:string) : Patient | undefined=> {
    const patient  =  data.find(patient => patient.id == id);
    if(patient === undefined)
        {
            return patient;
        }
    else {
        return patient;
    }
};

const addPatient = (newPatient:NewPatient):Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid();
    const patient:Patient = {
        id:id,
        ...newPatient
    };
    data.push(patient);
    return patient;
};

export default{
    getPatients,
    getNonSensitiveData,
    addPatient,
    getPatientById
};
