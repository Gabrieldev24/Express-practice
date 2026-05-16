


export class CreateTodoDto{

    private constructor(
        public readonly text:string,
    ){}

    static create(prop: {[key:string]:any}):[string?, CreateTodoDto?] {

        const {text} = prop;

        if(!text) return ['Text property is required', undefined]

        return [undefined, new CreateTodoDto(text)]
    }

}