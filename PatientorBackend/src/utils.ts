import { Gender, NewPatient } from "./types";

const isString = (text:unknown) : text is string => {
    return typeof text === 'string';
};

const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
};

const isValidGender = (gender : string) : gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
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

export default {
    toNewPatient
};