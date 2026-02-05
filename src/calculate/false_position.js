import { create, all, intersect } from 'mathjs';
const math = create(all);


export default function FalsePosition({ Fx, Xstart, Xend, Error }){
    const fx = (x) => math.evaluate(Fx,{ x });
    const findx1 = (xl,xr,fxl,fxr) => (xl*fxr-xr*fxl)/(fxr-fxl);
    const fe = (x1old,x1) => Math.abs((x1-x1old) / x1)*100;

    let result = {
        result:{
            x:0,
            y:0,
            error:0,
        },
        iteration: []
    };

    let xl = parseFloat(Xstart), xr = parseFloat(Xend);
    let er = parseFloat(Error);
    let fxl = fx(xl), fxr = fx(xr);
    let x1 = findx1(xl,xr,fxl,fxr), x1old = x1;
    let fx1 = fx(x1);
    let error,step=0;

    if(fx1 * fxr >= 0){
        xr = x1;
    }
    else{
        xl = x1;
    }

    do{
        step++;
        x1old = x1;
        fxl = fx(xl);
        fxr = fx(xr);
        x1 = findx1(xl,xr,fxl,fxr);
        fx1 = fx(x1);
        
        if(fx1 * fxr >= 0){
            xr = x1;
        }
        else{
            xl = x1;
        }
        error = fe(x1,x1old);
        console.log("iteration : ", step, "x1 : ", x1.toFixed(6), "error : ", error.toFixed(6)," %");
        result.iteration.push({
            x: x1 != undefined ? math.round(x1, 6): null,
            y: fx1 != undefined ? math.round(fx1, 6): null,
            error: error != undefined ? math.round(error,6): null
        });
    }while(error >= er);

    result.result = result.iteration[result.iteration.length-1];
    return result;
}