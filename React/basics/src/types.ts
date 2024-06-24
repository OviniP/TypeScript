interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartExplained extends CoursePartBase {
    description: string
  }
  
  interface CoursePartBasic extends CoursePartExplained {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartExplained {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartExplained {
    requirements: string [];
    kind: "special"
  }
  
  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

