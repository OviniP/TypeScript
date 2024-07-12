import { Box, Typography } from "@mui/material";
import { HealthCheckEntry} from "../../types";
import Diagnosis from "./diagnosis";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, orange, red, yellow } from "@mui/material/colors";

const HealthCheckEntryComponent: React.FC<{entry:HealthCheckEntry}> = ({entry}) => {
   let rateIcon;
    switch(entry.healthCheckRating){
        case 0 :
            rateIcon = <FavoriteIcon sx={{color:green[500]}}/>;
            break;
        case 1:
            rateIcon = <FavoriteIcon sx={{color:yellow[500]}}/>;
            break;
        case 2:
            rateIcon = <FavoriteIcon sx={{color:orange[500]}}/>;
            break;
        case 3:
            rateIcon = <FavoriteIcon sx={{color:red[900]}}/>;
            break;
       //default:
          //  assertNever(entry.healthCheckRating);
          //  break;
    }

    return(
        <Box sx={{border:"2px solid black", padding:1, marginBottom:1}}>
            <Box sx={{display:'flex'}}>
                <Typography variant="body1">
                {entry?.date}
                </Typography>
                <MonitorHeartIcon sx={{paddingLeft:2}}/>
            </Box>
            <Box>
                <Typography variant="body1" sx={{fontStyle:"italic", fontSize:15}}>
                    {entry.description}
                </Typography>
            </Box>
            { rateIcon }
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

/*
function assertNever(value: never): never{
    throw new Error(`Invalid value for HealthCheck rating ${value}`);
}*/

export default HealthCheckEntryComponent;


