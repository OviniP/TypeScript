import { DiaryEntry } from "../types"
import  Entry from "./Entry"

interface DiaryEntriesProps{
    diaryEntries:DiaryEntry[]
}

const DiaryEntries = (props:DiaryEntriesProps) => {
    return(
        <>
            <h2>Diary Entries</h2>
             {props.diaryEntries.map(p => <Entry key={p.id} entry={p}/>)}
        </>
    )
}

export default DiaryEntries