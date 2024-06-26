import { DiaryEntry } from "../types"

interface EntryProps {
    entry:DiaryEntry
}
const Entry = (props:EntryProps) => {
    return (
        <>
            <h3>
                {props.entry.date} 
            </h3>
            <p>
                Visibility: {props.entry.visibility}<br/>
                Weather: {props.entry.weather}<br/>
                {props.entry.comment} <br/>

            </p>
         </>
    );
}

export default Entry;