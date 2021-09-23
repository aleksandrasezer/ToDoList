(this.webpackJsonpts_project_01=this.webpackJsonpts_project_01||[]).push([[0],{107:function(e,t,n){},108:function(e,t,n){},134:function(e,t,n){"use strict";n.r(t);var a,c,i=n(0),r=n.n(i),s=n(10),o=n.n(s),l=(n(107),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))}),d=(n(108),n(178)),u=n(179),j=n(17),b=n(8),O=n(59),f=n(51),h=n.n(f),p=h.a.create(Object(b.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"fd7ee122-ff59-4cee-b5b0-6226ee5b433c"}})),g=function(){return p.get("todo-lists")},m=function(e){return p.post("todo-lists",{title:e})},T=function(e){return p.delete("todo-lists/".concat(e))},v=function(e,t){return p.put("todo-lists/".concat(e),{title:t})},x=function(e){return p.get("todo-lists/".concat(e,"/tasks"))},k=function(e,t){return p.delete("todo-lists/".concat(e,"/tasks/").concat(t))},I=function(e,t){return p.post("todo-lists/".concat(e,"/tasks"),{title:t})},S=function(e,t,n){return p.put("todo-lists/".concat(e,"/tasks/").concat(t),n)};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(a||(a={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(c||(c={}));var C=n(35),y=n.n(C),E=n(45),L=h.a.create(Object(b.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"fd7ee122-ff59-4cee-b5b0-6226ee5b433c"}})),A=function(e,t,n){return L.post("auth/login",{email:e,password:t,rememberMe:n})},w=function(){return L.delete("auth/login")},D=function(){return L.get("auth/me")},P={isLoggedIn:!1},N=function(e){return{type:"AUTH/SET-IS-LOGGED-IN",isLoggedIn:e}},F={status:"idle",error:null,isInitialized:!1},_=function(e){return{type:"APP/SET-STATUS",status:e}},R=function(e){return{type:"APP/SET-IS-INITIALIZED",isInitialized:e}},M=function(e){return{type:"APP/SET-ERROR",error:e}},U=[],K=function(e,t){return{type:"SET-TODOLIST-STATUS",id:e,status:t}},G=n(34),H={},z=function(e,t,n){return function(a,c){a(_("loading")),a(K(n,"loading"));var i=c().tasks[n].find((function(t){return t.id===e}));if(i){var r=Object(b.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},t);S(n,e,r).then((function(c){var i=function(e,t,n){return{type:"UPDATE-TASK",model:t,todolistId:n,taskId:e}}(e,t,n);a(i)})),a(_("succeeded")),a(K(n,"succeeded"))}else console.warn("task not found in the state")}},V=n(173),Z=n(135),B=n(42),q=n(180),J=n(169),W=n(170),Y=n(2),Q=r.a.memo((function(e){console.log("AddItemForm called");var t=Object(i.useState)(""),n=Object(B.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(null),s=Object(B.a)(r,2),o=s[0],l=s[1],d=e.disabled?{color:"grey"}:{color:"green"},u=function(){""!==a.trim()?(e.addItem(a),c("")):l("Title is required")};return Object(Y.jsxs)("div",{children:[Object(Y.jsx)(q.a,{variant:"outlined",error:!!o,value:a,onChange:function(e){c(e.currentTarget.value)},onKeyPress:function(e){null!==o&&l(null),13===e.charCode&&u()},label:"Title",helperText:o}),Object(Y.jsx)(J.a,{style:d,onClick:u,disabled:e.disabled,children:Object(Y.jsx)(W.a,{fontSize:"large"})})]})})),$=r.a.memo((function(e){console.log("EditableSpan called");var t=Object(i.useState)(!1),n=Object(B.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(e.value),s=Object(B.a)(r,2),o=s[0],l=s[1];return a?Object(Y.jsx)(q.a,{value:o,onChange:function(e){l(e.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),e.onChange(o)}}):Object(Y.jsx)("span",{onDoubleClick:function(){c(!0),l(e.value)},children:e.value})})),X=n(172),ee=n(171),te=n(182),ne=r.a.memo((function(e){var t=Object(i.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),n="loading"===e.listStatus,c=n?{color:"grey"}:{color:"darkred"},r=n?{color:"grey"}:{color:"green"},s=Object(i.useCallback)((function(t){var n=t.currentTarget.checked;e.changeTaskStatus(e.task.id,n?a.Completed:a.New,e.todolistId)}),[e.task.id,e.todolistId]),o=Object(i.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.task.id,e.todolistId]);return Object(Y.jsxs)("div",{className:e.task.status===a.Completed?"is-done":"",children:[Object(Y.jsx)(te.a,{checked:e.task.status===a.Completed,style:r,onChange:s,disabled:n}),Object(Y.jsx)($,{value:e.task.title,onChange:o}),Object(Y.jsx)(J.a,{onClick:t,disabled:n,style:c,children:Object(Y.jsx)(ee.a,{})})]},e.task.id)})),ae=r.a.memo((function(e){console.log("Todolist called");var t=Object(j.b)();Object(i.useEffect)((function(){var n,a=(n=e.tl.id,function(e){e(_("loading")),x(n).then((function(t){var a=function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}}(t.data.items,n);e(a),e(_("succeeded"))})).catch((function(){e(_("failed"))}))});t(a)}),[]);var n=Object(i.useCallback)((function(t){e.addTask(t,e.tl.id)}),[e.addTask,e.tl.id]),c=Object(i.useCallback)((function(t){e.changeTodolistTitle(e.tl.id,t)}),[e.tl.id,e.changeTodolistTitle]),r=Object(i.useCallback)((function(){return e.changeFilter("all",e.tl.id)}),[e.tl.id,e.changeFilter]),s=Object(i.useCallback)((function(){return e.changeFilter("active",e.tl.id)}),[e.tl.id,e.changeFilter]),o=Object(i.useCallback)((function(){return e.changeFilter("completed",e.tl.id)}),[e.tl.id,e.changeFilter]),l="loading"===e.tl.status,d=l?{color:"grey"}:{color:"darkred"},u=e.tasks;return"active"===e.tl.filter&&(u=e.tasks.filter((function(e){return e.status===a.New}))),"completed"===e.tl.filter&&(u=e.tasks.filter((function(e){return e.status===a.Completed}))),Object(Y.jsxs)("div",{children:[Object(Y.jsxs)("h3",{children:[Object(Y.jsx)($,{value:e.tl.title,onChange:c}),Object(Y.jsx)(J.a,{onClick:function(){e.removeTodolist(e.tl.id)},disabled:l,style:d,children:Object(Y.jsx)(ee.a,{})})]}),Object(Y.jsx)(Q,{addItem:n,disabled:l}),Object(Y.jsx)("div",{children:u.map((function(t){return Object(Y.jsx)(ne,{task:t,todolistId:e.tl.id,removeTask:e.removeTask,changeTaskTitle:e.changeTaskTitle,changeTaskStatus:e.changeTaskStatus,listStatus:e.tl.status},t.id)}))}),Object(Y.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(Y.jsx)(X.a,{variant:"all"===e.tl.filter?"outlined":"text",onClick:r,color:"default",disabled:l,children:"All"}),Object(Y.jsx)(X.a,{variant:"active"===e.tl.filter?"outlined":"text",onClick:s,color:"primary",disabled:l,children:"Active"}),Object(Y.jsx)(X.a,{variant:"completed"===e.tl.filter?"outlined":"text",onClick:o,color:"secondary",disabled:l,children:"Completed"})]})]})})),ce=function(){var e=Object(j.c)((function(e){return e.todolists})),t=Object(j.c)((function(e){return e.tasks})),n=Object(j.b)();Object(i.useEffect)((function(){var e=function(e){e(_("loading")),g().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(_("succeeded"))})).catch((function(){e(_("failed"))}))};n(e)}),[n]);var a=Object(i.useCallback)((function(e,t){var a=function(e,t){return function(n){n(_("loading")),n(K(t,"loading")),k(t,e).then((function(){var a=function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(e,t);n(a),n(_("succeeded")),n(K(t,"succeeded"))})).catch((function(){n(K(t,"failed"))}))}}(e,t);n(a)}),[n]),c=Object(i.useCallback)((function(e,t){var a=function(e,t){return function(n){n(_("loading")),n(K(t,"loading")),I(t,e).then((function(e){if(0===e.data.resultCode){n(_("succeeded")),n(K(t,"succeeded"));var a=e.data.data.item;n(function(e){return{type:"ADD-TASK",task:e}}(a))}else e.data.messages.length?(n(_("failed")),n(K(t,"failed")),n(M(e.data.messages[0]))):(n(M("Some error occurred")),n(K(t,"failed")))}))}}(e,t);n(a)}),[n]),r=Object(i.useCallback)((function(e,t,a){var c=z(e,{status:t},a);n(c)}),[n]),s=Object(i.useCallback)((function(e,t,a){var c=z(e,{title:t},a);n(c)}),[n]),o=Object(i.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};n(a)}),[n]),l=Object(i.useCallback)((function(e){var t,a=(t=e,function(e){e(_("loading")),e(K(t,"loading")),T(t).then((function(){e({type:"REMOVE-TODOLIST",id:t}),e(_("succeeded")),e(K(t,"succeeded"))})).catch((function(){e(K(t,"failed"))}))});n(a)}),[n]),d=Object(i.useCallback)((function(e,t){var a=function(e,t){return function(n){n(_("loading")),n(K(e,"loading")),v(e,t).then((function(){n(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t)),n(_("succeeded")),n(K(e,"succeeded"))})).catch((function(){n(_("failed")),n(K(e,"failed"))}))}}(e,t);n(a)}),[n]),u=Object(i.useCallback)((function(e){var t=function(e){return function(t){t(_("loading")),m(e).then((function(e){t({type:"ADD-TODOLIST",todolist:e.data.data.item}),t(_("succeeded"))})).catch((function(){t(_("failed"))}))}}(e);n(t)}),[n]);return Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(V.a,{container:!0,style:{padding:"20px"},children:Object(Y.jsx)(Q,{addItem:u,disabled:!1})}),Object(Y.jsx)(V.a,{container:!0,spacing:3,children:e.map((function(e){var n=t[e.id];return Object(Y.jsx)(V.a,{item:!0,children:Object(Y.jsx)(Z.a,{style:{padding:"10px"},children:Object(Y.jsx)(ae,{tl:e,tasks:n,removeTask:a,changeFilter:o,addTask:c,changeTaskStatus:r,removeTodolist:l,changeTaskTitle:s,changeTodolistTitle:d})})},e.id)}))})]})},ie=n(184),re=n(181);function se(e){return Object(Y.jsx)(re.a,Object(b.a)({elevation:6,variant:"filled"},e))}function oe(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.app.error})),n=function(t,n){"clickaway"!==n&&e(M(null))};return Object(Y.jsx)(ie.a,{open:null!==t,autoHideDuration:6e3,onClose:n,children:Object(Y.jsx)(se,{onClose:n,severity:"error",children:t})})}var le=n(174),de=n(175),ue=n(177),je=n(176),be=n(87),Oe=n.n(be),fe=function(e){var t=Object(j.b)(),n=Object(i.useCallback)((function(){t(function(){var e=Object(E.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(_("loading")),e.next=3,w();case 3:0===e.sent.data.resultCode?(t(N(!1)),t(_("succeeded"))):t(_("failed"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[]);return Object(Y.jsx)(le.a,{position:"static",style:{background:"green"},children:Object(Y.jsxs)(de.a,{className:Oe.a.appMenu,children:[Object(Y.jsx)(J.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(Y.jsx)(je.a,{})}),Object(Y.jsx)(ue.a,{variant:"h6",children:"Todo-lists"}),e.isLoggedIn?Object(Y.jsx)(X.a,{color:"inherit",variant:"outlined",onClick:n,children:"Log out"}):Object(Y.jsx)("div",{})]})})},he=n(93),pe=n(14),ge=n(48),me=n(61),Te=n.n(me),ve=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.auth})).isLoggedIn,n=Object(ge.c)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email is required",e.password||(t.password="Password is required"),t},onSubmit:function(t){e(function(e){return function(){var t=Object(E.a)(y.a.mark((function t(n){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(_("loading")),t.next=3,A(e.email,e.password,e.rememberMe);case 3:0===(a=t.sent).data.resultCode?(n(N(!0)),n(_("succeeded"))):(n(M(a.data.messages[0])),n(_("failed")));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t)),n.resetForm()}});return t?Object(Y.jsx)(ce,{}):Object(Y.jsx)(ge.b,{value:n,children:Object(Y.jsx)("div",{style:{display:"flex",justifyContent:"space-around"},children:Object(Y.jsxs)(Z.a,{style:{padding:"80px"},className:Te.a.loginContainer,children:[Object(Y.jsx)("h2",{style:{color:"darkGreen"},children:" Login "}),Object(Y.jsxs)("form",{onSubmit:n.handleSubmit,children:[Object(Y.jsxs)("div",{className:Te.a.formItem,children:[Object(Y.jsx)("label",{htmlFor:"email",children:"Email"}),Object(Y.jsx)("br",{}),Object(Y.jsx)(ge.a,{type:"email",placeholder:"E-mail",error:n.touched.email?n.errors.email:null,name:"email"})]}),Object(Y.jsxs)("div",{className:Te.a.formItem,children:[Object(Y.jsx)("label",{htmlFor:"password",children:"Password"}),Object(Y.jsx)("br",{}),Object(Y.jsx)(ge.a,{type:"password",placeholder:"Password",error:n.touched.password?n.errors.password:null,name:"password"})]}),Object(Y.jsxs)("div",{children:[Object(Y.jsx)(te.a,{name:"rememberMe",style:{color:"green"}}),"Remember me"]}),Object(Y.jsx)(X.a,{type:"submit",style:{color:"green"},variant:"outlined",children:"Login"})]})]})})})},xe=n(90),ke=n.n(xe),Ie=function(){return Object(Y.jsx)("div",{className:ke.a.ldsCircle,children:Object(Y.jsx)("div",{})})};var Se=function(){var e=Object(j.c)((function(e){return e.app})),t=e.status,n=e.isInitialized,a=Object(j.c)((function(e){return e.auth.isLoggedIn})),c=Object(j.b)();return Object(i.useEffect)((function(){c(function(){var e=Object(E.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D();case 3:0===(n=e.sent).data.resultCode?t(N(!0)):t(M(n.data.messages[0])),t(R(!0)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t(R(!0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}),[]),n?Object(Y.jsxs)("div",{className:"App",children:[Object(Y.jsx)(fe,{isLoggedIn:a}),"loading"===t&&Object(Y.jsx)(d.a,{color:"secondary"}),a?Object(Y.jsx)(u.a,{fixed:!0,children:Object(Y.jsx)(he.a,{children:Object(Y.jsxs)(pe.d,{children:[Object(Y.jsx)(pe.b,{exact:!0,path:"/",render:function(){return Object(Y.jsx)(ce,{})}}),Object(Y.jsx)(pe.b,{path:"/login",render:function(){return Object(Y.jsx)(ve,{})}}),Object(Y.jsx)(pe.b,{path:"/404",render:function(){return Object(Y.jsx)("h1",{children:"404 \u0437\u0430\u043b\u0443\u043f\u0430"})}}),Object(Y.jsx)(pe.a,{from:"*",to:"/404"})]})})}):Object(Y.jsx)(ve,{}),Object(Y.jsx)(oe,{})]}):Object(Y.jsx)(Ie,{})},Ce=n(62),ye=n(92),Ee=Object(Ce.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(b.a)(Object(b.a)({},e),{},Object(G.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!==t.taskId}))));case"ADD-TASK":return Object(b.a)(Object(b.a)({},e),{},Object(G.a)({},t.task.todoListId,[t.task].concat(Object(O.a)(e[t.task.todoListId]))));case"UPDATE-TASK":return Object(b.a)(Object(b.a)({},e),{},Object(G.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(b.a)(Object(b.a)({},e),t.model):e}))));case"ADD-TODOLIST":return Object(b.a)(Object(b.a)({},e),{},Object(G.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(b.a)({},e);return delete n[t.id],n;case"SET-TODOLISTS":var a=Object(b.a)({},e);return t.todolists.forEach((function(e){a[e.id]=[]})),a;case"SET-TASKS":return Object(b.a)(Object(b.a)({},e),{},Object(G.a)({},t.todolistId,t.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":return[Object(b.a)(Object(b.a)({},t.todolist),{},{filter:"all"})].concat(Object(O.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{filter:t.filter}):e}));case"SET-TODOLIST-STATUS":return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{status:t.status}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{filter:"all"})}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(b.a)(Object(b.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(b.a)(Object(b.a)({},e),{},{error:t.error});case"APP/SET-IS-INITIALIZED":return Object(b.a)(Object(b.a)({},e),{},{isInitialized:t.isInitialized});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH/SET-IS-LOGGED-IN":return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:t.isLoggedIn});default:return e}}}),Le=Object(Ce.c)(Ee,Object(Ce.a)(ye.a));window.store=Le,o.a.render(Object(Y.jsx)(r.a.StrictMode,{children:Object(Y.jsx)(j.a,{store:Le,children:Object(Y.jsx)(Se,{})})}),document.getElementById("root")),l()},61:function(e,t,n){e.exports={loginContainer:"Login_loginContainer__3lCCv",formItem:"Login_formItem__QWWIz"}},87:function(e,t,n){e.exports={appMenu:"CustomAppBar_appMenu__NS_Tb"}},90:function(e,t,n){e.exports={ldsCircle:"Loader_ldsCircle__3Ja2e"}}},[[134,1,2]]]);
//# sourceMappingURL=main.84b3ca02.chunk.js.map