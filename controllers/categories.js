let express = require('express')
let db = require('../models')

let router = express.Router()


//GET /categories - show all the categories that exist
router.get('/', (req, res) => {
  db.category.findAll()
  .then((categories) => {
    res.render('categories/index', { categories: categories })
    console.log(categories)
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

//GET GET /categories/:id - show a specific category and all the projects with that category
router.get('/:id', (req, res) => {
  db.category.findOne({
    where: { id: req.params.id },
    include: [db.project]
  }).then((category) => {
    res.render('categories/show', {category:category})
  })
  .catch((error) => {
    // console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

// POST - delete a category
router.delete('/:id', (req, res) => {
  db.category.destroy({
    where: {id: req.params.id}
  }).then(function(){
    res.redirect('categories/index')
  })
})

module.exports = router