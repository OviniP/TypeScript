export enum Gender  {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export type Diagnosis = {
    code:string,
    name:string,
    latin?:string
};

export type Entry = |HospitalEntry
                    | OccupationalHealthcareEntry
                    | HealthCheckEntry;

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string,
      }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string,
      }
}

type UnionOmit<T, k extends string|number|symbol> = T extends unknown ? Omit<T,k>: never;
export type EntryWithoutid = UnionOmit<Entry, "id">;

export type Patient = {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:Gender,
    occupation:string,
    entries: Entry []
};

export type NonSensitivePatient = Omit<Patient,'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;

