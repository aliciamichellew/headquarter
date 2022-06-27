const mongoose = require("mongoose");
// Database connection
mongoose.connect(process.env.DATABASE_ACCESS, () =>
console.log("Database connected")
);


const Internshipdummy = mongoose.model('Internshipdummy', {
    company: { type: String },
    position: { type: String }
});

// Function call
Internshipdummy.insertMany([
    { company: 'Shopee', position: 'Software Engineer Intern'},
    { company: 'Sea', position: 'Software Engineer Intern'},
    { company: 'PwC Singapore', position: 'Data Analyst Intern'},
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});