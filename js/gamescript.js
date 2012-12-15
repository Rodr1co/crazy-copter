document.getElementById('playnow').addEventListener("click",function(e){this.style.display='none';PlayGame();},false);
document.getElementById('playnow').addEventListener("touchstart",function(e){this.style.display='none';PlayGame();},false);

// z = forward speed
var startspeed = 100;
var z = startspeed;
var upperlimit = 22;
var lowerlimit = 264;
var offset = 18;
var imageheight = 36;
var imagewidth = 50;
var targetvalue = 100;
var out = 28;
var out2 = 292;
var points = 0;
var counter = 0;
var targets = 0;
var addtarget = 0;
var isdead = 0;
var deadcounter = 0;
var lives = 3;
var exp = 15;
var copterscore;

if(!localStorage)
copterscore = 0;

if(localStorage){
copterscore = localStorage.getItem('copterscore');
if(copterscore == null || copterscore == '' || copterscore < 1)
copterscore = 0;
}

function PlayGame(){

if(lives == 0){
points = 0;
counter = 0;
targets = 0;
addtarget = 0;
isdead = 0;
deadcounter = 0;
lives = 3;
}

var m=document.getElementById("canvas");
var n=m.getContext("2d");

m.width=480;
m.height=320;

var o=null,expected=0,loaded=0,gotLoad=function(){
loaded++;
if(loaded==expected&&o)o()
};

var p=new Image();
p.onload=gotLoad;expected++;
p.src="images/mountains.png";

var q=new Image();
q.onload=gotLoad;
expected++;
q.src="images/copter.png";

var r=new Image();
r.src="images/explode.png";

var s=new Image();
s.src="images/invincible.png";

var t=new Image();
t.onload=gotLoad;
expected++;
t.src="images/block3.png";

var u=new Image();
u.onload=gotLoad;expected++;
u.src="images/greenstar.png";

var exp1=new Image();
exp1.src="images/explode1.png";

var exp2=new Image();
exp2.src="images/explode2.png";

var exp3=new Image();
exp3.src="images/explode3.png";

var exp4=new Image();
exp4.src="images/explode4.png";

var exp5=new Image();
exp5.src="images/explode5.png";

var A={upgravity:50,downgravity:50,yvel:0,x:0,y:0,w:imagewidth,h:imageheight,current:0};

var B={lastpuff:0};

var C={speed:z,x:-100,y:-100,hit:0,timer:1000,collidesWith:function(a){
return(a.x<=(this.x+u.width)&&this.x<=(a.x+A.w)&&a.y<=(this.y+u.height)&&this.y<=(a.y+A.h))
}
};

var D={speed:z,x:0,y:0};

var E={speed:z,x:m.width,y:0};

var F={speed:z,x:0,collidesWith:function(a){
var d=out;
var e=out;
var i=out;
var j=out;
var b=4;
var bot_tol=5;
var c=(F.x+A.w/2)/128;
if(c<0){c+=1;}
var f=e-c*(e-d)-b;
if(f>=a.y)return true;
var g=(F.x-A.w/2)/128;
if(g<-1){g+=1;}
var h=d+g*(d-e)-b;
if(h>=a.y)return true;
var c=(F.x+A.w/2)/128;
if(c<0){c+=1;}
var k=j-c*(j-i)-bot_tol;
if((m.height-k)<=(a.y+A.h))return true;
var g=(F.x-A.w/2)/128;
if(g<-1){g+=1;}
var l=i+g*(i-j)-bot_tol;
if((m.height-l)<=(a.y+A.h))return true;
return false
}
};

var G=null,dead=false,invincible=false,distance=0;var H={'-1':true};

addEventListener("keydown",function(e){H[e.keyCode]=true},false);
addEventListener("keyup",function(e){delete H[e.keyCode]},false);
addEventListener("mousedown",function(e){H[-1]=true},false);
addEventListener("mouseup",function(e){delete H[-1]},false);
addEventListener("touchstart",function(e){H[-1]=true},false);
addEventListener("touchend",function(e){delete H[-1]},false);

document.body.addEventListener('touchmove',function(e){e.preventDefault()},false);

var I=function(d){
this.speed = z;
this.x = m.width*(d?1.5:2)+33;
this.y = 32+(Math.random()*(m.height-78*2));

this.reset=function(){
this.x = m.width;
this.y = 32+(Math.random()*(m.height-78*2));
if(!invincible&&Math.random()<0.10&&C.x<0){
C.x = m.width;
C.y = this.y>m.height/2?this.y-40:this.y+78+20
}
};

this.collidesWith=function(a){
var b=12;
var c=4;
return(a.x<=(this.x+t.width)&&this.x<=(a.x+A.w-b)&&a.y<=(this.y+t.height)&&this.y<=(a.y+A.h-c))
}
};

var J=new I(),block2=new I(true);

var K=function(){A.x=m.width/2-25;A.y=m.height/2};

var L=null;

// reserved
var getScores=function(){}
var M=function(){};
var N=function(){};

////////////////////////////////////////////////////////////////////////////////

var O=function(){
dead=true;
z=0;
C.speed=z;
D.speed=z;
E.speed=z;
F.speed=z;
J.speed=z;
block2.speed=z;
isdead=1;
};

////////////////////////////////////////////////////////////////////////////////

var P=[];

var Q=function(a){
A.y+=A.yvel*a;

if(A.y < upperlimit){A.y = upperlimit;}
if(A.y > lowerlimit){A.y = lowerlimit;}
          
var b = Math.round(z * 6);
var power = Math.round(z * 5);
var accel_time = 0.15;

if(-1 in H){
if(A.yvel>-(power*accel_time))A.yvel-=power*a
}
else{
if(A.yvel<(b*accel_time))A.yvel+=b*a
}
A.current+=a;
if(A.current>2)A.current=0;
else A.current+=a;J.x-=J.speed*a;block2.x-=block2.speed*a;C.x-=C.speed*a;distance+=(block2.speed*a)/100;
if(B.lastpuff>0.05){
B.lastpuff=0;
P.push([distance,A.y,B.alt]);
B.alt=Math.floor(Math.random()*2)
}

else B.lastpuff+=a;
if(F.x-F.speed*a<=-128){F.x=0;}
else F.x-=F.speed*a;
if(D.x-D.speed*a<=-m.width)D.x=m.width;
else D.x-=D.speed*a;
if(E.x-E.speed*a<=-m.width)E.x=m.width;
else E.x-=E.speed*a;
if(J.x<=-33)J.reset();
if(block2.x<=-33)block2.reset();

// Hit target
if(C.collidesWith(A)){
invincible=true;
if(addtarget == 0){ targets++; addtarget = 1;  }
setTimeout(function(){ invincible=false; addtarget = 0; },5000);
}

if((J.collidesWith(A)||block2.collidesWith(A))&&!invincible){O()}if(F.collidesWith(A)&&!invincible){O()}};

var R=function(){
n.drawImage(p,D.x,0);
n.drawImage(p,E.x,0);
n.beginPath();
n.moveTo(A.x,A.y+20);

n.strokeStyle='#000';
n.lineWidth=1;
n.stroke();
n.drawImage(t,J.x,J.y);
n.drawImage(t,block2.x,block2.y);
if(!invincible)n.drawImage(u,C.x,C.y);
n.beginPath();

n.moveTo(F.x,0);
n.lineTo(F.x,out);
n.lineTo(F.x+768,out);
n.lineTo(F.x+768,0);
n.fillStyle='transparent';
n.fill();
n.strokeStyle='transparent';
n.lineWidth=0;
n.stroke();
n.beginPath();
n.moveTo(F.x,m.height);
n.lineTo(F.x,out2);
n.lineTo(F.x+768,out2);
n.lineTo(F.x+768,m.height);
n.fillStyle='transparent';
n.fill();
n.strokeStyle='transparent';
n.lineWidth=0;
n.stroke();
if(typeof(global_ceiling)!='undefined'){
n.beginPath();
n.arc(A.x,m.height-global_ceiling,5,0,2*Math.PI,true);
n.fillStyle='#000';
n.fill();
n.beginPath();
n.arc(A.x+A.w,m.height-global_ceiling_right,5,0,2*Math.PI,true);
n.fillStyle='#000';
n.fill()
}

////////////////////////////////////////////////////////////////////////////////

if(dead){
deadcounter++;
if(A.y > (lowerlimit - offset)){ A.y = (lowerlimit - offset); }
if(deadcounter < exp){n.drawImage(exp1,A.x,A.y);}
if(deadcounter >= exp && deadcounter < (exp*2)){n.drawImage(exp2,A.x,A.y);}
if(deadcounter >= (exp*2) && deadcounter < (exp*3)){n.drawImage(exp3,A.x,A.y);}
if(deadcounter >= (exp*3) && deadcounter < (exp*4)){n.drawImage(exp4,A.x,A.y);}
if(deadcounter >= (exp*4) && deadcounter < (exp*5)){n.drawImage(exp5,A.x,A.y);}
if(deadcounter > 125){
clearInterval(G);
lives--;
deadcounter = 0;
isdead = 0;
z = startspeed + Math.round(points / 20);
C.speed=z;
D.speed=z;
E.speed=z;
F.speed=z;
J.speed=z;
block2.speed=z;
document.getElementById('playnow').style.display='block';
}
}

////////////////////////////////////////////////////////////////////////////////

else {
z = startspeed + Math.round(points / 20);
C.speed=z;
D.speed=z;
E.speed=z;
F.speed=z;
J.speed=z;
block2.speed=z;
counter++;
points = Math.round(counter / 20) + (targets * targetvalue);
n.drawImage(invincible?s:q,(1-Math.floor(A.current*4)%2)*A.w,(-1 in H)?A.h:0,A.w,A.h,A.x,A.y,A.w,A.h);
}

////////////////////////////////////////////////////////////////////////////////

if(dead && (deadcounter > (exp*5) || deadcounter == 0) && document.getElementById('playnow').style.display=='block'){
if(lives > 0){
mytext = "CONTINUE";
leftspace = 245;
}
else {
mytext = "GAME OVER";
leftspace = 240;
if(localStorage){
localStorage.getItem('copterscore');
if(points > copterscore)
localStorage.setItem('copterscore', points);
copterscore = localStorage.getItem('copterscore');
}
}
n.fillStyle="#000000";
n.font="24px Helvetica";
n.textAlign="center";
n.textBaseline="top";
n.fillText(mytext,leftspace+1,149);
n.fillStyle="#eeeeff";
n.font="24px Helvetica";
n.textAlign="center";
n.textBaseline="top";
n.fillText(mytext,leftspace,148);
}

n.fillStyle="#000000";
n.font="16px Arial";
n.textAlign="left";
n.textBaseline="top";
n.fillText("SCORE: "+points,11,33);
n.fillStyle="#eeeeff";
n.font="16px Arial";
n.textAlign="left";
n.textBaseline="top";
n.fillText("SCORE: "+points,10,32);

n.fillStyle="#000000";
n.font="16px Arial";
n.textAlign="right";
n.textBaseline="top";
n.fillText("LIVES: "+lives,471,33);
n.fillStyle="#eeeeff";
n.font="16px Arial";
n.textAlign="right";
n.textBaseline="top";
n.fillText("LIVES: "+lives,470,32);

n.fillStyle="#000000";
n.font="16px Arial";
n.textAlign="left";
n.textBaseline="top";
n.fillText("SPEED: "+z+" KTS",11,271);
n.fillStyle="#eeeeff";
n.font="16px Arial";
n.textAlign="left";
n.textBaseline="top";
n.fillText("SPEED: "+z+" KTS",10,270);

n.fillStyle="#000000";
n.font="16px Arial";
n.textAlign="right";
n.textBaseline="top";
n.fillText("HIGH SCORE: "+copterscore,471,271);
n.fillStyle="#eeeeff";
n.font="16px Arial";
n.textAlign="right";
n.textBaseline="top";
n.fillText("HIGH SCORE: "+copterscore,470,270);

};

var S,play=function(){
var a=Date.now();
var b=a-S;
Q(b/1000);
R(dead);
S=a
};

o=function(){
K();
Q(0);
R();
window.ontouchstart=window.onmousedown=function(){
if(!G){
S = Date.now();
G = setInterval(play,1)
}
window.ontouchstart=window.onmousedown=null
}
};


}