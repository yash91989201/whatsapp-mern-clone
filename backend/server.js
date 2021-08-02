import express from 'express';
import './DB/conn.js';
import Messages from './model/dbmessages.js';
import cors from 'cors';
const PORT=process.env.PORT || 9000;

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    methods:['GET','POST'],
    header:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Header':'*',
    }
}));

// getting all the messages
app.get('/messages/sync',async(req,res)=>{
    try{
        const result=await Messages.find();
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
    }
});
// getting the data to store in database
app.post('/messages/new',async(req,res)=>{
    const dbMessage=req.body;
    try{
        const result=await Messages.create(dbMessage);
        res.status(201).json(result);
    }
    catch(err){
        console.log(err);
    }
});

app.listen(PORT,(err)=>{
    err?
    console.log(err):
    console.log(`Server is running at Port:${PORT}`);
});