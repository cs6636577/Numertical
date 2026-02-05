import { create, all } from "mathjs";
const math = create(all);

export default function Graphical({ Fx, Xstart, Xend, Error }) {
  let scpoe;
  function fx(x) {
    return math.evaluate(Fx, scpoe);
  }

  let error;
  let x1 = parseFloat(Xstart);
  let xend = parseFloat(Xend);
  scpoe = { x: x1 };
  let y = fx(x1);
  let yold = 0;
  let step = 1;
  let iteration = 0;
  let xold;

  let result = {
    result: {
      x: 0,
      y: 0,
      error: 0,
    },
    iterations: [],
  };

  do {
    xold = x1;
    scpoe = { x: x1 };
    y = fx(x1);

    if (yold * y < 0) {
      x1 -= step;
      step /= 10;
      scpoe = { x: x1 };
      y = fx(x1);
    }

    x1 += step;
    error = math.abs(y);
    yold = y;
    iteration++;

    result.iterations.push({x:math.round(x1,6), y:math.round(y,6), error:math.round(error,6)});

    if (x1 > xend) {
      break;
    }

  } while (error > Error && x1 < xend);

  result.result = result.iterations[result.iterations.length-1];
  return result;
}