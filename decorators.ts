@classDecorator
class Boat {
    @testDecorator
    color: string = 'red';


    @testDecorator
    get formattedColor(): string {
        return `The color of this boat is ${this.color}`;
    }
    //@testDecorator
    
    @logError('Oops boat sank!')
    pilot(@parameterDecorator speed:string, @parameterDecorator isOld:boolean): void {
        if(speed ==='fast')
        {
            throw new Error();
            console.log('swish');
        }
        else {
            console.log('nothing');
        }
    }
}
function classDecorator(constructor:typeof Boat){
    console.log(constructor);
}
function parameterDecorator(target:any, key:string, index: number): void{
    console.log('target: ' + target);
    console.log('key: ' + key);
    console.log('index: ' + index);
}
function testDecorator(target: any, key: string): void {
    console.log('target: ' + target);
    console.log('key: ' + key);
    console.log(target.color);
}
//@testDecorator=testDecorator(Boat.prototype, 'pilot');
function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        console.log('Target: ' + target);
        console.log('Key: ' + key);
        const method = desc.value;
        desc.value = function () {
            try {
                method();
            }
            catch (e) {
                console.log(errorMessage);
            }
        }
    }
}

//new Boat().pilot('fast');