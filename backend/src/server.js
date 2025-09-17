import express from "express";
import {ENV} from "./config/env.js";
import {connectDB} from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import { functions,inngest } from "./config/inngest.js";
import { serve } from "inngest/express";




const app=express();

app.use(express.json());

app.use(clerkMiddleware());//req.auth will be available int the request object

app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT=process.env.PORT;

app.get("/",(req,res) =>{
    res.send("Hello World! 123");
});

const startServer=async()=>{
    try{
        await connectDB();
        if(ENV.NODE_ENV!="producton"){
            app.listen(ENV.PORT,()=>{
    console.log("Server started on port:",ENV.PORT);
});
        }
    }
    catch(error){
        console.error("Error starting serever:",error);
        process.exit(1);//exit the process with a failure code
    }
};

startServer();

export default app;

