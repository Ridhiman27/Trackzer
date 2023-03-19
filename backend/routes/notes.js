const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const {body,validationResult} = require('express-validator');


//Route-1 Adding endpoint for fetching all notes using: GET "api/auth/fetchNotes". Login required
router.get('/fetchNotes',fetchUser,async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
    
});


//Route-2 Adding endpoint for adding all notes: Post "api/auth/addNotes". Login required
router.post('/addNotes',fetchUser,[

    body('title','Enter a valid title').isLength({min:3}),
    body('description','Password must be atleast 5 characters').isLength({min:5}),

],async(req,res)=>{

    try {
        const {title,description,tag} = req.body;
        //If there are errors, return Bad request and the errors.
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
    
        const note = new Notes({
            title,description,tag,user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json({savedNote});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
   
});


//Route-3 Adding endpoint for upadating the Notes Put "api/auth/getUser". Login required
router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
    try {
        const {title,description,tag} = req.body;
        //Create a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Found");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true});

        res.json({note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
});


//Route-4 : Delete an Existing Note using: DELETE "/api/notes/deleteNote".Login required
router.delete('/deleteNotes/:id',fetchUser,async(req,res)=>{
    try {
        // const {title,description,tag} = req.body;

        //Find the node to be deleted 
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Found");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted",note:note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;
