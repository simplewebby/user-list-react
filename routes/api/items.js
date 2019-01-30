const express = require('express');
const router = express.Router();

//Bring Item Model
const Item = require('../../models/Item');

// route GET api/items
// route GET all items

// Public access
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items));
})


// Get single Item by Id
router.get('/:_id', (req, res, next) => {
    Item.findById(req.params._id, (err, item) => {
        if(err) return next(err);
        res.json(item);
    });        
});



//Post route 
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        email: req.body.email
    });
    newItem.save().then(item => res.json(item));
});


// Update route
router.put('/:id', (req, res, next) => {
    Item.findByIdAndUpdate({_id:req.params.id}, {
        $set: {
            name: req.body.name,
            email: req.body.email
        }
    },
    function(err, item ) {
        if (err) return next(err);
        res.json(item);
    });
});


//delete route
router.delete('/:id', (req, res, next) => {
    Item.deleteOne({_id:req.params.id}, 
    function(err,result ) {
        if (err) return next(err);
        res.json(result);
    });
});

module.exports = router;