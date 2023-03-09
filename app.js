const express=require("express");
const path=require("path");
const sqlite3=require("sqlite3");
const {open}=require("sqlite");
const dbPath=path.join(__dirname,"productdatabase.db");

const app=express();

app.use(express.json());

let db=null;

const initializationserver=async ()=>{

    try{
db=await open({filename:dbPath,driver:sqlite3.Database});
 await db.run(`create table if not exists inventory(product_id int not null primary key,quantity int,operation varchar(250))`);
 

app.listen(3000,()=>{

    console.log("server is running on 3000 port");
})
    }

    catch(error){
        console.log(`getting an ${error}`);
        process.exit(1)
    }
}

initializationserver();

app.post('/create',async(request,response)=>{

    const {payload}=request.body
    for (let item of payload){
        const {productId,quantity,operation}=item
         await db.run(`insert into inventor(product_id,quantity,operation)values(${productId,quantity,operation})`);
          
    }
    response.send("table created successfully");
})

app.post("/update",async (request,response)=>{

 const {payload}=request.body;
 for (let item of payload){
    const {productId,quantity,operation}=item
    if (operation==="add"){
        const updatingData=`update inventory set quantity=quantity+${quantity}`
        const final=await db.run(updatingData);
        
    }
      
    else if (operation==="subtract"){
        const updatingData=`update inventory set quantity=quantity-${quantity}`
        const final=await db.run(updatingData)
    }

response.send("updated sucessfully");
 }
});

 module.exports=app