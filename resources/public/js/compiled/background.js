if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}


;(function(){
var g;function k(a,c){this.c=[];this.l=c;for(var d=!0,b=a.length-1;0<=b;b--){var e=a[b]|0;d&&e==c||(this.c[b]=e,d=!1)}}var l={};function n(a){if(-128<=a&&128>a){var c=l[a];if(c)return c}c=new k([a|0],0>a?-1:0);-128<=a&&128>a&&(l[a]=c);return c}function p(a){if(isNaN(a)||!isFinite(a))return q;if(0>a)return p(-a).f();for(var c=[],d=1,b=0;a>=d;b++)c[b]=a/d|0,d*=r;return new k(c,0)}var r=4294967296,q=n(0),t=n(1),u=n(16777216);g=k.prototype;g.F=function(){return 0<this.c.length?this.c[0]:this.l};
g.o=function(){if(this.h())return-this.f().o();for(var a=0,c=1,d=0;d<this.c.length;d++)var b=v(this,d),a=a+(0<=b?b:r+b)*c,c=c*r;return a};g.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(this.j())return"0";if(this.h())return"-"+this.f().toString(a);for(var c=p(Math.pow(a,6)),d=this,b="";;){var e=w(d,c),f=(d.v(e.multiply(c)).F()>>>0).toString(a),d=e;if(d.j())return f+b;for(;6>f.length;)f="0"+f;b=""+f+b}};function v(a,c){return 0>c?0:c<a.c.length?a.c[c]:a.l}
g.j=function(){if(0!=this.l)return!1;for(var a=0;a<this.c.length;a++)if(0!=this.c[a])return!1;return!0};g.h=function(){return-1==this.l};g.B=function(a){return 0<this.compare(a)};g.C=function(a){return 0<=this.compare(a)};g.w=function(){return 0>this.compare(u)};g.A=function(a){return 0>=this.compare(a)};g.compare=function(a){a=this.v(a);return a.h()?-1:a.j()?0:1};g.f=function(){return this.D().add(t)};
g.add=function(a){for(var c=Math.max(this.c.length,a.c.length),d=[],b=0,e=0;e<=c;e++){var f=b+(v(this,e)&65535)+(v(a,e)&65535),h=(f>>>16)+(v(this,e)>>>16)+(v(a,e)>>>16),b=h>>>16,f=f&65535,h=h&65535;d[e]=h<<16|f}return new k(d,d[d.length-1]&-2147483648?-1:0)};g.v=function(a){return this.add(a.f())};
g.multiply=function(a){if(this.j()||a.j())return q;if(this.h())return a.h()?this.f().multiply(a.f()):this.f().multiply(a).f();if(a.h())return this.multiply(a.f()).f();if(this.w()&&a.w())return p(this.o()*a.o());for(var c=this.c.length+a.c.length,d=[],b=0;b<2*c;b++)d[b]=0;for(b=0;b<this.c.length;b++)for(var e=0;e<a.c.length;e++){var f=v(this,b)>>>16,h=v(this,b)&65535,m=v(a,e)>>>16,z=v(a,e)&65535;d[2*b+2*e]+=h*z;x(d,2*b+2*e);d[2*b+2*e+1]+=f*z;x(d,2*b+2*e+1);d[2*b+2*e+1]+=h*m;x(d,2*b+2*e+1);d[2*b+2*
e+2]+=f*m;x(d,2*b+2*e+2)}for(b=0;b<c;b++)d[b]=d[2*b+1]<<16|d[2*b];for(b=c;b<2*c;b++)d[b]=0;return new k(d,0)};function x(a,c){for(;(a[c]&65535)!=a[c];)a[c+1]+=a[c]>>>16,a[c]&=65535}
function w(a,c){if(c.j())throw Error("division by zero");if(a.j())return q;if(a.h())return c.h()?w(a.f(),c.f()):w(a.f(),c).f();if(c.h())return w(a,c.f()).f();if(30<a.c.length){if(a.h()||c.h())throw Error("slowDivide_ only works with positive integers.");for(var d=t,b=c;b.A(a);)d=d.shiftLeft(1),b=b.shiftLeft(1);for(var e=d.m(1),f=b.m(1),h,b=b.m(2),d=d.m(2);!b.j();)h=f.add(b),h.A(a)&&(e=e.add(d),f=h),b=b.m(1),d=d.m(1);return e}d=q;for(b=a;b.C(c);){e=Math.max(1,Math.floor(b.o()/c.o()));f=Math.ceil(Math.log(e)/
Math.LN2);f=48>=f?1:Math.pow(2,f-48);h=p(e);for(var m=h.multiply(c);m.h()||m.B(b);)e-=f,h=p(e),m=h.multiply(c);h.j()&&(h=t);d=d.add(h);b=b.v(m)}return d}g.D=function(){for(var a=this.c.length,c=[],d=0;d<a;d++)c[d]=~this.c[d];return new k(c,~this.l)};g.shiftLeft=function(a){var c=a>>5;a%=32;for(var d=this.c.length+c+(0<a?1:0),b=[],e=0;e<d;e++)b[e]=0<a?v(this,e-c)<<a|v(this,e-c-1)>>>32-a:v(this,e-c);return new k(b,this.l)};
g.m=function(a){var c=a>>5;a%=32;for(var d=this.c.length-c,b=[],e=0;e<d;e++)b[e]=0<a?v(this,e+c)>>>a|v(this,e+c+1)<<32-a:v(this,e+c);return new k(b,this.l)};if("undefined"===typeof y)var y=function(){throw Error("No *print-fn* fn set for evaluation environment");};if("undefined"===typeof A)var A=function(){throw Error("No *print-err-fn* fn set for evaluation environment");};if("undefined"===typeof B)var B=null;if("undefined"!==typeof Symbol){var C=Symbol;"object"!=typeof C||!C||C instanceof Array||C instanceof Object||Object.prototype.toString.call(C)}
var D="undefined"!==typeof Math.imul&&0!==Math.imul(4294967295,5)?function(a,c){return Math.imul(a,c)}:function(a,c){var d=a&65535,b=c&65535;return d*b+((a>>>16&65535)*b+d*(c>>>16&65535)<<16>>>0)|0};function E(a){a=D(a|0,-862048943);a=0^(D(a<<15|a>>>-15,461845907)|0);a=(D(a<<13|a>>>-13,5)+-430675100|0)^0;a=D(a^a>>>16,-2048144789);D(a^a>>>13,-1028477387)}E(1);E(0);chrome.webNavigation.onCompleted.addListener(function(){return null});
})();
