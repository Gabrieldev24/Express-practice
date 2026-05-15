import { Request, Response } from "express"

import { prisma } from "../../data/postgres"

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


        const {text} = req.body
        if(!text) return res.status(400).json({error: 'Text property is required'})
        
        const todo = await prisma.todo.create({
            data:{
                text:text,
            }
        });
        console.log('creado')
        res.json(todo)

    }

    public updateTodo = async (req:Request, res: Response) =>{

        const id = +req.params.id!;
        if(isNaN(id)) return res.status(400).json({error:'El id debe ser un numero'})
        
        // const todo = todos.find(e=> e.id === id)

        const todos = await prisma.todo.findMany({where:{id}})
        if(!todos) return res.status(404).json({error:`id : ${id} no encontrado`})
        
        const {text, completedAt} = req.body;

           const updateTodo = await prisma.todo.update({
            where:{id},
            data: {
                text:text,
                completedAt:(completedAt)? new Date(completedAt) : null
            }
        });
     

        // (completedAt== null) ? todos.completedAt = null : todos.completedAt = new Date(completedAt || todo.completedAt)


        if(!text) return res.status(404).json({error:'text is required'})
        // todo.text = text;
        // todo.text = text || todo.text
        // todo.createdAt = createdAt || todo.createdAt

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