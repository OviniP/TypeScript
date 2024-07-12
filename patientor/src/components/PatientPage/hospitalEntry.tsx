import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";
import Diagnosis from "./diagnosis";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type patientEntryProps = {
    entry:Entry
};

const hospitalEntry = ({entry}:patientEntryProps) => {
    return(
        <Box sx={{border:"2px solid black", padding:1, marginBottom:1}}>
            <Box sx={{display:'flex'}}>
                    <Typography variant="body1">
                        {entry?.date}
                    </Typography>
                    <LocalHospitalIcon sx={{paddingLeft:2}}/>
                </Box>
                <Box>
                <Typography variant="body1" sx={{fontStyle:"italic", fontSize:15}}>
                    {entry.description}
                </Typography>
                </Box>
                <Box component='ul'>
                        {entry.diagnosisCodes?.map(c => <Diagnosis code={c} key={c}></Diagnosis>)}
            </Box>
        </Box>
    );
};

export default hospitalEntry;