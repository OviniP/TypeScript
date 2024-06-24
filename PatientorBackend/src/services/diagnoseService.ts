import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = () => {
 const diagnoses: Diagnosis[] = data;
 return diagnoses;
};

export default {
    getDiagnoses
};