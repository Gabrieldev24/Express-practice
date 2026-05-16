import { Request, Response } from "express"

import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"

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

    public getTodos =async (req:Request,res:Response)=>{

        const todos = await prisma.todo.findMany()

        return res.json(todos)
      
    }


    public getTodosById = async (req:Request, res: Response) =>{

        const id = +req.params.id!;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not number'})

        const todos = await prisma.todo.findFirst({where:{id:id}});

        (todos) ? res.json(todos) : res.status(404).json({error: 'TODOS by id not exist'});

        

        

    }
    public createTodo = async (req:Request, res: Response) =>{

        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if(error) return res.status(400).json({error})
        
        // if(!text) return res.status(400).json({error: 'Text property is required'})
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        console.log('creado')
        res.json(todo)

    }

    public updateTodo = async (req:Request, res: Response) =>{

        const id = +req.params.id!;
        const [error,updateTodoDto] = UpdateTodoDto.update({...req.body, id})

        if(error) return res.status(404).json({error})
        

        
        if(isNaN(id)) return res.status(400).json({error:'El id debe ser un numero'})
        
   

        const todos = await prisma.todo.findMany({where:{id}})
        if(!todos) return res.status(404).json({error:`id : ${id} no encontrado`})
        
   

           const updateTodo = await prisma.todo.update({
            where:{id},
            data: updateTodoDto!.values
                
              
            
        });
     

        res.json(updateTodo)


    }

    public deleteTodo = async(req:Request, res: Response) =>{

        const id = +req.params.id!
        if(isNaN(id)) return res.status(400).json({error:'El id debe ser un numero'})


        const todos = await prisma.todo.delete({where:{id:id}});
        // const todo = todos.find(e=> e.id === id)
        if(!todos) return res.status(404).json({error:`id : ${id} no encontrado`})
        
        // const newTodo = todos.filter(e=>{

        //     if(e.id !== id)return e
        // })

        // todos.splice(0, todos.length, ...newTodo)
        const mostrar = await prisma.todo.findMany()
        res.json(mostrar)
    }


}