import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

    static get routes():Router{
        const routes = Router()
        const todosController = new TodosController()
        
        routes.get('/', todosController.getTodos)
        routes.get('/:id', todosController.getTodosById)
        routes.post('/', todosController.createTodo)
        routes.put('/:id',todosController.updateTodo)
        routes.delete('/:id',todosController.deleteTodo)



        return routes
    }

}