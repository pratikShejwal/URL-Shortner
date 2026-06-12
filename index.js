import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 8000
app.use(express.json())
app.get('/',(req,res)=>{
    return res.json({message: 'server is running'})
})

app.listen(PORT,()=>{
    console.log('server is running');
    
})