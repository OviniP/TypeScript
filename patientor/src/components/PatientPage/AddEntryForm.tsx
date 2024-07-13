import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Entry, EntryFormValues, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { AxiosError } from "axios";
import ErrorIcon from '@mui/icons-material/Error';
import CodeSelector from "./CodeSelector";

type AddEntryProps = {
    showHide:boolean,
    patientId:string,
    onEntryAdded:(entry:Entry) => void
};

const AddEntry = ({showHide, patientId, onEntryAdded}:AddEntryProps) => {
    const [showForm, setShowForm] = useState(showHide);
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [specialist,setSpecialist] = useState('');
    const [rating,setRating] = useState(0);
    const [codes,setCodes] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [entryType, setEntryType] = useState('hospital');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCritatia, setDischargeCritatia] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    

    useEffect(() => {
        setShowForm(showHide);
      }, [showHide]);
      
    const formSubmit = async (event:SyntheticEvent) => {
        try{
        event.preventDefault();
        const entry = getEntry();
        const newEntry = await patientService.createEntry(patientId,entry);
        onEntryAdded(newEntry);
        }
        catch(error:unknown){
            let errorMsg = "An Error Occured";
            if(error instanceof AxiosError){
                errorMsg = error.response?.data;
            }
            setMessage(errorMsg);
        }
    };

    const getEntry = ():EntryFormValues => {
        const baseEntry = {
            description:description,
            date:date,
            specialist:specialist,
            diagnosisCodes:codes
        };
        switch(entryType){
            case "healthCheck":
                const healthCheckEntry:Omit<HealthCheckEntry,"id"> = {
                    ...baseEntry,
                    type:"HealthCheck",
                    healthCheckRating:rating
                };
                return healthCheckEntry;
            case "hospital":
                const hospitalEntry:Omit<HospitalEntry,"id"> = {
                    ...baseEntry,
                    type:"Hospital",
                    discharge: {
                        date:dischargeDate,
                        criteria:dischargeCritatia
                    }
                };
                return hospitalEntry;
            case "occupational":
                const occupationalEntry:Omit<OccupationalHealthcareEntry,"id"> = {
                    ...baseEntry,
                    type:"OccupationalHealthcare",
                    employerName:employerName,
                    sickLeave:{
                        startDate:leaveStartDate,
                        endDate:leaveEndDate
                    }
                };
                return occupationalEntry;
            default:
                throw new Error("invalid Type");
        }
       
    };

    const closeForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating(0);
        setCodes([]);
        setShowForm(false);
    };
    
    const handleEntryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntryType(event.target.value);
    };

    const handleCodeSelect = (data:string[]) =>{
        console.log(data);
        setCodes(data);
    };

    if(showForm)
    {
        return(
            <>
                <Box sx={{backgroundColor:"#f2cbe6", visibility: message != '' ? 'visible' : 'hidden', display:"flex"}}>
                    <ErrorIcon sx={{margin:1}}/>
                    <Typography sx={{ marginTop:1, marginBottom:1}}>{message}</Typography>
                </Box>
                
                <Box sx={{borderStyle:"dotted", padding:1, marginBottom:2, marginTop: 2}}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Entry Type</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={entryType}
                            name="radio-buttons-group"  onChange={handleEntryTypeChange}>
                            <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
                            <FormControlLabel value="healthCheck" control={<Radio />} label="Health check" />
                            <FormControlLabel value="occupational" control={<Radio />} label="Occupational Healthcare" />
                        </RadioGroup>
                    </FormControl>

                    <Typography variant="h6" sx= {{fontWeight: 'bold'}}>New Healthcheck Entry</Typography>
                    <Box component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2, // Space between each TextField
                        }}
                        noValidate autoComplete="off" onSubmit={formSubmit}>
                        <TextField id="description" label="Description" type="text" value={description} 
                            onChange={(event) => setDescription(event.target.value)}/>
                        <TextField id="date" label="Date" type="date" value={date}  onChange={(event) => setDate(event.target.value)}/>
                        <TextField id="specialist" label="Specialist" type="text" value={specialist}  onChange={(event) => setSpecialist(event.target.value)}/>
                        <CodeSelector selected={handleCodeSelect}></CodeSelector>
                        {   entryType === "healthCheck" &&
                            <TextField id="rating" label="HealthCheck Rating" type="text" value={rating}  onChange={(event) => setRating(Number(event.target.value))}/>
                        }
                        {
                            entryType === "hospital" &&
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap:2}}>
                                <Box sx={{ flex: 1 }}> 
                                    <TextField  label="Discharge Date" type="date" value={dischargeDate}  onChange={(event) => setDischargeDate(event.target.value)}/>
                                </Box>
                                <Box sx={{ flex: 3 }}> 
                                    <TextField  label="Discharge Critaria" type="text" value={dischargeCritatia}  onChange={(event) => setDischargeCritatia(event.target.value)} sx={{width:"100%"}}/>
                                </Box>
                            </Box>
                        }
                        {
                            entryType === "occupational" &&
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField  label="Employer Namne" type="text" value={employerName}  onChange={(event) => setEmployerName(event.target.value)}/>
                                <Box>
                                    <TextField  label="Start Date" type="date" value={leaveStartDate}  onChange={(event) => setLeaveStartDate(event.target.value)}
                                        sx={{ width:"25%"}}/>
                                    <TextField  label="End Date" type="date" value={leaveEndDate}  onChange={(event) => setLeaveEndDate(event.target.value)}
                                        sx={{marginLeft:5, width:"25%"}}/>
                                </Box>
                            </Box>
                        }
                        <Box sx={{display:"flex"}}>
                            <Button type="submit" variant="contained" sx={{width:25,marginRight:5}}>Add</Button>
                            <Button type="button" onClick={closeForm} variant="contained"  color="primary" 
                                sx={{backgroundColor:'pink', width:25}}>Cancel</Button>
                        </Box>
                </Box>
                </Box>
            </>
        );
    }
};

export default AddEntry;
