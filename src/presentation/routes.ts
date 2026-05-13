import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes{
    static get routes():Router{

        const routes = Router()
        

            routes.use('/api/todos',TodoRoutes.routes)  

            routes.get('/api/tuki',((req,res)=>{
      
              return res.json([
                  {id:1, text:'tuki', createdAt: new Date()},
                  {id:2, text:'mochi', createdAt: null},
                  {id:3, text:'miausi', createdAt: new Date()},
              ])
      
            }))




        return routes
        
    }
}