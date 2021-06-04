let express = require('express')
let db = require('../models')
let router = express.Router()
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }
  })
  .then(([project, created]) => {
    db.category.findOrCreate({
      where:{
        name: req.body.category,
      } 
    }).then(function([category,created]){
      project.addCategory(category).then(function(relationInfo) {
        // console.log(`Project ${project.name} added to ${category.name}`)
        // console.log(relationInfo)
      })
    })
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    db.category.findAll()
    .then((categories)=> {
      // console.log(project)
    res.render('projects/show', { project: project, categories: categories })
    })
    
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


//GET /projects/edit/:id display form to edit
// router.get('/edit/:id', (req, res)=> {
//   db.project.findOne({
//     where: {id: req.params.id}
//   }).then(function(foundProject){
//     res.render('projects/edit', {project: foundProject})
//   })
//   .catch((error) => {
//     res.status(400).render('main/404')
//   })
// })

//GET /projects/edit/:id display form to edit
//Async await
router.get('/edit/:id', async (req, res)=> {
  try {
    const foundProject = await db.project.findOne({
      where: {id: req.params.id}
    })
    if (foundProject){
      res.render('projects/edit', {project: foundProject})

    } else {
      console.log("Project not found")
    }

  } catch(error){
    res.status(400).render('main/404')
    }
  
})


//POST /project/id adds category to an individual project
router.post('/:id', (req, res)=>{

  db.project.findOrCreate({
    where: {id: req.params.id}
  })
  .then(([project, created]) => {
    console.log(">>>>>><<<<<",req.body)
    db.category.findOrCreate({
      where:{
        name: req.body.category,
      }
    }).then(function([category,created]){
      project.addCategory(category).then(function(relationInfo) {
        // console.log(`Project ${project.name} added to ${category.name}`)
        // console.log(relationInfo)
        res.redirect(`/categories/${category.id}`)
      })
    })
    // res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

//PUT project/id Edit individual project
router.put('/:id', (req, res)=> {
  db.project.findOne({
    where: {id: req.params.id}
  }).then(function(foundProject){
    foundProject.update({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployLink,
      description: req.body.description
    }).then(function(editedProject){
      res.redirect(`/projects/${editedProject.id}`)
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


//POST delete a prject
router.delete('/:id', (req, res)=>{
  db.project.destroy({
    where: {id:req.params.id}
  }).then(function(){
    res.redirect('/')
  })
})

module.exports = router
