(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{126:function(n,e,t){"use strict";t.r(e);var a=t(0),r=t.n(a),o=t(84),c=t.n(o),i=(t(98),t(36)),l=t(3),u=t(1),s=t(47),m=t(4);function d(){var n=Object(l.a)(["\n  html, #root, .app {\n    position: absolute;\n    top: 0;\n    left: 0;\n    min-height: 100vh;\n    height: 100vh;\n    width: 100vw;\n  }\n\n  body {\n    margin: 0;\n    padding: 0;\n    height: 100vh;\n    min-height: 100vh;\n    width: 100%;\n    font-family: Roboto;\n    font-size: calc(1em + 1vw);\n    color: #fff;\n  }\n\n  button {\n    font-family: Roboto;\n    font-size: inherit;\n    color: #032B43;\n  }\n\n  input {\n    font-family: Roboto;\n    font-size: inherit;\n    color: #032B43;\n  }\n"]);return d=function(){return n},n}var f=Object(u.b)(d()),b={colors:{background:"#032B43",primary:"#276FBF",accent:"#2EC4B6",lightAccent:"#eafaf9",error:"#FF3366",black:"#02020A"}},p=function(n){var e=n.children;return r.a.createElement(u.a,{theme:b},e)},h=t(49),E=t.n(h),v=t(56),g=t(64),w=t(22),x=t(20);function j(){var n=Object(l.a)(["\n  text-align: left;\n  margin-bottom: 1px;\n  margin-left: 1vw;\n"]);return j=function(){return n},n}function y(){var n=Object(l.a)(["\n  background-color: ",";\n  border: none;\n  padding: 20px;\n  text-align: center;\n  transition: border-color 250ms ease;\n  border: 2px solid;\n  border-radius: 50px;\n\n  &:focus {\n    outline: none;\n    border-color: ",";\n  }\n"]);return y=function(){return n},n}function O(){var n=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n"]);return O=function(){return n},n}var k=u.c.div(O()),P=Object(u.c)(w.b)(y(),(function(n){return n.theme.colors.lightAccent}),(function(n){return n.theme.colors.accent})),S=u.c.h4(j()),C=function(n){var e=n.name,t=n.label,a=n.obscure,o=void 0!==a&&a;return r.a.createElement(k,null,r.a.createElement(S,null,t||e),r.a.createElement(P,{name:e,"data-testid":"TextInput",type:o?"password":"text"}))};function B(){var n=Object(l.a)(["\n  color: ",";\n"]);return B=function(){return n},n}var F=u.c.div(B(),(function(n){return n.theme.colors.error})),T=function(n){return r.a.createElement(F,null,r.a.createElement(w.a,n))};function z(){var n=Object(l.a)(["\n  background-color: ",";\n  border: none;\n  border-radius: 50px;\n  padding: 10px 20px;\n  transition: opacity 250ms ease;\n  margin-top: ",";\n  flex: 1;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:hover {\n    opacity: 0.8;\n  }\n"]);return z=function(){return n},n}var A=u.c.button(z(),(function(n){return n.theme.colors.accent}),(function(n){return n.marginTop||"0px"})),q=function(n){var e=n.onClick,t=n.type,a=n.children,o=n.marginTop;return r.a.createElement(A,{type:t,onClick:e,marginTop:o},a)},N=t(91),R=t.n(N);function L(){var n=Object(l.a)(["\n  display: block;\n  margin: auto;\n  text-align: center;\n  width: 10vw;\n  height: 10vh;\n"]);return L=function(){return n},n}function I(){var n=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-content: center;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 2;\n"]);return I=function(){return n},n}var J=u.c.div(I()),U=Object(u.c)(R.a)(L()),V=function(n){var e=n.show;return void 0!==e&&e?r.a.createElement(J,null,r.a.createElement(U,{"data-testid":"FullLoading",type:"bubbles"})):r.a.createElement(r.a.Fragment,null)},D=t(92),M=t.n(D),G=(new s.a).get("token"),H=M.a.create({baseURL:"http://localhost:8000/api",headers:{Authorization:G?"Bearer ".concat(G):""}});function K(){var n=Object(l.a)(["\n  display: flex;\n  text-decoration: none;\n"]);return K=function(){return n},n}function Q(){var n=Object(l.a)(["\n  text-align: center;\n"]);return Q=function(){return n},n}function W(){var n=Object(l.a)(["\n  color: ",";\n  text-align: center;\n"]);return W=function(){return n},n}function X(){var n=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return X=function(){return n},n}var Y=u.c.div(X()),Z=u.c.h3(W(),(function(n){return n.theme.colors.error})),$=u.c.h3(Q()),_=Object(u.c)(i.b)(K()),nn=function(n){var e=Object(a.useState)(!1),t=Object(g.a)(e,2),o=t[0],c=t[1];return console.log(n.location),o?r.a.createElement(m.a,{to:"/dashboard"}):r.a.createElement(w.d,{initialValues:{Email:"",Password:""},validationSchema:x.a({Email:x.c().required().email(),Password:x.c().required()}),onSubmit:function(){var n=Object(v.a)(E.a.mark((function n(e,t){var a;return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=t.setStatus,H.post("/login",{email:e.Email,password:e.Password}).then((function(n){var e=n.data.data.token;H.defaults.headers.common={Authorization:"Bearer ".concat(e)},(new s.a).set("token",e),c(!0)})).catch((function(n){a(n.response.data.message)}));case 2:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},(function(e){return r.a.createElement(w.c,null,r.a.createElement(V,{show:e.isSubmitting}),r.a.createElement(Y,null,e.status&&r.a.createElement(Z,null,e.status),n.location&&n.location.state.accountCreated&&r.a.createElement($,null,"Account successfully created!"),r.a.createElement(C,{name:"Email"}),r.a.createElement(T,{name:"Email"}),r.a.createElement(C,{name:"Password",obscure:!0}),r.a.createElement(T,{name:"Password"}),r.a.createElement(q,{type:"submit",marginTop:"20px"},"Login"),r.a.createElement(_,{to:"/signup"},r.a.createElement(q,{marginTop:"10px"}," Create a new account "))))}))};function en(){var n=Object(l.a)(["\n  color: ",";\n  text-align: center;\n"]);return en=function(){return n},n}function tn(){var n=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return tn=function(){return n},n}var an=u.c.div(tn()),rn=u.c.h3(en(),(function(n){return n.theme.colors.error})),on=function(){var n=Object(a.useState)(!1),e=Object(g.a)(n,2),t=e[0],o=e[1];return t?r.a.createElement(m.a,{to:{pathname:"/login",state:{accountCreated:!0}}}):r.a.createElement(w.d,{initialValues:{Name:"",Email:"",Password:"",ConfirmPassword:""},validationSchema:x.a({Name:x.c().required(),Email:x.c().required().email(),Password:x.c().required(),ConfirmPassword:x.c().oneOf([x.b("Password"),null],"Passwords don't match")}),onSubmit:function(){var n=Object(v.a)(E.a.mark((function n(e,t){var a;return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=t.setStatus,H.post("/user",{name:e.Name,email:e.Email,password:e.Password}).then((function(n){201===n.status&&o(!0)})).catch((function(n){a(n.response.data.message)}));case 2:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},(function(n){return r.a.createElement(w.c,null,r.a.createElement(V,{show:n.isSubmitting}),r.a.createElement(an,null,n.status&&r.a.createElement(rn,null,n.status),r.a.createElement(C,{name:"Name"}),r.a.createElement(T,{name:"Name"}),r.a.createElement(C,{name:"Email"}),r.a.createElement(T,{name:"Email"}),r.a.createElement(C,{name:"Password",obscure:!0}),r.a.createElement(T,{name:"Password"}),r.a.createElement(C,{name:"ConfirmPassword",label:"Confirm Password",obscure:!0}),r.a.createElement(T,{name:"ConfirmPassword"}),r.a.createElement(q,{type:"submit",marginTop:"60px"},"Sign Up")))}))};function cn(){var n=Object(l.a)(["\n  background-color: ",";\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n  align-items: center;\n  justify-content: center;\n  width: inherit;\n  height: inherit;\n"]);return cn=function(){return n},n}var ln=u.c.div(cn(),(function(n){return n.theme.colors.background})),un=function(){var n=(new s.a).get("token");return r.a.createElement(r.a.Fragment,null,n?r.a.createElement(m.a,{to:"/dashboard"}):r.a.createElement(m.a,{to:"/login"}),r.a.createElement(f,null),r.a.createElement(p,null,r.a.createElement(ln,null,r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/signup",component:on}),r.a.createElement(m.b,{path:"/login",component:nn}),r.a.createElement(m.b,{path:"/dashboard"},r.a.createElement("div",null," Dashboard "))))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,null,r.a.createElement(un,null))),document.getElementById("root"))},93:function(n,e,t){n.exports=t(126)}},[[93,1,2]]]);
//# sourceMappingURL=main.bc945412.chunk.js.map