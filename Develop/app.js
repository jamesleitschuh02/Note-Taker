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

makeTeam();

function makeTeam(){
    managerInput();
};

function addNewEngineer(){
    engineerInput();
};

function addNewIntern(){
    internInput();
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