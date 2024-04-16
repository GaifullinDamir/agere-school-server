export class CreateCourseDto{
    readonly id: string;
    readonly name: string;
    readonly category: string; 
    readonly description: string;
    readonly logo: string;
    readonly rating: number;
    readonly userId: string;
}