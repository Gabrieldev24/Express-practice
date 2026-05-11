import express from 'express'
import path from 'path';

interface Option {
    port: number,
    public_path?: string,
}

export class Server{
    private app = express();
    private readonly port:number
    private readonly public_path:string
    

    constructor(option:Option){
        const {port,public_path = 'public'} = option
        this.port = port;
        this.public_path = public_path
    }


    async start(){

     //middlewares
     //public folder

     this.app.use(express.static(this.public_path));
     this.app.use((req,res)=>{
        const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
        res.sendFile(indexPath);
     })

     this.app.listen(this.port,()=>{
        console.log(`Server started on port ${this.port}`)
     })

 
    }

}