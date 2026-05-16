


export class UpdateTodoDto{

       private constructor(
        public readonly id: number,
        public readonly text?:string,
        public readonly completedAt?: Date,
    ){}

    get values(){

        const returnObj: {[key:string]:any} = {}
        if(this.id) returnObj.id = this.id
        if(this.text) returnObj.text = this.text
        if(this.completedAt) returnObj.completedAt = this.completedAt

        return returnObj;
    }
    

    
    static update(obj: {[key:string]:any}):[string?, UpdateTodoDto?]{
        
        const {id,text, completedAt} = obj
        let newCompleteAt = completedAt;

        if(!id || isNaN(Number(id))) return ['id must be a valid number']
        if(!text) return ['Text property is required', undefined];

        if(completedAt){
            newCompleteAt = new Date(completedAt)
            if(newCompleteAt.toString() === 'Invalid Date'){
                return ['CompleteAt must be a valid date']
            }
        }

        
        // obj.completedAt = (obj.completedAt == null) ? null : new Date(newCompleteAt || obj.completedAt)
        // completedAt = (completedAt) 
        
        return [undefined, new UpdateTodoDto(text,newCompleteAt)]
    }


}