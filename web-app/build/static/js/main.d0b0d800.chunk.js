(this["webpackJsonpweb-app"]=this["webpackJsonpweb-app"]||[]).push([[0],{21:function(e,a,t){e.exports=t(33)},26:function(e,a,t){},32:function(e,a,t){},33:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),r=t(12),s=t.n(r),c=(t(26),t(13)),l=t(14),i=t(18),m=t(15),p=t(20),u=(t(27),t(5),t(17),t(19)),d=t(10),h=t(8);function g(e){var a=e.id,n=e.app,r=t(28);return o.a.createElement("div",{className:"col-12 form-input",id:a},o.a.createElement(u.a,{className:"mb-3"},o.a.createElement(d.a,{placeholder:"username","aria-label":"Recipient's username","aria-describedby":"basic-addon2",type:"text",value:n.state.username,onChange:function(e){n.setState({username:e.target.value})}}),o.a.createElement(d.a,{placeholder:"password","aria-label":"Recipient's password","aria-describedby":"basic-addon2",type:"password",value:n.state.password,onChange:function(e){n.setState({password:e.target.value})}})),o.a.createElement(h.a,{variant:"primary",onClick:function(){r("http://localhost:8082/login"+n.state.selectedProtocol,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n.state.username,password:n.state.password})}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))}},"Login"),o.a.createElement("a",{href:"http://localhost:8082/google-login"}," Login With Google "))}var f=function(e){var a=e.app;return o.a.createElement("div",{className:"modal-dialog text-center"},o.a.createElement("div",{className:"col-sm-8 main-section"},o.a.createElement("div",{className:"modal-content"},o.a.createElement("div",{className:"col-12 user-img"},o.a.createElement("img",{src:"logo.png",alt:""})),o.a.createElement("div",{className:"col-12 user-name"},o.a.createElement("h1",null,"User Login")),o.a.createElement(g,{id:"login",app:a}),o.a.createElement("div",{className:"col-12 link-part"},o.a.createElement("a",{href:"/passwordForgotten"},"Forgot Password?   "),o.a.createElement("h1",null),o.a.createElement("a",{href:"/register"}," Register")))))},v=(t(32),function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(o)))).state={selectedProtocol:"",password:"",username:""},t.changePass=function(e){t.setState({password:e}),console.log("pass set")},t.changeUsername=function(e){t.setState({username:e}),console.log("username set")},t}return Object(p.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(f,{app:this}))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.d0b0d800.chunk.js.map