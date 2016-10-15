let content = document.getElementById("content");
var ctx = content.getContext("2d");

function drawLine(ctx, x, y, color){
    ctx.beginPath();
    ctx.moveTo(x[0] * 300 + 400, x[1] * 300 + 400);
    ctx.lineTo(y[0] * 300 + 400, y[1] * 300 + 400);
    ctx.strokeStyle = color;    
    ctx.stroke();
}
   // [[1.0, 0.4891041934  , 0.4129275826   ] , -1],
function drawDot(ctx, x, y, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.rect( x, y, 5, 5);
    ctx.fill();
}

function calcPoint(x, el) {
    let y = -(el[0] / el[2]) - (x * (el[1] / el[2]));
    return y;
}


let p = perceptron(list);

var interval = setInterval(function(){
    let {value, done} = p.next();
    if (!done) {
        ctx.clearRect(0, 0, 800, 800);
        list.forEach( (el) => {
            let x = (el[0][1] * 375) + 375 - 2.5 + 25;
            let y = (el[0][2] * 375) + 375 - 2.5 + 25;

            if(el[1] > 0)
                drawDot(ctx, x, y, "orange");
            else
                drawDot(ctx, x, y, "black");

        });
        drawLine(ctx, [-2, calcPoint(-2, value)], [2, calcPoint(2, value)], "blue");
    } else {
        clearInterval(interval);
    }
}, 100);

