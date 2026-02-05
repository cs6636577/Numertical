import { create, all } from "mathjs";
const math = create(all);

export default function secant({Fx,Xstart,Error}){
    let result = {
        result:{
            x:0,
            y:0,
            error:0,
        },
        iteration:[]
    }

    const fx = (x) => math.evaluate(Fx, { x });
    const err = (xnew,xold) => Math.abs((xnew-xold)/xnew);

    let step=0,er=parseFloat(Error);
    let xold=parseFloat(Xstart),xnew,xmid=fx(xold);
    let error;

    do{
        step++;
        xnew = xmid - ((fx(xmid)*(xold-xmid))/(fx(xold)-fx(xmid)));
        error = err(xnew,xmid);
        xmid = xnew;
        console.log("iteration : ",step,"x = ",xnew.toFixed(6),"error = ",error.toFixed(6));
        result.iteration.push({
            x: xnew != undefined ? math.format(xnew, { notation: 'auto', precision: 6 }): null,
            y: fx(xnew) != undefined ? math.format(fx(xnew), { notation: 'auto', precision: 6 }): null,
            error: error != undefined ? math.format(error, { notation: 'auto', precision: 6 }): null
        });
        if (step > 100) break;
    }while(error >= er);
    result.result = result.iteration[result.iteration.length-1];
    return result;
}