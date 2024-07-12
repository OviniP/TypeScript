import { Entry } from "../../types";
import HealthCheckEntryComponent from "./healthCheckEntry";
import HospitalEntry from "./hospitalEntry";
import OccupationalHealthEntry from "./occupationalHealthEntry";

type patientEntryProps = {
    entry:Entry
};

const PatientEntry = ({entry}:patientEntryProps) => {
    switch(entry.type){
        case "Hospital":
            return <HospitalEntry entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthEntry entry={entry}/>;
        default:
            assertNever(entry);
    }
};

function assertNever(entry: never):never {
    throw new Error(`Invalid entry type - ${JSON.stringify(entry)}`);
}

export default PatientEntry;


