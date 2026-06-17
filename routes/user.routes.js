import express from 'express'
const router = express.Router()
import {db} from '../db/index.js'
import {usersTable} from '../models/index.js'
import {randomBytes,createHmac} from 'node:crypto'
import {signupPostReqBodySchema} from '../validations/request.validations.js'

router.post('/signup',async(req,res)=>{
    const validationResult = await signupPostReqBodySchema.safeParseAsync(req.body)

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.message})
    }
    const {firstname,lastname,email,password} = validationResult.data
   
   const [existingUser] = await db
   .select({
    id: usersTable.id,
   }).from(usersTable).where(eq(usersTable.email,email))
   if(existingUser) return res.status(400).json({error: 'already exists'})

    const salt =  randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256',salt).update(password).digest('hex')

    const user = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
        salt,
        password:hashedPassword
    }).returning({id: usersTable.id})

    return res.status(201).json({data:{userId : user.id} })
})

export default router;