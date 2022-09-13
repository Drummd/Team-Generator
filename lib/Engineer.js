const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(id, email, name, github) {
        super(id, email, name);
        this.github = github;

    }
    getRole() {
        return 'Engineer'
    }
    getGitHub() {
        return this.github
    }
}

module.exports = Engineer;