const express = require("express");
const router = express.Router();

const users = require("../models/userSchema");
// router.get("/",(req,res)=>{
//     console.log("Connected");
// })

router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const presuser = await users.findOne({ email: email });
        if (presuser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const adduser = new users({
            name, email, age, mobile, work, add, desc
        });

        const user = await adduser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding data' });
    }
});


//  get Userdata

router.get("/register", async(req,res)=>{
    try{ 
        userdata = await users.find({})
       res.status(200).send(userdata);
    }catch(error){
        res.status(400).send(error);
    }
})

// Get individual user

router.get("/register/:id", async(req,res)=>{
    try{ 
        const id = req.params.id
        console.log(id);
       const userindividuals = await users.findById(id);
       console.log(userindividuals);
       res.status(201).send(userindividuals);
    }catch(error){
        res.status(400).send(error);
    }
})

//  Update User

//  Update the data by id
router.patch("/register/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateuser = await users.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updateuser); // Ensure JSON response with correct status
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

//    delete the user

router.delete("/register/:id",async(req,res)=>{

    try {
        const {id} = req.params;
        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(401).json(error);
    }
  })
  


module.exports = router;