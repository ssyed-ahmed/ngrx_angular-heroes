export class Hero {
    constructor(
        public id: number, 
        public name: string, 
        public icon: string, 
        public description: string, 
        public sex: string,
        public rating: number[],
        public stats: any = {}) {}
        
}