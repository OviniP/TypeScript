export interface summery {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface rating {
    rating:number,
    desc: string
}

export const calculateExercises = (hours: number[], target:number) : summery => {
    const avg = hours.reduce((acc, curr) => acc + curr, 0)/ hours.length;
    const trainingdays = hours.filter(i => i > 0).length;
    const {rating, desc} = getRating(avg,target);
    const retval = 
    {
        periodLength: hours.length,
        trainingDays: trainingdays,
        success: avg >= target,
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: avg
    };

    return retval;
};
 const getRating = (average:number, target:number):rating => {
    if(average > target)
        return {rating: 3, desc : "Very good"};
    if(average == target)
        return {rating: 2, desc: "good"};
    else
        return { rating : 1, desc:"Need improvements"};
};

export const parseArgs = (args: string []) => {
    if(args.length < 4)
        throw Error("Invalid number of arguments");
    const target = Number(args[2]);
    const hours = args.slice(3,args.length).map(i => Number(i));

    if(hours.includes(NaN)){
        throw Error("arguments should only be numbers");
    }
    const retVal =  {
            hours:hours,
            target:target
        };

    return retVal;
};
//const args = parseArgs(process.argv);

//console.log(calculateExercises(args.hours, args.target));