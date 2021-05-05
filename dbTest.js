const db = require('./models')
const async = require('async')
// Create a category: Category model must exist and be migrated

// db.category.create({
//   name: 'animals'
// }).then(function(category) {
//   console.log(category.get())
// })

//Find category and project
// create a many-to-many association between categories and projects
// db.project.findOrCreate({
//   where: { id: 1 },
// }).then(function([project, created]) {
//   db.category.findOrCreate({
//     where: { name: "animals"}
//   }).then( function([category, created]){
//     project.addCategory(category).then(function(relationInfo) {
//       console.log(">>>>>>>>>", project.name, category.name)
//       console.log(relationInfo)
//     })
//   })
  
// })



// Create a project and use the helper function create<ModelName> to create a category
// Requires categoriesProjects to exist, be migrated, and properly associated

// const cats = ['node', 'javascript', 'react', 'css', 'html']

// db.project.create({
//   name: 'PROJECT TWO',
//   deployLink: 'http://github.com/brandiw',
//   githubLink: 'http://github.com/brandiw',
//   description: 'This was a game'
// }).then(function(project) {
//   // IMPROVED VERSION WITH ASYNC
//   // async.forEach(arrayToIterate, iteratorFunctionToRunOnEachItem(item, callback), functionToRunWhenAllComplete)
//   async.forEach(cats, (cat, done) => {
//     db.category.findOrCreate({
//       where: { name: cat }
//     })
//     .spread((category, wasCreated) => {
//       project.addCategory(category)
//       .then(() => {
//         // res.redirect, or whatevs
//         console.log('done adding', cat)
//         done()
//       })
//     })
//   }, () => {
//     console.log('EVERYTHING is done. Now redirect or something')
//   })





//   // TIMING DOESNOT WORK
//   // cats.forEach((cat) => {
//   //   db.category.findOrCreate({
//   //     where: { name: cat }
//   //   })
//   //   .spread((category, wasCreated) => {
//   //     project.addCategory(category)
//   //     .then(() => {
//   //       // res.redirect, or whatevs
//   //       console.log('done adding', cat)
//   //     })
//   //   })
//   // })
//   // console.log('redirect or something')
// })
