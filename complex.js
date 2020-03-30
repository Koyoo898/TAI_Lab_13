var Complex = /** @class */ (function () {
    function Complex(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    Complex.prototype.add = function (obj) {
        return new Complex(this.real + obj.real, this.imaginary + obj.imaginary);
    };
    Complex.prototype.sub = function (obj) {
        return new Complex(this.real - obj.real, this.imaginary - obj.imaginary);
    };
    Complex.prototype.mod = function () {
        var real = Math.pow(this.real, 2);
        var imaginary = Math.pow(this.imaginary, 2);
        return (Math.sqrt(real + imaginary));
    };
    Complex.prototype.toString = function () {
        console.log('Real: ', this.real, 'Imaginary: ' + this.imaginary);
    };
    return Complex;
}());
var a = new Complex(3, 2);
var b = new Complex(8, 4);
var c = a.add(b);
c.toString();
var d = c.sub(a);
d.toString();
console.log(d.mod());
