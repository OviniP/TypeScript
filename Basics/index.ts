import  express  from "express";
import calculateBmi, {parseQueryParams} from "./bmiCalculator";
import {calculateExercises, summery} from './exerciseCalculator';

const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/hello',(_req, _res) => {
    _res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, _res) => {
 const params = parseQueryParams(_req);
 if(params.success){
    const height = params.data?.height == null ? 0 : params.data.height;
    const weight = params.data?.weight == null ? 0 : params.data.weight;

    const bmi = calculateBmi(height,weight);
    const retVal = {
        "weight": weight,
        "height":height,
        "bmi": bmi
     };
     return _res.json(retVal);
 }
 else{
    const retVal = {
        error: "malformatted parameters"
    };
    return _res.json(retVal);
}
});
 
app.post('/exercises', (_req,_res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const data:any = _req.body;
 
  // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if(data == null || !data.hasOwnProperty("daily_exercises") || !data.hasOwnProperty("target")){
    const error = {
        error: "parameters missing"
      };
    return _res.json(error);
  }


  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hours:number[] = (data.daily_exercises as number[]).map(e => Number(e));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(data.target);
  if(isNaN(target) || hours.filter(h => isNaN(h)).length > 0){
    const error = {
        error: "malformatted parameters"
      };
    return _res.json(error);
  }
  else{
     const retVal:summery =  calculateExercises(hours,target);

  return _res.json(retVal);
  }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}` );
});