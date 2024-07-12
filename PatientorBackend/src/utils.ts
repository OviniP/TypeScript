import { BaseEntry, Diagnosis, EntryWithoutid, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatient, OccupationalHealthcareEntry } from "./types";

const isString = (text:unknown) : text is string => {
    return typeof text === 'string';
};

const isNumber = (number:unknown) : number is number => {
    return typeof number === 'number';
};

const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
};

const isValidGender = (gender : string) : gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const isValidRating = (rating:number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v).includes(rating);
};

const parseRating = (rating:unknown): HealthCheckRating => {
    if(!isNumber(rating) || !isValidRating(rating))
        {
            throw new Error('Invalid Gender');
        }
    return rating;
};

const parseGender = (gender: unknown) : Gender => {
    if(!isString(gender) || !isValidGender(gender))
        {
            throw new Error('Invalid Gender');
        }
    return gender;
};

const parseString = (text:unknown):string => {
    if(!isString(text) || text === '')
        {
            throw new Error('not a valid Text');
        }
    return text;
};

const parseDate = (object:unknown):string => {
    if(!object || !isString(object) || !isDate(object))
        {
            throw new Error ('Incorrect Date1');
        }
    return object;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };
  
const toNewPatient = (object:unknown): NewPatient => {
    if(!object || typeof object !== 'object')
        {
            throw new Error('Incorrect or missing data');
        }
    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const patient:NewPatient = {
            name:parseString(object.name),
            dateOfBirth:parseDate(object.dateOfBirth),
            gender:parseGender(object.gender),
            occupation:parseString(object.occupation),
            ssn:parseString(object.ssn),
            entries:[]
        };
        return patient;
    }
    throw new Error('Field is missing');
};

const toNewEntry = (object:unknown) : EntryWithoutid => {
    if(!object || typeof object !== 'object')
    {
        throw new Error('Incorrect or missing data');
    }
    if('description' in object && 'date' in object && 'specialist' in object && 'type' in object){
        const baseEntry:Omit<BaseEntry,"id"> = {
            description:parseString(object.description),
            date:parseDate(object.date),
            specialist:parseString(object.specialist),
            diagnosisCodes:parseDiagnosisCodes(object)
        };
        switch(object.type){
            case 'HealthCheck':
                    return toHealthCheckEntry(object, baseEntry);
            case 'Hospital':
                return toHospitalEntry(object,baseEntry);
            case 'OccupationalHealthcare':
                return OccupationalHealthEntry(object,baseEntry);
        }
    }
    throw new Error('Field is missing');
};

const toHealthCheckEntry = (object:object, baseEntry:Omit<BaseEntry,"id"> ):Omit<HealthCheckEntry,'id'> => {
    if('healthCheckRating' in object){
        const entry:Omit<HealthCheckEntry,"id"> = {
            type:'HealthCheck',
            healthCheckRating:parseRating(object.healthCheckRating),
            ...baseEntry
        };
        return entry;
    }
    throw new Error('Field is missing');
};

const toHospitalEntry= (object:object, baseEntry:Omit<BaseEntry,"id"> ):Omit<HospitalEntry,'id'> => {
    if('discharge' in object && object.discharge && typeof(object.discharge) === 'object' && 'date' in object.discharge && 'criteria' in object.discharge){
        const entry:Omit<HospitalEntry,"id">  = {
            type:'Hospital',
            discharge:{
                date:parseDate(object.discharge.date),
                criteria:parseString(object.discharge.criteria)
            },
            ...baseEntry
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return entry;
    }
    throw new Error('Field is missing');
};

const OccupationalHealthEntry= (object:object, baseEntry:Omit<BaseEntry,"id"> ):Omit<OccupationalHealthcareEntry,'id'> => {
    if('employerName' in object){
        const entry:Omit<OccupationalHealthcareEntry,"id"> = {
            type:'OccupationalHealthcare',
            employerName:parseString(object.employerName),
            ...baseEntry
        };
        if('sickLeave' in object &&  object.sickLeave && typeof(object.sickLeave) === 'object' && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave ){
            entry.sickLeave = {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate),
              };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return entry;
    }
    throw new Error('Field is missing');
};

export default {
    toNewPatient,
    toNewEntry
};