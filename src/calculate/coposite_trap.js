import { create, all } from "mathjs";
const math = create(all);
import nerdamer from "nerdamer";
import "nerdamer/all";

export default function Composite_trap({N,Fx,A,B}){
    const n = parseFloat(N);
    const a = parseFloat(A);
    const b = parseFloat(B);

    function fx(x){
        return math.evaluate(Fx, {x});
    }

    const h = (b-a)/n;
    let temp = fx(a) + fx(b);
    let sum = 0;
    for(let i=1;i<n-1;i+=h){
        sum += fx(i);
    }
    
    const Ic = (h/2) * (temp + 4*sum);
    
    const integralExpr = nerdamer(`integrate(${Fx}, x)`).toString();
    const Ii = math.evaluate(integralExpr.toString(), { x: b }) - math.evaluate(integralExpr.toString(), { x: a });
    const I = Ic-Ii;

    const error = math.abs(Ic-Ii/Ic)*100;
    
    const result = {
        result: {
            Ic: math.round(Ic, 6),
            Ii: math.round(Ii, 6),
            I : math.round(I,6),
            error: math.round(error, 6),
        }
    };
    
    return result;
}

// const n =3;
// const fx = (x) => 2*x-1;
// const a = 1;
// const b = 5;
// const h = (b-a)/n;
// const temp = fx(a) + fx(b);
// let sumodd=0;
// let sumeven=0;
// for(let i=a+h;i<b-h;i+=h){
//     if(i%2 == 0){
//         sumeven += fx(i);
//     }
//     else{
//         sumodd += fx(i);
//     }
// }
// const I = (h/2) * (temp + 4*sumeven + 2*sumodd);
// console.log(I);


