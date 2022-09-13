const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern')
const template = require('./src/template')
const fs = require('fs')


const managers = [];
const engineers = [];
const interns = [];

function createManager() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the managers name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the managers id?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the managers email?',
                validate: function (email) {
                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                }
            },
            {
                type: 'number',
                name: 'officeNumber',
                message: 'What is the managers Office Number?',
            },

        ])
        .then(function (answers) {
            console.log(answers);
            const { id, email, name, officeNumber } = answers;
            managers.push(new Manager(id, email, name, officeNumber));
            console.log(managers);
            createTeam();
        })

};
function createEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the Engineers name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the Engineers id?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the Engineers email?',
                validate: function (email) {
                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is the Engineers github username?'
            },

        ])
        .then(function (answers) {
            console.log(answers);
            const { id, email, name, github } = answers;
            engineers.push(new Engineer(id, email, name, github));
            console.log(engineers);
            createTeam();
        });

};
function createIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the Interns name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the Interns id?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the Interns email?',
                validate: function (email) {
                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school are you attending?'
            },

        ]).then(function (answers) {
            console.log(answers);
            const { id, email, name, school } = answers;
            interns.push(new Intern(id, email, name, school));
            console.log(interns);
            createTeam();
        });
}

function generateHTML() {
    fs.writeFile('template.html', template(managers, engineers, interns), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function createTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuOption',
            message: 'Which type of employee would you like to add?',
            choices: ['Intern', 'Engineer', 'None']
        },
    ]).then(function (answers) {
        console.log(answers);

        switch (answers.menuOption) {
            case 'Intern':
                createIntern();
                break;
            case 'Engineer':
                createEngineer();
                break;
            default:
                console.log('nothing match')
                generateHTML();
                return;
        }
    });
}
createManager();

