import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps{
    courseParts :CoursePart[];
}

const Content = (props: ContentProps) => {
            /*
            <p>
                {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
            </p>
            <p>
                {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
            </p>
            <p>
                {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
            </p>*/
    return(
        props.courseParts.map(part => <Part coursePart = {part}></Part>)
    )
}

export default Content;