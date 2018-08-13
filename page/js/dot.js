function DotsAnimation (options) {
  const {id, width = window.innerWidth, height = window.innerHeight, arr = ['无字'], gap = 11, cr = 0, cg = 0, cb = 0
  } = options;
  const c = document.getElementById(id)
  c.style.background = '#000';
  c.width = width;
  c.height = height;
  let vpx = c.width / 2;
  let vpy = c.height / 2;
  const ctx = c.getContext('2d');
  const grap = gap;
  const speed = 0.1;
  const focalLength = 250;
  let directionFlag = false;
  let dots = [];
  let lastTime = +new Date();
  let thisTime;
  let dotRuning = true;
  let rotate = false;
  let index = 0;
  let angleX;
  let angleY;
  let timer;
  let canRotate = false;

  window.onresize = function () {
    c.width = width || window.innerWidth;
    c.height = height || window.innerHeight;
    vpx = c.width / 2;
    vpy = c.height / 2;
  }

  function drawText () {
    ctx.save();
    ctx.font = '200px 微软雅黑 bold';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(arr[index], c.width / 2, c.height / 2);
    ctx.restore();
  }

  function getImageData () {
    if (dots.length > 0) {
      ctx.clearRect(0, 0, c.width, c.height);
      drawText();
      let dotsNum = 0;
      let dotsIndex = 0;
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let x = 0; x < imageData.width; x += grap) {
        for (let y = 0; y < imageData.height; y += grap) {
          if (buffer[y * imageData.width + x]) {
            if (!dots[dotsIndex]) {
              let dot = new Dot(x, y, 0, 3);
              dots.push(dot);
            } else {
              dots[dotsIndex].dx = x;
              dots[dotsIndex].dy = y;
              dots[dotsIndex].xpos = x - c.width / 2;
              dots[dotsIndex].ypos = y - c.height / 2;
              dots[dotsIndex].zpos = 0;
            }
            dotsNum ++;
            dotsIndex ++;
          }
        }
      }
      dots.sort(function (a, b) { return a.rz - b.rz })
      dots.length = dotsNum;
    } else {
      drawText();
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let x = 0; x < imageData.width; x += grap) {
        for (let y = 0; y < imageData.height; y += grap) {
          if (buffer[y * imageData.width + x]) {
            let dot = new Dot(x, y, 0, 3);
            dots.push(dot);
          }
        }
      }
    }
    return dots;
  }

  function Dot (x, y, z, r) {
    this.rx = this.x = Math.random() * c.width;
    this.ry = this.y = Math.random() * c.height;
    this.rz = this.z = Math.random() * focalLength * 2 - focalLength;
    this.r = r * 2;
    this.dx = x;
    this.dy = y;
    this.dz = z;

    this.xpos = x - c.width / 2;
    this.ypos = y - c.height / 2;
    this.zpos = z;

    this.angle = Math.random() * 180;
    this.scale = 1;

    this.paint = function () {
      if (this.z > -focalLength) {
        const scale = focalLength / (focalLength + this.z);
        const xpos = this.x - vpx;
        const ypos = this.y - vpy;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${scale})`;
        ctx.scale(this.scale, this.scale)
        ctx.arc((vpx + xpos * scale) / this.scale, (vpy + ypos * scale) / this.scale, this.r / 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    this.step = function (direction) {
      if (dotRuning) {
        index % 2 === 0 ? this.z -= 0.5 : this.z += 0.5;
        thisTime = +new Date();
        if (thisTime - lastTime > 4000) {
          directionFlag = true;
          dotRuning = false;
        }
      } else {
        if (direction) {
          if (Math.abs(this.dx - this.x) < 0.1 && Math.abs(this.dy - this.y) < 0.1 && Math.abs(this.dz - this.z) < 0.1) {
            this.angle += 0.05;
            this.scale = this.scale + Math.sin(this.angle) * 0.01;
            this.r = r * 2;
            this.x = this.dx;
            this.y = this.dy;
            this.z = this.dz;
            canRotate = true;
            thisTime = +new Date();
            if (thisTime - lastTime > 2000) {
              directionFlag = false;
            }
          } else {
            this.x = this.x + (this.dx - this.x) * speed;
            this.y = this.y + (this.dy - this.y) * speed;
            this.z = this.z + (this.dz - this.z) * speed;
            lastTime = +new Date();
          }
        } else {
          canRotate = false;
          if (Math.abs(this.rx - this.x) < 0.1 && Math.abs(this.ry - this.y) < 0.1 && Math.abs(this.rz - this.z) < 0.1) {
            this.x = this.rx;
            this.y = this.ry;
            this.z = this.rz;
            lastTime = thisTime;
            index ++;
            if (index >= arr.length) {
              index = 0;
            }
            createDots();
            dotRuning = true;
          } else {
            this.x = this.x + (this.rx - this.x) * speed;
            this.y = this.y + (this.ry - this.y) * speed;
            this.z = this.z + (this.rz - this.z) * speed;
          }
        }
      }
    }

    this.rotateStep = function () {
      if (this.zpos > -focalLength) {
        const scale = focalLength / (focalLength + this.zpos);
        this.x = vpx + this.xpos * scale;
        this.y = vpy + this.ypos * scale;
        this.r = r * 2 * scale;
      }
      this.angle += 0.05;
      this.scale = this.scale + Math.sin(this.angle) * 0.01;
    }

    this.rotateX = function () {
      const cosx = Math.cos(angleX);
      const sinx = Math.sin(angleX);
      const y1 = this.ypos * cosx - this.zpos * sinx;
      const z1 = this.zpos * cosx + this.ypos * sinx;
      this.ypos = y1;
      this.zpos = z1;
    }

    this.rotateY = function () {
      const cosy = Math.cos(angleY);
      const siny = Math.sin(angleY);
      const x1 = this.xpos * cosy - this.zpos * siny;
      const z1 = this.zpos * cosy + this.xpos * siny;
      this.xpos = x1;
      this.zpos = z1;
    }
  }

  function createDots () {
    dots = getImageData();
  }

  function paintDots () {
    dots.forEach(v => {
      v.paint();
  })
  }

  function stepDots (direction) {
    dots.forEach(v => {
      v.step(direction);
  })
  }

  function rotateStep () {
    dots.forEach(v => {
      v.rotateX();
    v.rotateY();
    v.rotateStep();
  })
  }

  function sortZ () {
    dots.sort(function (a, b) { return b.z - a.z });
  }

  function animation () {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, c.width, c.height);
    // ctx.clearRect(0,0,c.width,c.height);
    paintDots();
    if (rotate) {
      rotateStep();
      sortZ();
    } else {
      stepDots(directionFlag);
    }
    requestAnimationFrame(animation);
  }

  createDots();
  animation();
  c.addEventListener('mousemove', function (e) {
    if (canRotate) {
      rotate = true;
      const x = e.clientX;
      const y = e.clientY;
      angleX = (y - vpy) * 0.0001;
      angleY = (x - vpx) * 0.0001;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const nx = e.clientX;
      const ny = e.clientY;
      if (nx === x && ny === y) {
        rotate = false;
      }
    }, 2000)
    }
  });
}