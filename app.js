const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = [];

addPrompt();
const render = require("./lib/htmlRenderer");


///////////////////////////////////////////////////////////////////////////
/////////Define all funtions here/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//initial prompt
function addPrompt(){
    inquirer
    .prompt([{
        type: "list",
        name: "addemployee",
        message:"Would you like to add an employee?",
        choices: [
            "Yes",
            "No"
        ]
    }])
    .then(answer => {
        console.log(answer.addemployee)
        
        if (answer.addemployee === "Yes"){
            createEmployee();
        }
        else if (answer.addemployee === "No"){
            console.log("Please add some employees") 
            return;
        }
        else{
        }
    })
}

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
        console.log(answer.addanother)
        
        if (answer.addanother === "Yes"){
            createEmployee();
        }
        else if (answer.addanother === "No"){
            //run the render function
            const html = render(employees);
            console.log(html);
            writeFiles(html);
            return;
        }
        else{
        }
    })
}

//create an employee
function createEmployee(){
    inquirer
    .prompt([{
        type: "list",
        name: "employeeType",
        message:"Choose an employee to add",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    }])
    .then(answer => {
        console.log(answer.employeeType)
        
        if (answer.employeeType === "Manager"){
            createManager();
        }
        else if (answer.employeeType === "Engineer"){
            createEngineer();
        }
        else if(answer.employeeType === "Intern"){
            createIntern();
        }
        else{
        }

    })
}

//create manager class employee
function createManager(){
    inquirer
        .prompt([
            {    type: "input",
            name: "name",
            message: "What is the manager's name?"
            },
            {    type: "input",
            name: "id",
            message: "What is the manager's ID?"
            },
            {    type: "input",
            name: "email",
            message: "What is the manager's email?"
            },
            {    type: "input",
            name: "officenum",
            message: "What is the manager's office number?"
            },
        ]).then(answers=>{
            console.log(answers);
            const newManager = new Manager(answers.name,answers.id,answers.email,answers.officenum);
            employees.push(newManager)
            console.log(employees)
            addAnotherPrompt();
        }
        )
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
        console.log(answers);
        const newEngineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
        employees.push(newEngineer)
        console.log(employees)
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
        console.log(answers);

        const newIntern = new Intern(answers.name,answers.id,answers.email,answers.school);
        console.log(newIntern);
        employees.push(newIntern)
        console.log(employees)
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
