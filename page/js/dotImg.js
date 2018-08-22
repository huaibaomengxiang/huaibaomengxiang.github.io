/* eslint-disable */
function DotImg(options) {
  const { id, img, width, height, radius, gapX, gapY } = options;
  let c = document.getElementById(id);
  c.width = width || window.innerWidth;
  c.height = height || window.innerHeight;

  let vpx = c.width / 2;
  let vpy = c.height / 2
  let gapx = gapX || 2;
  let gapy = gapY || 2;
  let ctx = c.getContext('2d');

  let dots = [];
  let particleArr = [];
  let mouseRadius = radius || 50;
  let index = 0;
  let num = 100;

  let mouseX;
  let mouseY;
  let oldColor;

  window.onresize = () => {
    c.width = width || window.innerWidth;
    c.height = height || window.innerHeight;
    vpx = c.width / 2;
    vpy = c.height / 2;
  }

  function drawImg(img,dots) {
    let image = new Image();
    image.onload = () => {
      let imgX = vpx - image.width / 2;
      let imgY = vpy - image.height / 2;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(image, imgX, imgY);
      const imageData = ctx.getImageData(imgX, imgY, image.width, image.height);
      for (let x = 0; x < imageData.width; x += gapx) {
        for (let y = 0; y < imageData.height; y += gapy ) {
          let i = (y * imageData.width + x) * 4;
          if (imageData.data[i + 3] > 125) {
            let r = imageData.data[i]
            let g = imageData.data[i + 1]
            let b = imageData.data[i + 2]
            let a = imageData.data[i + 3]
            let color = `rgba(${r}, ${g}, ${b}, ${a})`;
            let rx = x + Math.random() * 20;
            let ry = y - Math.random() * 40 -20;
            let vx = -Math.random() * 200 + 400;
            let vy = ry < imgY + image.height / 2 ? Math.random() * 300 : -Math.random() * 300;
            let dot = new Dot(rx + imgX, ry + imgY, x + imgX, y + imgY, vx, vy, color);
            dots.push(dot);
          }
        }
      }
    }
    image.src = img;

  }

  function Dot(x, y, dx, dy, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.vx = vx;
    this.vy = vy;
    this.width = gapX;
    this.height = gapY;
    this.a = 1500;
    this.color = color;
    this.stop = false;

    this.maxCheckTimes = 10;
    this.checkLength = 5;
    this.checkTimes = 0;

    this.paint = function () {
      if (this.color !== oldColor) {
        oldColor = this.color;
        ctx.fillStyle = oldColor;
      }
      ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    this.step = function () {
      if (!this.stop) {
        let angle = Math.atan((this.dy - this.y) / (this.dx - this.x));
        let tickTime = 16 / 1000;
        let ax = Math.abs(this.a * Math.cos(angle));
        ax = this.x > this.dx ? -ax : ax
        var ay = Math.abs(this.a * Math.sin(angle));
        ay = this.y > this.dy ? -ay : ay;
        this.vx += ax * tickTime;
        this.vy += ay * tickTime;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.x += this.vx * tickTime;
        this.y += this.vy * tickTime;
        if (Math.abs(this.x - this.dx) <= this.checkLength && Math.abs(this.y - this.dy) <= this.checkLength) {
          this.checkTimes++;
          if (this.checkTimes >= this.maxCheckTimes) {
            this.stop = true;
          }
        } else {
          this.checkTimes = 0
        }
      } else {
        this.x = this.dx;
        this.y = this.dy;
      }
    }

    this.joinMouse = function () {
      if (!mouseX) {x
        this.goback();
        return;
      }
      let distance = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2));
      let angle = Math.atan((mouseY - this.y) / (mouseX - this.x));
      if (distance < mouseRadius) {
        this.stop = false;
        this.checkTimes = 0;
        if (!this.recordX) {
          this.recordX = this.dx;
          this.recordY = this.dy;
        }
        this.a = 2000 + 1000 * (1 - distance / mouseRadius);
        var xc = Math.abs((mouseRadius - distance) * Math.cos(angle));
        var yc = Math.abs((mouseRadius - distance) * Math.sin(angle));
        xc = mouseX > this.x ? -xc : xc;
        yc = mouseY > this.y ? -yc : yc;
        this.dx = this.x + xc;
        this.dy = this.y + yc;
      } else {
        this.goback()
      }
    }

    this.goback = function () {
      if (this.recordX) {
        this.stop = false;
        this.checkTimes = 0;
        this.a = 1500;
        this.dx = this.recordX;
        this.dy = this.recordY;
        this.recordX = null;
        this.recordY = null;
      }
    }

  }

  function creatDots() {
    if (particleArr.length < dots.length) {
      let end = index + num;
      if (index + num > dots.length - 1) {
        end = dots.length - 1;
      }
      particleArr = particleArr.concat(dots.slice(index, end));
      index += num;
    }
  }

  function paintDots() {
    particleArr.forEach(v => {
      v.paint();
    v.step();
    v.joinMouse();
  })
  }

  var stats = new Stats();
  stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  function animate() {
    stats.begin();
    ctx.clearRect(0, 0, c.width, c.height);
    creatDots();
    paintDots();
    stats.end();
    requestAnimationFrame(animate);
  }

  drawImg(img, dots);
  dots.sort(function(a, b) {
    return a.dx - b.dx;
  });
  animate();

  c.addEventListener('mousemove', function (e) {
    mouseX = e.clientX - c.offsetLeft;
    mouseY = e.clientY - c.offsetTop;
  })
}