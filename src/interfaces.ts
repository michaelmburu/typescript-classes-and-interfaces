// Interfaces

interface Greetable {
    //Interfaces can only have readonly properties
    readonly name: string

    greet(phrase: string): void
}

//Typecheck an object
let user1: Greetable

user1 = {
    name: 'Michael',
    //age: 33,
    greet(phrase: string) {
        console.log(phrase + ', ' + this.name)
    }
};

user1.greet("Niaje")
 //user1.name = "Joy" Error becaise name is readonly
console.log(user1)
//Adhere a class to an interface. Can inherit multiple interfaces
class Person implements Greetable, Named {
    name: string;
    age = 30
    career: string
    workHours?: number
    constructor(n: string, c: string, w?: number) {
        this.name = n
        this.career = c
        if(w) {
            this.workHours = w
        }
    }

    greet(phrase: string): void {
        console.log("From class", phrase)
    }
}

const user2 = new Person("Van Helsing", "Vampire Hunter")

user2.age = 40
user2.greet("I am VanHelsing")
console.log(user2)


// Inheritance & optional properties using ?
interface Named {
    readonly career: string
    workHours?: number
}

// Interfaces as Function Types
//Using types
//type AddFn = (a: number, b: number) => number

//Using interfaces to define functions
interface IaddFn {
    (a: number, b: number) : number
}

let add: IaddFn
add = (n1, n2) => {
    return n1 + n2
}

