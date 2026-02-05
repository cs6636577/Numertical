import { create, all } from "mathjs";
const math = create(all);


export default function NewtonRap({Fx, Xstart, Error}){
    const fx = (x) => math.evaluate(Fx, { x });
    const dfx = (x) => math.derivative(Fx, 'x').evaluate({ x });
    const err = (xnew, xold) => xnew !== 0 ? Math.abs((xnew - xold)/xnew) : Infinity;

    let step=0,er=parseFloat(Error);
    let xold=parseFloat(Xstart),xnew;
    let error;

    let result = {
        result: {
            x: 0,
            y: 0,
            error: 0,
        },
        iteration: []
    }

    do{
        step++;
        xnew = xold - fx(xold)/dfx(xold);
        error = err(xnew,xold);
        xold = xnew;
        console.log("iteration : ",step,"x = ",xold.toFixed(6),"error = ",error.toFixed(6));
        result.iteration.push({
            x: xold != undefined ? math.format(xold, { notation: 'auto', precision: 6 }): null,
            y: fx(xold) != undefined ? math.format(fx(xold), { notation: 'auto', precision: 6 }): null,
            error: error != undefined ? math.format(error, { notation: 'auto', precision: 6 }): null
        });
        if (step > 100) break;
    }while(error >= er);
    result.result = result.iteration[result.iteration.length-1];
    return result;
}