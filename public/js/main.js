document.addEventListener('DOMContentLoaded', function () {

    const canvas = document.getElementById('canvas')
    const c = canvas.getContext('2d')
    const width = canvas.width;
    const height = canvas.height;

    const options = {
        countPoints: 100,
        vacDelt: 1,
        sPointR: 1,
        colorFill: '#3F3FBF',
        colorStrok: '#0000ff',
        lineWidth: 0.1,
        linePad: 50,
        time: {
            createNewPoint: 50 // милисекунды
        },
        text: "14px Avenir, Helvetica",
        textOp: {
            life: 1000,
            temeCreate: 750 // милисекунды
        }
    }

    const points = []
    const textArr = []
    const TEXT = [
        'землеустрій',
        'геодезія',
        'кадастр',
        'нерухомість',
        'дирекційник кут',
        'GPS',
        'внутрішній кут',
        'проєкт',
        'документація',
        '.xml',
        '.dxf',
        '.dwg',
        'розрахунок',
        'грунтові обстеження',
        'камеральні роботи',
        'план',
        'договір',
        'угода',
        'вектор',
        'теодоліт',
        'тахеомерт',
        'ДГМ',
        'МСК-48',
        'СК63'
    ]

    function init() {
        c.lineWidth = options.lineWidth
        c.strokeStyle = options.colorStrok
        c.fillStyle = options.colorFill
        c.font = options.text;
        c.textAlign = "center";
        c.textAlign = "middle";
        for (let i = 0; i < options.countPoints; i++) {
            points.push(creatPoint())
        }
        points.forEach( p => drowPoint(p))
    }
    init()

    function createText() {
        return {
            t: TEXT[Math.floor(TEXT.length * Math.random())],
            x: +(Math.random() * width).toFixed(0),
            y: +(Math.random() * height).toFixed(0),
            vecx: getVec(+(Math.random() * options.vacDelt).toFixed(0))/2,
            vecy: getVec(+(Math.random() * options.vacDelt).toFixed(0))/2,
            rad: options.sPointR,
            life: options.textOp.life
        }
    }

    function creatPoint() {
        return {
            x: +(Math.random() * width).toFixed(0),
            y: +(Math.random() * height).toFixed(0),
            vecx: getVec(+(Math.random() * options.vacDelt).toFixed(0))/3,
            vecy: getVec(+(Math.random() * options.vacDelt).toFixed(0))/3,
            rad: options.sPointR,
        }
    }
    function drowText(obj) {
        c.save();
        c.fillStyle = '#0000ff'
        c.fillText(obj.t, obj.x += obj.vecx, obj.y += obj.vecy);
        c.restore();
    }
    function drowPoint(obj) {
        c.beginPath();
        c.arc(obj.x, obj.y, obj.rad, 0, 2 * Math.PI);
        obj.x += obj.vecx;
        obj.y += obj.vecy;
        c.fill();
    }
    function getVec(n) {
        if (n == 0) {
            n +=0.5
        }
        if (n > options.vacDelt/2) {
            return -n;
        }
        return n;
    }
    function getLine(c, c1) {
        return Math.sqrt( ((c1.x - c.x) * (c1.x - c.x)) + ((c1.y - c.y) * (c1.y - c.y)) ).toFixed(0)

    }

    function pointControl() {

        points.forEach( (p , i, arr) => {
            if(p.x > width || p.x < 0) {
                arr.splice(i, 1)
                return
            }
            if(p.y > height || p.y < 0) {
                arr.splice(i, 1)
                return
            }

            let center = getLine(p , {
                x: width/2,
                y: height/2
            })
            if(center < 250 && p.rad < 2) {
                p.rad += 0.05
            } else {
                if (p.rad - 0.05 > 1){
                    p.rad -= 0.1
                }
            }

            points.forEach(a => {
                let line = getLine(p, a)
                if (line < options.linePad) {
                    c.beginPath()
                    c.moveTo(p.x, p.y)
                    c.lineTo(a.x, a.y)
                    c.stroke()
                }
            })


            drowPoint(p)
        })
    }

    function textControl() {
        textArr.forEach( (p , i, arr) => {
            if(p.x > width-100 || p.x < 100) {
                arr.splice(i, 1)
                return
            }
            if(p.y > height-50 || p.y < 50) {
                arr.splice(i, 1)
                return
            }


            p.life--;
            if (p.life <= 0) {
                arr.splice(i, 1)
                return
            }

            drowText(p)
        })
    }


    function Drow() {
        c.clearRect(0, 0, width, height)
        textControl()
        pointControl()
        window.requestAnimationFrame(Drow)
    }

    setInterval(function () {
        if (points.length < 150) points.push(creatPoint())
    }, options.time.createNewPoint)

    setInterval(function () {
        if(textArr.length <= 15) textArr.push(createText())
    }, options.textOp.temeCreate)

    Drow()

})