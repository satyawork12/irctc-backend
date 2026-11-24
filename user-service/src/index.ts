import app from "./app.js"
import dotenv from "dotenv";
import { env } from "./config/env.js";

dotenv.config();

const port = env.PORT || 3000;

app.listen(port,()=>{
    console.log(`User Service is running on port ${port}`); 
})