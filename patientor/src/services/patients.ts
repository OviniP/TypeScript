import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id:string, object : EntryFormValues) => {
  const {data} = await axios.post<EntryFormValues>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data as Entry;
};

const getById = async (id:string) => {
  const {data} = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

export default {
  getAll, 
  create,
  getById,
  createEntry
};

