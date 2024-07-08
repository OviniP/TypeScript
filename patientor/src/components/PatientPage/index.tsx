import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Typography } from "@mui/material";

const PatientPage = () => {
    const {id} = useParams<{id:string}>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const getPatient = async () => {
            if(id !== undefined){
                const patient = await patientService.getById(id);
                setPatient(patient);
            }
        };
        getPatient();
    },[id]);

    return(
        <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ marginRight: 1 }}>
            {patient?.name}
          </Typography>
          {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body1">
            SSN: {patient?.ssn}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body1">
            Date of Birth: {patient?.dateOfBirth}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            Occupation: {patient?.occupation}
          </Typography>
        </Box>
      </Box>
    );
};

export default PatientPage;