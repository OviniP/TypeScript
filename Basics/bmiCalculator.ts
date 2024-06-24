import {Request} from 'express';

interface parsedParams{
    success:boolean,
    data?:{
        height: number,
        weight: number
    },
    error?: string
}

const calculateBmi = (height:number, weight: number):string => {
    const heightInMeters = height/100;
    const bmi = weight/ (heightInMeters * heightInMeters);

    if( bmi < 25)
        return 'Normal (Healthy weight)';
    else if (bmi < 29)
        return 'Overweight';
    else 
        return 'Obese';
};

export const parseBmiArgs = (args:string[]) => {
    if(args.length < 4)
        throw new Error("Provided arguments are not enough");
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height : Number(process.argv[2]),
            weight : Number(process.argv[3])
        };
    }
    else
         throw new Error("Given arguments are not numbers");
};

export const parseQueryParams = (req:Request):parsedParams => {
    const retVal:parsedParams = {
        success:false,
    };
    if(Number(req.query.length) < 2)
        {
        retVal.success = false;
        retVal.error =  "Invalid parameter count";
        }
    else{
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if(!isNaN(height) && !isNaN(weight))  
            {
            retVal.success = true  ;
            retVal.data = {
                "height": height,
                "weight": weight
            };
        }
        else {
            retVal.success = false;
            retVal.error = "Malformed parameters";
        }
    }
    return retVal;
};

//const {height, weight} = parseBmiArgs(process.argv)
//console.log(calculateBmi(height, weight))
export default calculateBmi;