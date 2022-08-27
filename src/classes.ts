// Classes

abstract class Department {
    static fiscalYear = new Date().getFullYear()
    name: string;
    protected employees: string[] =  [] //Private limits access to inside class only
    
    //Shorthand initialization of id property, readonly makes sure id doesn't change after new object initializes
    constructor(private readonly id: string, _name: string) { 
        this.name = _name
    }

    //Static method
    static createEmployee(name: string) {
        return {name: name}
    }

    //Abstract
    abstract log(message : string): void

    describe(this: Department) { //Add extra type safety to catch unwanted behaviors
        //console.log(`Department Code: ${this.id}, Name: ${this.name}`)
    }

    addEmployee(employee: string) {
        //this.id = "DEPA" Cannot initialize id as it's readonly
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log('Number Of Employees: ',this.employees.length)
        console.log(this.employees)
    }
}


//INHERITANCE: One can only inherit from one class
class ITDepartment extends Department {
    admins: string[]
    constructor(id: string, admins: string[]) {
        //This forwards id and department name to the base constructor
        super(id, "IT Department") 
        //This is called after key word super
        this.admins  = admins
    }

    log(message: string) {
        console.log(message)
    }
}

//Singleton Pattern & Private Constructors
// This class cannot be isntatiated
class AccountingDepartment extends Department {
    
    // How do we access private constructors?
    // 1. Create private instance
    private static instance: AccountingDepartment

    // 2. Mark the constructor as private
    //Ensures you can't call new AccountingDepartment
    private constructor(id: string, private reports: string[]) {
        super(id , 'Accounting')
    }


    log(message: string) {
        console.log(message)
    }

    //3. Get instance
    static getInstance() {
        // Smae as AccountingDepartment.instance
        if(this.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment("ACCOUNTING", ['YEAR_2023'])
        return this.instance
    }
    
}

class AuditDeparment extends Department {

    private lastReport: string

    get mostRecentReport() {
        if(this.lastReport){
            return this.lastReport
        }
        throw new Error("No report found");
        
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error("Please pass in a value")
        } else {
            this.addReports(value)
        }
      
    }

    log(message: string) {
        console.log(message)
    }

    employees: string[] = []
    constructor(id: string, private reports: string[]){
        super(id, "Audit")
        this.lastReport = reports[0]
    }

    //Overriding
    addEmployee(name: string)  {
        if(name === 'Michael'){
            return;
        } else {
            this.employees.push(name)
        }
        
    }

    addReports(text: string) {
        this.reports.push(text)
        this.lastReport = text
    }

    getReports() {
        console.log(this.reports)
    }
}

const auditDepartment = new AuditDeparment("AUD", [])
auditDepartment.addEmployee("Michael")
auditDepartment.addEmployee("Cherera")

auditDepartment.addReports("YEAR_2022.pdf")

//Setter
auditDepartment.mostRecentReport = "YEAR_2023.pdf"

//Getter
console.log("Most recent report", auditDepartment.mostRecentReport)

//Static method
const employee1 = Department.createEmployee("John")
console.log("New department emplyee: ", employee1)

//Static property
console.log(Department.fiscalYear)

auditDepartment.describe()
auditDepartment.printEmployeeInformation()
auditDepartment.getReports()

const itDepartment = new ITDepartment("IT001", ['MICHAEL'])
itDepartment.addEmployee("Joan")
itDepartment.addEmployee("Kimani")

itDepartment.describe()
itDepartment.printEmployeeInformation()

const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()
console.log(accounting, accounting2)

// Abstract forces the class to be inherited and CANNOT be instantiated
//const accounting = new Department("ACC", "Accounting");

// accounting.addEmployee("Naomi");
// accounting.addEmployee('Sheila');

// This should be avoided by adding private keyword to employees property
//accounting.employees[2] = 'Anna' 

// accounting.describe()
// accounting.printEmployeeInformation()

//Without this: Department on the method it compiles to an error as accounting Copy is a dummy object without the 'this' scope
//const accountingCopy = {name: 'Legal', describe: accounting.describe} 
//accountingCopy.describe()