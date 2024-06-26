import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather} from "../types";

interface NewEntryProps {
    create: (newEntry:NewDiaryEntry) => void;
  }

const NewEntry = (props:NewEntryProps) => {

    const [date,setDate] = useState<string>('');
    const [visibility,setVisibility] = useState('');
    const [weather,setWeather] = useState('');
    const [comment,setComment] = useState('');

    const createEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry:NewDiaryEntry = {
            comment:comment,
            date:date,
            visibility:visibility,
            weather:weather
        }
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
        props.create(newEntry);
    };

    return (
        <form onSubmit={createEntry}>
            <div>
                <label className="new-entry-label">Date</label>
                <input type="date" value={date} onChange={event => setDate(event.target.value)}></input>
            </div>
            <div className="container">
                <label className="new-entry-label">Visibility</label>
                <div className="radio-button-set">
                    {Object.values(Visibility).map(v => {
                       return <div key={v}>
                        <input type="radio" id={v} name = 'visibility' value={v} onChange={event => setVisibility(event.target.value)}></input>
                        <label>{v}</label>
                        </div>
                    })}
                </div>
            </div>
            <div className="container">
            <label className="new-entry-label">Weather</label>
            <div className="radio-button-set">
                    {Object.values(Weather).map(v => {
                       return <div key={v}>
                        <input type="radio" id={v} name = 'weather' value={v} onChange={event => setWeather(event.target.value)}></input>
                        <label>{v}</label>
                        </div>
                    })}
                </div>
            </div>
            <div>
                <label className="new-entry-label">Comment</label>
                <input type="text" value={comment} onChange={event => setComment(event.target.value)}></input>
            </div>
            
            <button>Create</button>
        </form>
    );
}

export default NewEntry