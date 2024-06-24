import { CoursePart } from "../types";

interface PartProps{
    coursePart:CoursePart
}

const Part = (props:PartProps) => {
        const part = props.coursePart;
        switch(part.kind){
            case "basic":
                return (
                    <div>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <i>{part.description}</i>
                    </div>
                );
                break;
            case "group":
                return (
                    <div>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <i>Project exercises {part.groupProjectCount}</i>
                    </div>
                );
                break;
            case "background":
                return (
                    <div>
                        <h3>{part.name} {part.exerciseCount}</h3>
                        <i>{part.description}</i><br/>
                        <i>{part.backgroundMaterial}</i>
                    </div>
                );
                break;
                case "special":
                    return (
                        <div>
                            <h3>{part.name} {part.exerciseCount}</h3>
                            <i>{part.description}</i><br/>
                            <i>Required skills: {part.requirements.join(', ')}</i>
                        </div>
                    );
                    break;
            default:
                assertNever(part);
                break;
        }
}

const assertNever = (value:never): never =>{
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};
export default Part;