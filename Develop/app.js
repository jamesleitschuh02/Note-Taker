const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const group = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

makeTeam();

function makeTeam(){
    managerInput();
};

function managerInput(){
    inquirer.prompt([
        {
            type: "input",
            name: "ManagerName",
            message: "What is the name of the manager?"
        },
        {
            type: "input",
            name: "ManagerID",
            message: "What is the manager ID?"
        },
        {
            type: "input",
            name: "ManagerEmail",
            message: "What is the Manager email?"
        },
        {
            type: "input",
            name: "OfficeNumber",
            message: "What is the managers office number?"
        }
    ])
    .then(response => {
        const manager = new Manager(response.ManagerName, response.ManagerID, response.ManagerEmail, response.OfficeNumber);
        group.push(manager);
        engineerInput();
    })
    .catch(err => {
        console.log("it failed ", err)
    });
};

function engineerInput(){
    inquirer.prompt([
        {
            type: "input",
            name: "EngineerName",
            message: "What is the name of the Engineer?"
        },
        {
            type: "input",
            name: "EngineerID",
            message: "What is the Engineer ID?"
        },
        {
            type: "input",
            name: "EngineerEmail",
            message: "What is the Engineers email?"
        },
        {
            type: "input",
            name: "EngineerGithub",
            message: "What is the Engineers Github?"
        },
        {
            type: "confirm",
            name: "addEngineer",
            message: "Would you like to add another engineer?"
        }
    ])
    .then(response => {
        const engineer = new Engineer(response.EngineerName, response.EngineerID, response.EngineerEmail, response.EngineerGithub);
        group.push(engineer);
        if (response.addEngineer){
            addNewEngineer();
        }
        else
        internInput();
    })
    .catch(err => {
        console.log("it failed ", err)
    });
};

function internInput(){
    inquirer.prompt([
        {
            type: "input",
            name: "InternName",
            message: "What is the name of the Intern?"
        },
        {
            type: "input",
            name: "InternID",
            message: "What is the Intern ID?"
        },
        {
            type: "input",
            name: "InternEmail",
            message: "What is the Interns email?"
        },
        {
            type: "input",
            name: "InternSchool",
            message: "What school does the Intern go to?"
        },
        {
            type: "confirm",
            name: "addIntern",
            message: "Would you like to add another Intern?"
        }
    ])
    .then(response => {
        const intern = new Intern(response.InternName, response.InternID, response.InternEmail, response.InternSchool);
        group.push(intern);
        if (response.addIntern){
            addNewIntern();
        }
        else
        console.log(group);
        const newHTML = render(group);
        fs.writeFile("../output/team.html", newHTML, function(err){
            if(err)
                throw err;
        });
    })
    .catch(err => {
        console.log("it failed ", err)
    });
};

function addNewEngineer(){
    engineerInput();
};

function addNewIntern(){
    internInput();
};