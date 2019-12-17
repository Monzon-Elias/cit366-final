export class Assignment {
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public course_name: string,
        public due_date: string,
        public done: string,
        public alive: string,
        public points: string,
        public desc: string,
        public personal_notes: string,
    ) {}
}