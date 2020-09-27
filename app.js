const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

//Initialize firt prompt
addPrompt();

///////////////////////////////////////////////////////////////////////////
/////////Define all funtions here/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//initial prompt
function addPrompt(){
    inquirer
    .prompt([{
        type: "list",
        name: "addemployee",
        message:"Would you like to create a team?",
        choices: [
            "Yes",
            "No"
        ]
    }])
    .then(answer => {        
        if (answer.addemployee === "Yes"){
            createManager();
        }
        else if (answer.addemployee === "No"){
            console.log("No team to create") 
            return;
        }
        else{
        }
    })
}

//prompt to see if user wants to add another employee
function addAnotherPrompt(){
    inquirer
    .prompt([{
        type: "list",
        name: "addanother",
        message:"Would you like to add another employee?",
        choices: [
            "Yes",
            "No"
        ]
    }])
    .then(answer => {
        
        if (answer.addanother === "Yes"){
            createEmployee();
        }
        else if (answer.addanother === "No"){
            //run the render function
            const html = render(employees);
            writeFiles(html);
            return;
        }
        else{
        }
    })
}

//Choose the type employee to be added
function createEmployee(){
    inquirer
    .prompt([{
        type: "list",
        name: "employeeType",
        message:"Choose an employee to add to the team",
        choices: [
            "Engineer",
            "Intern"
        ]
    }])
    .then(answer => {

        if (answer.employeeType === "Engineer"){
            createEngineer();
        }
        else if(answer.employeeType === "Intern"){
            createIntern();
        }
        else{
        }

    })
};

//create manager of team
function createManager(){
    inquirer
    .prompt([
        {    type: "input",
        name: "name",
        message: "What is the team manager's name?"
        },
        {    type: "input",
        name: "id",
        message: "What is the team manager's ID?"
        },
        {    type: "input",
        name: "email",
        message: "What is the team manager's email?"
        },
        {    type: "input",
        name: "officenum",
        message: "What is the team manager's office number?"
        },
    ]).then(answers=>{
        const newManager = new Manager(answers.name,answers.id,answers.email,answers.officenum);
        employees.push(newManager)
        createEmployee();
    })
}    

//create engineer class employee
function createEngineer(){
    inquirer
    .prompt([
        {    type: "input",
        name: "name",
        message: "What is the engineer's name?"
        },
        {    type: "input",
        name: "id",
        message: "What is the engineer's ID?"
        },
        {    type: "input",
        name: "email",
        message: "What is the engineer's email?"
        },
        {    type: "input",
        name: "github",
        message: "What is the engineer's Github username?"
        },
    ]).then(answers=>{
        const newEngineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
        employees.push(newEngineer)
        addAnotherPrompt();
    }
    )
}   

//create intern class employee
function createIntern(){
    inquirer
    .prompt([
        {    type: "input",
        name: "name",
        message: "What is the intern's name?"
        },
        {    type: "input",
        name: "id",
        message: "What is the intern's ID?"
        },
        {    type: "input",
        name: "email",
        message: "What is the intern's email?"
        },
        {    type: "input",
        name: "school",
        message: "What is the intern's school?"
        },
    ]).then(answers=>{
        const newIntern = new Intern(answers.name,answers.id,answers.email,answers.school);
        employees.push(newIntern)
        addAnotherPrompt();        
    }
    )
}   

//create files
function writeFiles(html){
    if(fs.existsSync(OUTPUT_DIR)){
        fs.writeFileSync(outputPath,html);
    }
    else {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath,html);
    }
}

