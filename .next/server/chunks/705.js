exports.id=705,exports.ids=[705],exports.modules={724:(a,b,c)=>{"use strict";c.d(b,{ImageWithFallback:()=>f});var d=c(904),e=c(6822);function f({src:a,alt:b,className:c,style:f,...g}){let[h,i]=(0,e.useState)(!1);return h?(0,d.jsx)("div",{className:c,style:{background:"#e8e8e8",display:"flex",alignItems:"center",justifyContent:"center",...f},"aria-label":b,children:(0,d.jsx)("span",{style:{color:"#aaa",fontSize:12},children:b})}):(0,d.jsx)("img",{src:a,alt:b,className:c,style:f,onError:()=>i(!0),...g})}},1224:(a,b,c)=>{"use strict";c.d(b,{A:()=>n});var d=c(904),e=c(6822),f=c(9986),g=c(5575),h=c(193),i=c(7205);let j=a=>{let b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?[parseInt(b[1],16)/255,parseInt(b[2],16)/255,parseInt(b[3],16)/255]:[1,1,1]},k=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,l=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`,m=new WeakMap,n=({timeSpeed:a=.25,colorBalance:b=0,warpStrength:c=1,warpFrequency:n=5,warpSpeed:o=2,warpAmplitude:p=50,blendAngle:q=0,blendSoftness:r=.05,rotationAmount:s=500,noiseScale:t=2,grainAmount:u=.1,grainScale:v=2,grainAnimated:w=!1,contrast:x=1.5,gamma:y=1,saturation:z=1,centerX:A=0,centerY:B=0,zoom:C=.9,color1:D="#FF9FFC",color2:E="#5227FF",color3:F="#B497CF",className:G=""})=>{let H=(0,e.useRef)(null);return(0,e.useEffect)(()=>{let a=H.current;if(!a)return;let b=new f.A({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),c=b.gl,d=c.canvas;d.style.width="100%",d.style.height="100%",d.style.display="block",a.appendChild(d);let e=new g.l(c),j=new h.B(c,{vertex:k,fragment:l,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uTimeSpeed:{value:.25},uColorBalance:{value:0},uWarpStrength:{value:1},uWarpFrequency:{value:5},uWarpSpeed:{value:2},uWarpAmplitude:{value:50},uBlendAngle:{value:0},uBlendSoftness:{value:.05},uRotationAmount:{value:500},uNoiseScale:{value:2},uGrainAmount:{value:.1},uGrainScale:{value:2},uGrainAnimated:{value:0},uContrast:{value:1.5},uGamma:{value:1},uSaturation:{value:1},uCenterOffset:{value:new Float32Array([0,0])},uZoom:{value:.9},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),n=new i.e(c,{geometry:e,program:j});m.set(a,{renderer:b,program:j,mesh:n});let o=()=>{let d=a.getBoundingClientRect(),e=Math.max(1,Math.floor(d.width)),f=Math.max(1,Math.floor(d.height));b.setSize(e,f);let g=j.uniforms.iResolution.value;g[0]=c.drawingBufferWidth,g[1]=c.drawingBufferHeight,b.render({scene:n})},p=new ResizeObserver(o);p.observe(a),o();let q=0,r=!0,s=!document.hidden,t=performance.now(),u=a=>{j.uniforms.iTime.value=(a-t)*.001,b.render({scene:n}),q=requestAnimationFrame(u)},v=()=>{r&&s&&0===q&&(q=requestAnimationFrame(u))},w=()=>{0!==q&&(cancelAnimationFrame(q),q=0)},x=new IntersectionObserver(([a])=>{(r=a.isIntersecting)?v():w()},{threshold:0});x.observe(a);let y=()=>{(s=!document.hidden)?v():w()};return document.addEventListener("visibilitychange",y),v(),()=>{w(),p.disconnect(),x.disconnect(),document.removeEventListener("visibilitychange",y),m.delete(a);try{a.removeChild(d)}catch{}}},[]),(0,e.useEffect)(()=>{let d=H.current;if(!d)return;let e=m.get(d);if(!e)return;let{program:f}=e,g=f.uniforms;g.uTimeSpeed.value=a,g.uColorBalance.value=b,g.uWarpStrength.value=c,g.uWarpFrequency.value=n,g.uWarpSpeed.value=o,g.uWarpAmplitude.value=p,g.uBlendAngle.value=q,g.uBlendSoftness.value=r,g.uRotationAmount.value=s,g.uNoiseScale.value=t,g.uGrainAmount.value=u,g.uGrainScale.value=v,g.uGrainAnimated.value=+!!w,g.uContrast.value=x,g.uGamma.value=y,g.uSaturation.value=z,g.uCenterOffset.value=new Float32Array([A,B]),g.uZoom.value=C,g.uColor1.value=new Float32Array(j(D)),g.uColor2.value=new Float32Array(j(E)),g.uColor3.value=new Float32Array(j(F))},[a,b,c,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F]),(0,d.jsx)("div",{ref:H,className:`relative h-full w-full overflow-hidden ${G}`.trim()})}},3681:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,9772,23)),Promise.resolve().then(c.t.bind(c,63,23)),Promise.resolve().then(c.t.bind(c,8243,23)),Promise.resolve().then(c.t.bind(c,4678,23)),Promise.resolve().then(c.t.bind(c,2594,23)),Promise.resolve().then(c.t.bind(c,2454,23)),Promise.resolve().then(c.t.bind(c,6278,23)),Promise.resolve().then(c.t.bind(c,7347,23)),Promise.resolve().then(c.bind(c,150))},3834:(a,b,c)=>{"use strict";a.exports=c.p+"static/media/zotmeet.9251372a.png"},5829:(a,b,c)=>{Promise.resolve().then(c.bind(c,5992)),Promise.resolve().then(c.bind(c,8939))},5992:(a,b,c)=>{"use strict";c.d(b,{CustomCursor:()=>d});let d=(0,c(3922).registerClientReference)(function(){throw Error("Attempted to call CustomCursor() from the server but CustomCursor is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/ethanchao/Downloads/Create Portfolio/src/components/CustomCursor.tsx","CustomCursor")},7233:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,2018,23)),Promise.resolve().then(c.t.bind(c,2765,23)),Promise.resolve().then(c.t.bind(c,6445,23)),Promise.resolve().then(c.t.bind(c,9028,23)),Promise.resolve().then(c.t.bind(c,3052,23)),Promise.resolve().then(c.t.bind(c,640,23)),Promise.resolve().then(c.t.bind(c,9224,23)),Promise.resolve().then(c.t.bind(c,7041,23)),Promise.resolve().then(c.t.bind(c,2776,23))},7685:(a,b,c)=>{Promise.resolve().then(c.bind(c,9682)),Promise.resolve().then(c.bind(c,9373))},8536:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>j,metadata:()=>i});var d=c(8714),e=c(5110),f=c.n(e),g=c(5992),h=c(8939);c(9057);let i={title:"Ethan Chao",description:"Software Engineering + Health Informatics portfolio"};function j({children:a}){return(0,d.jsx)("html",{lang:"en",className:f().variable,children:(0,d.jsxs)("body",{className:f().className,children:[(0,d.jsx)(h.SiteNav,{}),a,(0,d.jsx)(g.CustomCursor,{})]})})}},8939:(a,b,c)=>{"use strict";c.d(b,{SiteNav:()=>d});let d=(0,c(3922).registerClientReference)(function(){throw Error("Attempted to call SiteNav() from the server but SiteNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/ethanchao/Downloads/Create Portfolio/src/components/SiteNav.tsx","SiteNav")},9057:()=>{},9373:(a,b,c)=>{"use strict";c.d(b,{SiteNav:()=>i});var d=c(904),e=c(6083),f=c.n(e),g=c(7830);let h=[{label:"WORK",href:"/#work"},{label:"ABOUT ME",href:"/about"},{label:"RESUME",href:"https://drive.google.com/file/d/1a40jwDFfLG5DBDAXZaZafwwdplUpLRCl/view?usp=sharing"}];function i(){let a=(0,g.usePathname)().startsWith("/about");return(0,d.jsx)("header",{className:"fixed top-0 left-0 right-0 z-50 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-sm",children:(0,d.jsxs)("nav",{className:"mx-auto flex h-12 max-w-[1200px] items-center justify-between px-6",children:[(0,d.jsxs)(f(),{href:"/",className:"flex items-center gap-3",children:[(0,d.jsx)("span",{className:"text-[11px] font-semibold uppercase tracking-widest text-[#111]",children:"Ethan Chao"}),(0,d.jsx)("span",{className:"hidden text-[#ccc] sm:inline",children:"|"}),(0,d.jsx)("span",{className:"hidden text-[10px] font-medium uppercase tracking-wider text-[#888] sm:inline",children:"Software Engineering + Health Infomatics @ UC Irvine"})]}),(0,d.jsx)("div",{className:"flex items-center gap-7",children:h.map(b=>{let c="ABOUT ME"===b.label?a:"WORK"===b.label&&!a;return(0,d.jsx)(f(),{href:b.href,..."RESUME"===b.label?{target:"_blank",rel:"noopener noreferrer"}:{},className:"text-[11px] font-medium tracking-widest transition-colors hover:text-[#e05a28]",style:{color:c?"#e05a28":"#888"},children:b.label},b.label)})})]})})}},9422:(a,b,c)=>{"use strict";c.d(b,{ZotMeetGrainient:()=>f});var d=c(904),e=c(1224);function f(){return(0,d.jsx)(e.A,{color1:"#f16486",color2:"#e0afbb",color3:"#f5bfcc",timeSpeed:1.5,colorBalance:0,warpStrength:1,warpFrequency:5,warpSpeed:3.6,warpAmplitude:38,blendAngle:0,blendSoftness:.05,rotationAmount:500,noiseScale:2,grainAmount:.1,grainScale:2,grainAnimated:!1,contrast:1.5,gamma:.9,saturation:1,centerX:0,centerY:0,zoom:.9})}},9682:(a,b,c)=>{"use strict";c.d(b,{CustomCursor:()=>f});var d=c(904),e=c(6822);function f(){let a=(0,e.useRef)(null),[b,c]=(0,e.useState)(!1),[f,g]=(0,e.useState)(!1),[h,i]=(0,e.useState)(!1),[j,k]=(0,e.useState)(!1),[l,m]=(0,e.useState)("View");return(0,d.jsx)("div",{ref:a,"aria-hidden":"true",className:`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_10px_28px_rgba(36,211,101,0.22)] transition-[width,height,opacity,background-color,box-shadow] duration-200 ease-out ${j?h?"h-6 w-28":"h-5 w-24":h&&f?"h-9 w-9":h?"h-6 w-6":f?"h-7 w-7":"h-3.5 w-3.5"} ${f&&!j?"bg-[#6f927d]":"bg-[#4c705b]"} ${!b?"opacity-0":j?"opacity-100":f?"opacity-55":"opacity-100"}`,children:(0,d.jsx)("span",{className:`whitespace-nowrap transition-opacity duration-150 ${j?"opacity-100 delay-75":"opacity-0"}`,children:l})})}}};