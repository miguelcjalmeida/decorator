interface Dictionary {
    [index: string] : any
}

let bound : ClassDecorator = function(target : Function) {
    let targetPrototype : Dictionary = target.prototype;

    let newConstructor  = function(...parameters:any[]){
        target.apply(this, parameters)

        for(let prop in targetPrototype){
            let value = this[prop];

            if(typeof value == "function"){
                this[prop] = value.bind(this);  
            } 
        }
    }
    
    newConstructor.prototype = Object.create(target.prototype) 

    return newConstructor;
} 

@bound
class Person {
    constructor(public name : string, public age : number) { }

    getName () {
        return this.name
    }
}

let p1 = new Person("Miguel", 25)
let p2 = new Person("Rafael", 25)

let getNameOfMiguel = p1.getName
let getNameOfRafael = p2.getName

document.body.innerHTML += getNameOfMiguel() + getNameOfRafael() 
