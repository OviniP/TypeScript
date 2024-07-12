import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import diagnosesServices from "../../services/diagnoses";
import { Diagnosis } from "../../types";

type diagnosisProps = {
    code:string
};

const DiagnosisCodes = ({code}:diagnosisProps) => {
    const [data, setData] = useState<Array<Diagnosis>>([]);
    const [codeName, setCodeName] = useState("");

    useEffect(()=>{
        const getData = async () => {
            const data = await diagnosesServices.getAll();
            setData(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const diagnosis = data.filter(d => d.code == code);
        const name = diagnosis.length > 0 ? diagnosis[0].name : "";
        setCodeName(name);
    }, [code, data]);

    return(
        <Typography component='li' variant="body1">{code}    {codeName}</Typography>
    );
};

export default DiagnosisCodes;