const Employee = require('./Employee');

class Intern extends Employee {
    constructor(id, email, name, school) {
        super(id, email, name);
        this.school = school;

    }
    getRole() {
        return 'Intern'
    }
    getSchool() {
        return this.school
    }
}

module.exports = Intern;