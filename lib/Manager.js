// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

class Manager extends Employee{
    constructor(name,id,email,officeNumber){
        //call the constructor of the extends class
        super(name,id,email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;