var ge1doot=ge1doot||{};ge1doot.screen={};ge1doot.screen.InitEvents=function(a){this.setup=a;this.container=document.getElementById(a.container);this.mouseX=0;this.mouseY=0;this.left=0;this.top=0;this.height=0;this.width=0;this.dragX=0;this.dragY=0;this.startX=0;this.startY=0;this.drag=false;this.moved=false;this.down=false;this.cxb=0;this.cyb=0;this.running=true;this.canvas=false;this.ctx=false;if(a.click){this.container.onclick=function(){return false}}if(a.canvas){this.canvas=document.getElementById(a.canvas);this.ctx=this.canvas.getContext("2d")}var b=this;window.addEventListener("resize",function(){b.resize()},false);this.resize();this.container.ontouchstart=this.container.onmousedown=function(c){if(!b.running){return true}if(b.canvas){if(c.target!==b.canvas){return}}else{if(c.target!==b.container){return}}c.preventDefault();if(b.container.setCapture){b.container.setCapture()}b.drag=false;b.moved=false;b.down=true;b.startX=(c.clientX!==undefined?c.clientX:c.touches[0].clientX)-b.left;b.startY=(c.clientY!==undefined?c.clientY:c.touches[0].clientY)-b.top;b.setup.down&&b.setup.down();return false};this.container.ontouchmove=this.container.onmousemove=function(c){if(!b.running){return true}c.preventDefault();b.mouseX=(c.clientX!==undefined?c.clientX:c.touches[0].clientX)-b.left;b.mouseY=(c.clientY!==undefined?c.clientY:c.touches[0].clientY)-b.top;if(b.down){b.dragX=b.cxb+(b.mouseX-b.startX);b.dragY=b.cyb-(b.mouseY-b.startY)}if(Math.abs(b.mouseX-b.startX)>10||Math.abs(b.mouseY-b.startY)>10){b.moved=true;if(b.down){b.drag=true}}b.setup.move&&b.setup.move()};this.container.ontouchend=this.container.onmouseup=function(c){if(!b.running){return true}c.preventDefault();if(b.container.releaseCapture){b.container.releaseCapture()}b.cxb=b.dragX;b.cyb=b.dragY;if(!b.moved){b.mouseX=b.startX;b.mouseY=b.startY;b.setup.click&&b.setup.click()}else{b.setup.up&&b.setup.up()}b.drag=false;b.down=false;b.moved=false};this.container.ontouchcancel=function(c){if(!b.running){return true}if(b.container.releaseCapture){b.container.releaseCapture()}b.drag=false;b.moved=false;b.down=false;b.cxb=b.dragX;b.cyb=b.dragY;b.startX=0;b.startY=0}};ge1doot.screen.InitEvents.prototype.resize=function(){this.width=this.container.offsetWidth;this.height=this.container.offsetHeight;var a=this.container;for(this.left=0,this.top=0;a!=null;a=a.offsetParent){this.left+=a.offsetLeft;this.top+=a.offsetTop}if(this.canvas){this.canvas.width=this.width;this.canvas.height=this.height}};"use strict";var ge1doot=ge1doot||{};ge1doot.tweens={first:false,prev:false,iterate:function(){var a=this.first;do{a.ease()}while(a=a.next)}};ge1doot.tweens.Add=function(b,c,d,a){this.target=d||0;this.value=c||0;this.steps=b;this.isAngle=a||false;this.speedMod=1;if(a){this.normalizePI=function(){if(Math.abs(this.target-this.value)>Math.PI){if(this.target<this.value){this.value-=2*Math.PI}else{this.value+=2*Math.PI}}}}this.setTarget(this.target);if(!ge1doot.tweens.first){ge1doot.tweens.first=this}else{ge1doot.tweens.prev.next=this}ge1doot.tweens.prev=this};ge1doot.tweens.Add.prototype.setTarget=function(b,a){this.speedMod=(a)?a:1;this.target=b;if(this.isAngle){this.target=this.target%(2*Math.PI);this.normalizePI()}if(this.running&&this.oldTarget===b){return}this.oldTarget=b;this.running=true;this.prog=0;this.from=this.value;this.dist=-(this.target-this.from)*0.5};ge1doot.tweens.Add.prototype.ease=function(){if(!this.running){return}var a=this.speedMod*this.steps;if(this.prog++<a){this.value=this.dist*(Math.cos(Math.PI*(this.prog/a))-1)+this.from;if(this.isAngle){this.normalizePI()}}else{this.running=false;this.value=this.target}};"use strict";var ge1doot=ge1doot||{};ge1doot.textureMapping={};ge1doot.textureMapping.Triangle=function(a,d,c,b){this.p0=d;this.p1=c;this.p2=b;this.next=false;this.d=d.tx*(b.ty-c.ty)-c.tx*b.ty+b.tx*c.ty+(c.tx-b.tx)*d.ty;this.pmy=c.ty-b.ty;this.pmx=c.tx-b.tx;this.pxy=b.tx*c.ty-c.tx*b.ty;if(!a.firstTriangle){a.firstTriangle=this}else{a.prev.next=this}a.prev=this};ge1doot.textureMapping.Image=function(b,c,a){this.canvas=b;this.ctx=b.getContext("2d");this.texture=new Image();this.texture.src=c;this.lev=a;this.isLoading=true;this.firstPoint=false;this.firstTriangle=false;this.prev=false};ge1doot.textureMapping.Image.prototype.loading=function(){if(this.texture.complete&&this.texture.width){this.isLoading=false;var g=[];for(var f=0;f<=this.lev;f++){for(var d=0;d<=this.lev;d++){var b=(f*(this.texture.width/this.lev));var a=(d*(this.texture.height/this.lev));var h={tx:b,ty:a,nx:b/this.texture.width,ny:a/this.texture.height,next:false};g.push(h);if(!this.firstPoint){this.firstPoint=h}else{this.prev.next=h}this.prev=h}}var c=this.lev+1;for(var f=0;f<this.lev;f++){for(var d=0;d<this.lev;d++){var e=new ge1doot.textureMapping.Triangle(this,g[d+f*c],g[d+f*c+1],g[d+(f+1)*c]);var e=new ge1doot.textureMapping.Triangle(this,g[d+(f+1)*c+1],g[d+(f+1)*c],g[d+f*c+1])}}}};ge1doot.textureMapping.Image.prototype.draw3D=function(r,m,l,i){if(this.isLoading){this.loading()}else{var a=this.firstPoint;do{var k=r.X+a.ny*(i.X-r.X);var g=r.Y+a.ny*(i.Y-r.Y);a.px=(k+a.nx*(m.X+a.ny*(l.X-m.X)-k));a.py=(g+a.nx*(m.Y+a.ny*(l.Y-m.Y)-g))}while(a=a.next);var j=this.canvas.width;var c=this.canvas.height;var q=this.firstTriangle;do{var r=q.p0;var m=q.p1;var l=q.p2;var o=(r.px+m.px+l.px)/3;var e=(r.py+m.py+l.py)/3;var b=true;if(o<0||o>j||e<0||e>c){if(Math.max(r.px,m.px,l.px)<0||Math.min(r.px,m.px,l.px)>j||Math.max(r.py,m.py,l.py)<0||Math.min(r.py,m.py,l.py)>c){b=false}}if(b){this.ctx.save();this.ctx.beginPath();var s,n,f;s=o-r.px;n=e-r.py;f=Math.max(Math.abs(s),Math.abs(n));this.ctx.moveTo(r.px-2*(s/f),r.py-2*(n/f));s=o-m.px;n=e-m.py;f=Math.max(Math.abs(s),Math.abs(n));this.ctx.lineTo(m.px-2*(s/f),m.py-2*(n/f));s=o-l.px;n=e-l.py;f=Math.max(Math.abs(s),Math.abs(n));this.ctx.lineTo(l.px-2*(s/f),l.py-2*(n/f));this.ctx.closePath();this.ctx.clip();this.ctx.transform(-(r.ty*(l.px-m.px)-m.ty*l.px+l.ty*m.px+q.pmy*r.px)/q.d,(m.ty*l.py+r.ty*(m.py-l.py)-l.ty*m.py-q.pmy*r.py)/q.d,(r.tx*(l.px-m.px)-m.tx*l.px+l.tx*m.px+q.pmx*r.px)/q.d,-(m.tx*l.py+r.tx*(m.py-l.py)-l.tx*m.py-q.pmx*r.py)/q.d,(r.tx*(l.ty*m.px-m.ty*l.px)+r.ty*(m.tx*l.px-l.tx*m.px)+q.pxy*r.px)/q.d,(r.tx*(l.ty*m.py-m.ty*l.py)+r.ty*(m.tx*l.py-l.tx*m.py)+q.pxy*r.py)/q.d);this.ctx.drawImage(this.texture,0,0);this.ctx.restore()}}while(q=q.next)}};ge1doot.textureMapping.Image.prototype.pointInTriangle=function(m,s,g,e,b){var f=b.X-g.X;var c=b.Y-g.Y;var j=e.X-g.X;var i=e.Y-g.Y;var r=m-g.X;var p=s-g.Y;var q=f*f+c*c;var o=f*j+c*i;var n=f*r+c*p;var d=j*j+i*i;var a=j*r+i*p;var h=1/(q*d-o*o);var l=(d*n-o*a)*h;var k=(q*a-o*n)*h;return(l>=0)&&(k>=0)&&(l+k<1)};ge1doot.textureMapping.Image.prototype.pointerInside=function(e,a,f,d,c,b){if(this.pointInTriangle(e,a,f,d,c)||this.pointInTriangle(e,a,f,c,b)){return true}else{return false}};var room3D=(function(){var b=[];var j,k,e,l;var f=0,d=0;var g=ge1doot.tweens;var i={x:new g.Add(100),y:new g.Add(100),z:new g.Add(100,0,0),rx:new g.Add(100,0,0,true),ry:new g.Add(100,0,0,true),zoom:new g.Add(100,0.1,1),focalLength:500,centered:false,cosX:0,cosY:0,sinX:0,sinY:0,setTarget:function(p){this.x.setTarget(p.pc.x);this.y.setTarget(p.pc.y);this.z.setTarget(p.pc.z);this.rx.setTarget((Math.PI*0.5)-p.ax-f);this.ry.setTarget((Math.PI*0.5)-p.ay-d);this.zoom.setTarget(p.f.zoom?p.f.zoom:2);this.centered=false},center:function(){this.x.setTarget(0);this.y.setTarget(0);this.z.setTarget(0);this.zoom.setTarget(1);this.centered=true},move:function(){g.iterate();f+=(((-j.dragY*0.01)-f)*0.1);d+=(((-j.dragX*0.01)-d)*0.1);if(!this.centered&&j.drag){this.center();e=false}this.cosX=Math.cos(this.rx.value+f);this.sinX=Math.sin(this.rx.value+f);this.cosY=Math.cos(this.ry.value+d);this.sinY=Math.sin(this.ry.value+d)},rotate:function(p,r,q){return{x:this.cosY*p-this.sinY*q,y:this.sinX*(this.cosY*q+this.sinY*p)+this.cosX*r,z:this.cosX*(this.cosY*q+this.sinY*p)-this.sinX*r}}};var h=function(q,p,r){this.face=q;this.x=p[0];this.y=p[1];this.z=p[2];this.scale=0;this.X=0;this.Y=0;if(r){this.x+=r.x;this.y+=r.y;this.z+=r.z}return this};h.prototype.projection=function(){var q=i.rotate(this.x-i.x.value,this.y-i.y.value,this.z-i.z.value);if(this.face){var r=q.z+i.focalLength;var s=Math.sqrt(q.x*q.x+q.y*q.y+r*r);if(s>this.face.distance){this.face.distance=s}}this.scale=(i.focalLength/(q.z+i.focalLength))*i.zoom.value;this.X=(j.width*0.5)+(q.x*this.scale);this.Y=(j.height*0.5)+(q.y*this.scale)};var o=function(y,x){this.f=x;var p=x.w*0.5;var s=x.h*0.5;var v=x.rx*Math.PI*0.5;var u=x.ry*Math.PI*0.5;this.locked=false;this.hidden=x.hidden||null;this.visible=true;this.distance=0;this.pc=new h(this,[x.x,x.y,x.z]);var q=function(w,E,C,B,A){var D=C*Math.cos(A)+w*Math.sin(A);var r=E*Math.cos(B)+D*Math.sin(B);return{x:w*Math.cos(A)-C*Math.sin(A),y:r,z:D*Math.cos(B)-E*Math.sin(B)}};this.p0=new h(this,[x.x,x.y,x.z],q(-p,-s,0,v,u));this.p1=new h(this,[x.x,x.y,x.z],q(p,-s,0,v,u));this.p2=new h(this,[x.x,x.y,x.z],q(p,s,0,v,u));this.p3=new h(this,[x.x,x.y,x.z],q(-p,s,0,v,u));this.c0=new h(false,[x.x,x.y,x.z],q(-p,-s,-15,v,u));this.c1=new h(false,[x.x,x.y,x.z],q(p,-s,-15,v,u));this.c2=new h(false,[x.x,x.y,x.z],q(p,s,-15,v,u));this.c3=new h(false,[x.x,x.y,x.z],q(-p,s,-15,v,u));var t=q(v,u,0,v,u,0);this.ax=t.x+Math.PI/2;this.ay=t.y+Math.PI/2;this.img=new ge1doot.textureMapping.Image(j.canvas,y+x.src,x.tl||2)};o.prototype.projection=function(){this.visible=true;this.distance=-99999;this.p0.projection();this.p1.projection();this.p2.projection();this.p3.projection();if(!(((this.p1.Y-this.p0.Y)/(this.p1.X-this.p0.X)-(this.p2.Y-this.p0.Y)/(this.p2.X-this.p0.X)<0)^(this.p0.X<=this.p1.X==this.p0.X>this.p2.X))||this.hidden){this.distance=-99999;if(!this.locked&&this.hidden===false){this.hidden=true}}};o.prototype.border=function(){this.c0.projection();this.c1.projection();this.c2.projection();this.c3.projection();this.pc.projection();j.ctx.beginPath();j.ctx.moveTo(this.c0.X,this.c0.Y);j.ctx.lineTo(this.c1.X,this.c1.Y);j.ctx.lineTo(this.c2.X,this.c2.Y);j.ctx.lineTo(this.c3.X,this.c3.Y);j.ctx.closePath();j.ctx.strokeStyle="rgb(255,255,255)";j.ctx.lineWidth=this.pc.scale*this.f.w/30;j.ctx.lineJoin="round";j.ctx.stroke()};var a=function(){k=false;var p=0,q;while(q=b[p++]){if(q.visible){if(q.img.pointerInside(j.mouseX,j.mouseY,q.p0,q.p1,q.p2,q.p3)){k=q}}else{break}}if(k&&k.f.select!=false&&!j.drag){l=k;j.container.style.cursor="pointer"}else{j.container.style.cursor="move"}};var n=function(){a();if(k&&k.f.select!=false){if(k==e){i.center();e=false}else{e=k;k.locked=false;if(k.f.target!=""){var p=0,q;while(q=b[p++]){if(q.f.id&&q.f.id==k.f.target){k=q;e=q;if(q.hidden){q.hidden=false;q.locked=true;e=false}break}}}k.pc.projection();i.setTarget(k)}}};var m=function(q){j=new ge1doot.screen.InitEvents({container:"screen",canvas:"canvas",click:n,move:a});var p=0,r;while(r=q.faces[p++]){b.push(new o(q.path,r))}c()};var c=function(){j.ctx.clearRect(0,0,j.width,j.height);var p=0,q;while(q=b[p++]){q.projection()}b.sort(function(s,r){return r.distance-s.distance});var p=0,q;while(q=b[p++]){if(q.visible){q.img.draw3D(q.p0,q.p1,q.p2,q.p3);if(q.locked&&j.drag){q.locked=false}if(q===l){l.border()}}else{break}}i.move();setTimeout(c,16)};return{load:function(p){window.addEventListener("load",function(){setTimeout(function(){m(p)},500)},false)}}})();
