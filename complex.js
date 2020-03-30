"use strict";
class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    add(obj) {
        return new Complex(this.real + obj.real, this.imaginary + obj.imaginary);
    }
    sub(obj) {
        return new Complex(this.real - obj.real, this.imaginary - obj.imaginary);
    }
    mod() {
        let real = Math.pow(this.real, 2);
        let imaginary = Math.pow(this.imaginary, 2);
        return (Math.sqrt(real + imaginary));
    }
    toString() {
        console.log('Real: ', this.real, 'Imaginary: ' + this.imaginary);
    }
}
let a = new Complex(3, 2);
let b = new Complex(8, 4);
let c = a.add(b);
c.toString();
let d = c.sub(a);
d.toString();
console.log(d.mod());
