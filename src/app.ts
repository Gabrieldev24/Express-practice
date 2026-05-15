

import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { text } from "node:stream/consumers";
import { envs } from "./config/envs";

(async()=>{
    main();
})();

async function main(){
   const server =  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    public_path: envs.PUBLIC_PATH
   });
   server.start()




}