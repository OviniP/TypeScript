import { Box, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import Diagnosis from "./diagnosis";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const OccupationalHealthEntry:React.FC<{entry:OccupationalHealthcareEntry}> = ({entry}) => {
    return(
        <Box sx={{border:"2px solid black", padding:1, marginBottom:1}}>
            <Box sx={{display:'flex'}}>
                <Typography variant="body1">
                {entry?.date}
                </Typography>
                <MedicalServicesIcon sx={{paddingLeft:2}}/>
                <Typography variant="body1"  sx={{fontStyle:"italic"}}>
                {entry?.employerName}
                </Typography>
            </Box>
            <Box>
            <Typography variant="body1" sx={{ fontStyle:"italic", fontSize:15}}>
                    {entry.description}
                </Typography>
            </Box>
            <Box>
            <Typography variant="body1" sx={{fontSize:15}}>
                   Diagnose By: {entry.specialist}
            </Typography>
            </Box>
            <Box component='ul'>
                    {entry.diagnosisCodes?.map(c => <Diagnosis code={c} key={c}></Diagnosis>)}
            </Box>
        </Box>
    );
};

export default OccupationalHealthEntry;