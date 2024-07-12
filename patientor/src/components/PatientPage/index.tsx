import { useEffect, useState } from "react";
import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button, Typography } from "@mui/material";
import PatientEntry from "./patientEntry";
import AddEntry from "./AddEntryFOrm";


const PatientPage = () => {
    const {id} = useParams<{id:string}>();
    const [patient, setPatient] = useState<Patient>();
    const [showAddNew, setShowAddNew] = useState(false);

    useEffect(() => {
        const getPatient = async () => {
            if(id !== undefined){
                const patient = await patientService.getById(id);
                setPatient(patient);
            }
        };
        getPatient();
    },[id]);

    const onEntryAdded = (entry:Entry) => {
      if(patient){
          const updatedPatient = {
              ...patient,
              entries:[...patient.entries, entry]
          };
          setPatient(updatedPatient);
      }
    };

    if(id){
      return(
          <Box>
          <Box sx={{ display: 'flex', alignItems: 'left', marginBottom: 2, marginTop:2 }}>
            <Typography variant="h5" sx={{ marginRight: 0 }}>
              {patient?.name}
            </Typography>
            {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
          </Box>
          <Box sx={{ marginBottom: 0 }}>
            <Typography variant="body1">
              SSN: {patient?.ssn}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              Occupation: {patient?.occupation}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{margintop:2}}>
              Entries
            </Typography>
          </Box>
          <Button variant="contained" onClick={()=>setShowAddNew(true)}>Add New Entry</Button>
          <AddEntry showHide={showAddNew} patientId={id} onEntryAdded={onEntryAdded}/>
          {patient?.entries.map(e => <PatientEntry key={e.id} entry ={e}></PatientEntry>
                                    )}
        </Box>
      );
    }
}; 

export default PatientPage;