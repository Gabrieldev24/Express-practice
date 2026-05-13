import { Request, Response } from "express"
import { text } from "stream/consumers"

const todos = [
                  {id:1, text:'Buy Milk', completedAt: new Date()},
                  {id:2, text:'Buy bread', completedAt: null},
                  {id:3, text:'Buy butter', completedAt: new Date()},
              ]

export class TodosController{

    //*DI
    constructor(

    ){

    }

    public getTodos =(req:Request,res:Response)=>{
      
              return res.json(todos)
      
    }


    public getTodosById = (req:Request, res: Response) =>{

        const id = +req.params.id!;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not number'})
        const ById = todos.find(todos=> todos.id === id);

        (ById) ? res.json(ById) : res.status(404).json({error: 'TODOS by id not exist'})

        

    }
    public createTodo = (req:Request, res: Response) =>{

        const {text} = req.body
        if(!text) return res.status(400).json({error: 'Text property is required'})
        
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }

        todos.push(newTodo)
        res.json(newTodo)

    }

    public updateTodo = (req:Request, res: Response) =>{

        const id = +req.params.id!;
        if(isNaN(id)) return res.status(400).json({error:'El id debe ser un numero'})
        
        const todo = todos.find(e=> e.id === id)
        if(!todo) return res.status(404).json({error:`id : ${id} no encontrado`})
        
        const {text, completedAt} = req.body;

        (completedAt== null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt)


        if(!text) return res.status(404).json({error:'text is required'})
        // todo.text = text;
        todo.text = text || todo.text
        // todo.createdAt = createdAt || todo.createdAt

        res.json(todo)


    }

    public deleteTodo = (req:Request, res: Response) =>{

        const id = +req.params.id!
        if(isNaN(id)) return res.status(400).json({error:'El id debe ser un numero'})
            
        const todo = todos.find(e=> e.id === id)
        if(!todo) return res.status(404).json({error:`id : ${id} no encontrado`})

        const newTodo = todos.filter(e=>{

            if(e.id !== id)return e
        })

        todos.splice(0, todos.length, ...newTodo)

        res.json(newTodo)
    }


}