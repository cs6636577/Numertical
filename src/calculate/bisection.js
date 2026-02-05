import { create, all, intersect } from 'mathjs';
const math = create(all);

export default function Bisection({Fx,Xstart,Xend,Error}){
let scope


function fx(x){
    return math.evaluate(Fx,scope);
}

let result = {
    result: {
      x: 0,
      y: 0,
      error: 0,
    },
    iterations: [],
  };

let xl = parseFloat(Xstart);
let iteration = 0
let xr = parseFloat(Xend);
let fxl,fxr,xm,fxm,findError,xmo = 0;
let error = parseFloat(Error);

    while(true){
        xm = (xl+xr)/2;
        scope = {x:xr};
        fxr = fx(xr);
        scope = {x:xm};
        fxm = fx(xm);

        if(fxm * fxr > 0){
            xr = xm;
            findError = math.abs((xr-xmo)/xr);
            xmo = xm;
        }

        else{
            xl = xm;
            findError = math.abs((xl-xmo)/xl);
            xmo = xm;
        }
        iteration++;
        result.iterations.push({
        x: xm !== undefined ? math.round(xm, 6) : null,
        y: fxm !== undefined ? math.round(fxm, 6) : null,
        error: findError !== undefined ? math.round(findError, 6) : null,
        });
        if(findError <= error){
            result.result = result.iterations[result.iterations.length-1];
            return result
        }
    }
}

