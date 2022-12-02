(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const h of o)if(h.type==="childList")for(const g of h.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&n(g)}).observe(document,{childList:!0,subtree:!0});function s(o){const h={};return o.integrity&&(h.integrity=o.integrity),o.referrerpolicy&&(h.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?h.credentials="include":o.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function n(o){if(o.ep)return;o.ep=!0;const h=s(o);fetch(o.href,h)}})();const P="/SpaceInvaders/assets/ship3.2e642a9d.png",v=document.querySelector("canvas"),r=v.getContext("2d");class C{constructor(){this.velocity=0,this.rotation=0,this.color="orange",this.opacity=1;const i=new Image;i.src=P,i.onload=()=>{this.width=i.width*.3,this.height=i.height*.3,this.image=i,this.position={x:v.width/2-this.width/2,y:v.height-this.height-20}}}draw(){r.save(),r.globalAlpha=this.opacity,r.translate(this.position.x+this.width/2,this.position.y+this.height/2),r.rotate(this.rotation),r.translate(-this.position.x-this.width/2,-this.position.y-this.height/2),r.drawImage(this.image,this.position.x,this.position.y,this.width,this.height),r.restore()}update(){this.image&&(this.draw(),this.position.x+=this.velocity)}}const k="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAAAXNSR0IArs4c6QAAAPFJREFUWEftWNsNhDAMC/Ow/yg3z/GFBNFdXGOoRGt+aZr4kZSyxEDPMhCWmBfMJ+J7VHKNe8lQ96eUUZMhS6v7G8zO8Kttlm2i2kKNz/VQNjOYouutTEEOZbPMJBq16nt2wBiMynhrvJX5xxTqkcwcWp/zsPFIqbJnUHFsMQZzYGBeZZCtWqdQr3VZqVPPGEwvGX7kmVcZdfSqoqH8lDJoM7VYFI/yG8zOYO9p11UZdCIjG7HXcHQzLc8Zlhm2eIMpvtXGVYa1CRoIyKboSsDWQ/0DQB5HxbHgDYZloPXceZXNrpLwVJzUM08VdXXfocBs/FiQJ/HzjDEAAAAASUVORK5CYII=",N=document.querySelector("canvas"),l=N.getContext("2d");class O{constructor({position:i,velocity:s}){this.position=i,this.velocity=s,this.width=8,this.height=12}draw(){l.beginPath(),l.moveTo(this.position.x-this.width,this.position.y),l.lineTo(this.position.x+this.width,this.position.y),l.lineTo(this.position.x,this.position.y+this.height),l.closePath(),l.fillStyle="white",l.fill()}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}const R=document.querySelector("canvas"),Z=R.getContext("2d");class G{constructor({position:i}){this.velocity={x:0,y:0},this.color="red";const s=new Image;s.src=k,s.onload=()=>{this.width=s.width*1,this.height=s.height*1,this.image=s,this.position={x:i.x,y:i.y}}}draw(){Z.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)}update({velocity:i}){this.image&&(this.draw(),this.position.x+=i.x,this.position.y+=i.y)}shoot(i){i.push(new O({position:{x:this.position.x+this.width/2,y:this.position.y+this.height},velocity:{x:0,y:5}}))}}const b=document.querySelector("canvas");b.getContext("2d");class T{constructor(){this.position={x:0,y:0},this.velocity={x:3,y:0},this.invaders=[];const i=Math.ceil(Math.random()*4+2),s=Math.ceil(Math.random()*7+3);this.width=50*s,this.height=40*i;for(let n=0;n<i;n++)for(let o=0;o<s;o++)this.invaders.push(new G({position:{x:50*o,y:40*n}}))}update(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.velocity.y=0,(this.position.x>=b.width-this.width||this.position.x<=0)&&(this.velocity.x=-this.velocity.x,this.velocity.y=40)}}const V=document.querySelector("canvas"),c=V.getContext("2d");class q{constructor({position:i,velocity:s,radio:n,color:o,fades:h}){this.position=i,this.velocity=s,this.radio=n,this.color=o,this.opacity=1,this.fades=h}draw(){c.save(),c.globalAlpha=this.opacity,c.beginPath(),c.arc(this.position.x,this.position.y,this.radio,0,2*Math.PI),c.fillStyle=this.color,c.fill(),c.closePath(),c.restore()}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.fades||(this.opacity+=-.01)}}const $=document.querySelector("canvas"),p=$.getContext("2d");class F{constructor({position:i,velocity:s}){this.position=i,this.velocity=s,this.radio=5}draw(){p.beginPath(),p.arc(this.position.x,this.position.y,this.radio,0,2*Math.PI),p.closePath(),p.fillStyle="yellow",p.fill()}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}const H=document.querySelector("#score"),a=document.querySelector("canvas"),M=a.getContext("2d");a.width=innerWidth;a.height=innerHeight;const d={ArrowLeft:!1,ArrowRight:!1},e=new C,y=[],m=[],u=[],A=[],E=[];let f=0,S=Math.ceil(Math.random()*500+400),w={over:!1,active:!0},x=0;for(let t=0;t<100;t++)E.push(new q({position:{x:Math.random()*a.width,y:Math.random()*a.height},velocity:{x:0,y:1},radio:Math.random()*3,color:"white",fades:!0}));function I({object:t}){for(let i=0;i<10;i++)A.push(new q({position:{x:t.position.x+t.width/2,y:t.position.y+t.height/2},velocity:{x:(Math.random()-.5)*2,y:(Math.random()-.5)*2},radio:Math.random()*3+3,color:t.color}))}function L(){!w.active||(requestAnimationFrame(L),M.fillStyle="black",M.fillRect(0,0,a.width,a.height),E.forEach(t=>{t.position.y-t.radio>=a.height&&(t.position.x=Math.random()*a.width,t.position.y=0),t.update()}),e.update(),A.forEach((t,i)=>{t.opacity<=.01?setTimeout(()=>{A.splice(i,1)},0):t.update()}),u.forEach((t,i)=>{t.position.y>=a.height?setTimeout(()=>{u.splice(i,1)},0):t.update(),t.position.y+t.height>=e.position.y&&t.position.y<=e.position.y+e.height&&t.position.x+2*t.width>=e.position.x&&t.position.x<=e.position.x+e.width&&(setTimeout(()=>{u.splice(i,1),e.opacity=0,w.over=!0},0),setTimeout(()=>{w.active=!1},2e3),I({object:e}),console.log("you die"))}),y.forEach((t,i)=>{t.position.y+t.radio<=0?setTimeout(()=>{y.splice(i,1)},0):t.update()}),m.forEach((t,i)=>{t.update(),f%50==0&&t.invaders.length>0&&t.invaders[Math.floor(Math.random()*t.invaders.length)].shoot(u),t.invaders.forEach((s,n)=>{s.update({velocity:t.velocity}),y.forEach((o,h)=>{o.position.y>=s.position.y&&o.position.y+2*o.radio<=s.position.y+s.height&&o.position.x>=s.position.x&&o.position.x+2*o.radio<=s.position.x+s.width&&(I({object:s}),setTimeout(()=>{t.invaders.splice(n,1),y.splice(h,1)}),x+=100,console.log(x),H.innerHTML=x)})}),t.invaders.length==0&&m.splice(i,1)}),d.ArrowLeft&&e.position.x>=0?(e.velocity=-7,e.rotation=-.2):d.ArrowRight&&e.position.x<=a.width-e.width?(e.velocity=7,e.rotation=.2):(e.velocity=0,e.rotation=0),f%S==0&&(m.push(new T),S=Math.ceil(Math.random()*500+800),f=0),f++)}L();addEventListener("keydown",({key:t})=>{if(!w.over)switch(t){case"a":case"ArrowLeft":d.ArrowLeft=!0;break;case"d":case"ArrowRight":d.ArrowRight=!0;break;case" ":{y.push(new F({position:{x:e.position.x+e.width/2,y:e.position.y},velocity:{x:0,y:-10}}));break}case"f":{console.log(e.height,e.width,e.position.x);break}}});addEventListener("keyup",({key:t})=>{switch(t){case"a":case"ArrowLeft":d.ArrowLeft=!1;break;case"d":case"ArrowRight":d.ArrowRight=!1;break}});
