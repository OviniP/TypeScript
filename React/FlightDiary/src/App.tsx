import { useEffect, useState } from 'react'
import './App.css'
import DiaryEntries from './Components/DiaryEntries'
import NewEntry from './Components/NewEntry'
import { DiaryEntry } from './types';
import diaryEntryService from './Services/diaryEntryService';
import axios from 'axios';

function App() {

  const [diaryEntries,setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [error,setError] = useState('');

  useEffect(()=>{
    setData();
  },[]);

  const setData = async () =>{
    const entries = await diaryEntryService.getdiaryEntries();
    setDiaryEntries(entries);
  }

  const createNew = async (newEntry:unknown) =>{
    try{
        const response = await diaryEntryService.createEntry(newEntry)
        setDiaryEntries(diaryEntries.concat(response));
    }
    catch(error){
      setErrorMessage(error)
    }
}

const setErrorMessage = (error:unknown) => {
  if (axios.isAxiosError(error)) {
    const text = error?.response?.data;
    const keyword = "Error:";
    const index = text.indexOf(keyword);
    (index !== -1) ? setError(text.substring(index)): setError('An error occured');
  } else {
    setError('An error occured');
  }
}

  return (
    <>
      <div className='error'><p>{error}</p></div>
      <NewEntry create={createNew}></NewEntry>
      <DiaryEntries diaryEntries={diaryEntries}/>
    </>
  )
}

export default App
