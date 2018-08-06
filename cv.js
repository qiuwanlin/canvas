var cv = document.getElementById('cv')
var context = cv.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(cv) //设定画布大小
listenuser(cv) //绘画事件

var eraserEnabled = false //用于切换画笔橡皮

pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,cv.clientWidth,cv.height)
}
download.onclick = function(){
    var url = cv.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url;a.download='我的画';a.target = '_blank'
    a.click()
}
black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = '#ff6464'
    context.fillStyle= '#ff6464'
    red.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = '#7878ff'
    context.fillStyle="#7878ff"
    red.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}


//工具函数
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    //context.rect(x,y,lineWidth,lineWidth)
    context.fill()
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black'
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth // 线的粗细大小
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenuser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {
        //触屏设备,进行特性检测
        canvas.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {"x": x,"y": y}
                drawCircle(lastPoint.x, lastPoint.y,lineWidth-2)
            }
        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            using = true
            var x = aaa.clientX
            var y = aaa.clientY
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {"x": x,"y": y}
                drawCircle(lastPoint.x, lastPoint.y,lineWidth-2)
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}