import express, { Router } from 'express'
import path from 'path';
import { AppRoutes } from './routes';

interface Option {
    port: number,
    routes: Router,
    public_path?: string,
}

export class Server{
    private app = express();
    private readonly port:number;
    private readonly public_path:string;
    private readonly routes:Router


    

    constructor(option:Option){
        const {port,routes,public_path = 'public'} = option
        this.port = port;
        this.public_path = public_path
        this.routes = routes


    }


    async start(){

     //middlewares
     this.app.use(express.json())
     this.app.use(express.urlencoded({extended:true}))

     
     //public folder
     this.app.use(express.static(this.public_path));


     //Routes
     this.app.use(this.routes)

     //* SPA
     this.app.use((req,res)=>{
        const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
        res.sendFile(indexPath);
     })

     this.app.listen(this.port,()=>{
        console.log(`Server started on port ${this.port}`)
     })

 
    }

}