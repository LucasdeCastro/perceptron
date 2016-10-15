const sign = (x) => { return x > 0 ? 1 : -1; };

const loop = (list, vls) => {
    for(let [el, y] of list){
        let sum = 0;
        for(let i in el){
            sum += vls[i] * el[i];
        }

        let p = sign(sum);
        if(y !== p){
            for(let i in vls)
                vls[i] = vls[i] + (y * el[i]);
            return false;
        }
    }
    return true;
};

const perceptron = function* (list){
    let vls = [0, Math.random(), Math.random()];

    yield vls;
    while(!loop(list, vls)){
        yield vls;
    }
    yield vls;
};


const doubleIn = (a, b) => Math.random() * Math.abs(b - a) + a;

const zipWith = function*(f, xs, ys) {
  for (let i = 0; i < xs.length && i < ys.length; i++) {
    yield f(xs[i], ys[i]);
  }
};

const dot = (xs, ys) => {
  let sum = 0;
  for (let z of zipWith((x, y) => x * y, xs, ys))
    sum += z;
  return z;
};

const generateTestData = function(n) {
    const x1 = doubleIn(-1, 1);
    const x2 = doubleIn(-1, 1);
    const y1 = doubleIn(-1, 1);
    const y2 = doubleIn(-1, 1);
    const ws = [x2 * y1 - x1 * y2, y2-y1, x2-x1];

    let list = [];

    for (let i = 0; i < n; i++) {
        const x = doubleIn(-1, 1);
        const y = doubleIn(-1, 1);
        const v = [1, x, y];
        list.push([v, sign(dot(ws, v))]);
    }
    return list;
};

let list = generateTestData(100000);
