import 'reflect-metadata'

// const plane ={
//     color:'red'
// }
// Reflect.defineMetadata('note', 'Note about plane',plane);
// Reflect.defineMetadata('height', 10,plane);
// console.log(plane);

// const note = Reflect.getMetadata('note', plane);
// console.log(note);

// const height = Reflect.getMetadata('height', plane);
// console.log(height);

// Reflect.defineMetadata('note', 'note about plane color', plane, 'color');
// const note = Reflect.getMetadata('note', plane, 'color');
// console.log(note);

@printMetadata
class Plane{
    color:string = 'red';

    @markFunction('this is the secret')
    fly():void{
        console.log('vroum vroum')
    }
}
function markFunction(secretInfo: string){
    return function (target: Plane, key:string){
        Reflect.defineMetadata('secret', secretInfo, target, key);
    }
}
function printMetadata(target: typeof Plane){
    for(let i in target.prototype){
        const secret1 = Reflect.getMetadata('secret',target.prototype, i);
        console.log(secret1);
    }
}

/* const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret);  */

