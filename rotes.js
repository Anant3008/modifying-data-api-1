const MenuItem=require('./schema')
const express=require('express')
const router=express.Router()

router.post('/menu',async (req,res)=>{
    try{
        const {name,description,price}=req.body

        if(!name || !price){
            return res.status(400).json({message: "Name and Price are required"})
        }

        const newItem=new MenuItem({name,description,price})
        await newItem.save()
        res.status(201).json({message:"Menu item added",item:newItem})
    }catch(err){
        res.status(500).json({message: "Internal Server Error",error:err.message})
    }
})
    

router.get('/menu',async (req,res)=>{
    try{
        const menuItems=await MenuItem.find()
        res.status(200).json(menuItems)
    }catch(err){
        res.status(500).json({message: "Internal Server Error",error: err.message})
    }
})

module.exports=router