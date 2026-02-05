import { create, all, re } from "mathjs";
const math = create(all);

export default function OnePoint({ Fx, Xstart, Error }) {
    const fx = (x) => math.evaluate(Fx, { x });
    const er = (x,xold) => Math.abs((x-xold)/x);

    let step=0,err=parseFloat(Error);
    let xold = 0,xnew;
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
        xnew = fx(xold);
        error = er(xnew,xold);
        xold = xnew;
        console.log("iteration : ",step,"x = ",xold,"error = ",error.toFixed(6));
        result.iteration.push({
            x: xold != undefined ? math.format(xold, { notation: 'auto', precision: 6 }): null,
            y: fx(xold) != undefined ? math.format(fx(xold), { notation: 'auto', precision: 6 }): null,
            error: error != undefined ? math.format(error, { notation: 'auto', precision: 6 }): null
        });
    }while(error >= err);
    result.result = result.iteration[result.iteration.length-1];
    return result;
}