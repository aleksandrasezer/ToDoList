(this.webpackJsonpts_project_01=this.webpackJsonpts_project_01||[]).push([[0],{67:function(t,e,i){},68:function(t,e,i){},74:function(t,e,i){"use strict";i.r(e);var n=i(0),a=i.n(n),c=i(9),o=i.n(c);i(67),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i(68);var s,l=i(27),r=i(115),d=i(105),u=i(5),j=a.a.memo((function(t){console.log("AddItemForm");var e=Object(n.useState)(""),i=Object(l.a)(e,2),a=i[0],c=i[1],o=Object(n.useState)(null),s=Object(l.a)(o,2),j=s[0],b=s[1],O=function(){var e=a.trim();e?(t.addItem(e),c("")):b("title is required")};return Object(u.jsxs)("div",{children:[Object(u.jsx)(r.a,{label:"Title",onBlur:function(){return b(null)},variant:"outlined",error:!!j,value:a,onChange:function(t){c(t.currentTarget.value)},onKeyPress:function(t){null!==j&&b(null),"Enter"===t.key&&O()},helperText:j}),Object(u.jsx)(d.a,{color:"primary",onClick:O,fontSize:"large"})]})})),b=a.a.memo((function(t){console.log("editable span");var e=Object(n.useState)(!1),i=Object(l.a)(e,2),a=i[0],c=i[1],o=Object(n.useState)(t.title),s=Object(l.a)(o,2),d=s[0],j=s[1];return a?Object(u.jsx)(r.a,{value:d,label:"Title",onChange:function(t){j(t.currentTarget.value)},onBlur:function(){c(!1),t.changeTitle(d)},autoFocus:!0}):Object(u.jsx)("span",{onDoubleClick:function(){return c(!0)},children:t.title})})),O=i(106),T=i(108),f=i(107),h=i(116),L=a.a.memo((function(t){console.log("tasks");var e=Object(n.useCallback)((function(){t.removeTask(t.task.id,t.todoListId)}),[t]),i=Object(n.useCallback)((function(e){t.changeTaskStatus(t.task.id,e.currentTarget.checked,t.todoListId)}),[t.task.id,t.todoListId]),a=Object(n.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todoListId)}),[t.task.id,t.todoListId]);return Object(u.jsxs)("li",{style:{paddingLeft:"0px",listStyle:"none"},children:[Object(u.jsxs)("span",{className:t.task.isDone?"isDone":"",children:[Object(u.jsx)(h.a,{size:"small",color:"primary",onChange:i,checked:t.task.isDone}),Object(u.jsx)(b,{title:t.task.title,changeTitle:a})]}),Object(u.jsx)(O.a,{"aria-label":"delete",size:"small",onClick:e,children:Object(u.jsx)(f.a,{})})]},t.task.id)})),k=a.a.memo((function(t){console.log("todoList");var e=t.tasks,i=e;"active"===t.filter&&(i=e.filter((function(t){return!t.isDone}))),"completed"===t.filter&&(i=e.filter((function(t){return t.isDone})));var a=t.filter,c=i.map((function(e){return Object(u.jsx)(L,{task:e,todoListId:t.todoListId,addTask:t.addTask,removeTask:t.removeTask,changeTaskStatus:t.changeTaskStatus,changeTaskTitle:t.changeTaskTitle},e.id)})),o=Object(n.useCallback)((function(){return t.changeFilter("all",t.todoListId)}),[t.changeFilter,t.todoListId]),s=Object(n.useCallback)((function(){return t.changeFilter("active",t.todoListId)}),[t.changeFilter,t.todoListId]),l=Object(n.useCallback)((function(){return t.changeFilter("completed",t.todoListId)}),[t.changeFilter,t.todoListId]),r=Object(n.useCallback)((function(){return t.removeTodoList(t.todoListId)}),[t.removeTodoList,t.todoListId]),d=Object(n.useCallback)((function(e){return t.addTask(e,t.todoListId)}),[t.addTask,t.todoListId]),h=Object(n.useCallback)((function(e){t.changeTodoListTitle(t.todoListId,e)}),[t.changeTodoListTitle,t.todoListId]);return Object(u.jsxs)("div",{children:[Object(u.jsxs)("h3",{children:[Object(u.jsx)(b,{title:t.title,changeTitle:h}),Object(u.jsx)(O.a,{onClick:r,"aria-label":"delete",size:"small",children:Object(u.jsx)(f.a,{})})]}),Object(u.jsx)(j,{addItem:d}),Object(u.jsx)("ul",{children:c}),Object(u.jsxs)("div",{children:[Object(u.jsx)(T.a,{style:{marginLeft:"3px"},size:"small",variant:"all"===a?"outlined":"contained",color:"primary",onClick:o,children:"All"}),Object(u.jsx)(T.a,{style:{marginLeft:"3px"},size:"small",variant:"active"===a?"outlined":"contained",color:"primary",onClick:s,children:"Active"}),Object(u.jsx)(T.a,{style:{marginLeft:"3px"},size:"small",variant:"completed"===a?"outlined":"contained",color:"primary",onClick:l,children:"Completed"})]})]})})),I=i(109),m=i(110),v=i(112),g=i(113),p=i(114),x=i(75),C=i(111),D=i(11),S=i(38),_=i(117),y=Object(_.a)(),A=Object(_.a)(),E=[{id:y,title:"What to learn",filter:"all"},{id:A,title:"What to buy",filter:"all"}],w=i(18),F=(s={},Object(w.a)(s,y,[{id:Object(_.a)(),title:"HTML",isDone:!0},{id:Object(_.a)(),title:"CSS",isDone:!0},{id:Object(_.a)(),title:"React",isDone:!1}]),Object(w.a)(s,A,[{id:Object(_.a)(),title:"milk",isDone:!0},{id:Object(_.a)(),title:"bread",isDone:!1},{id:Object(_.a)(),title:"eggs",isDone:!1}]),s),N=i(26);var H=function(){var t=Object(N.c)((function(t){return t.todoLists})),e=Object(N.c)((function(t){return t.tasks})),i=Object(N.b)(),a=Object(n.useCallback)((function(t,e){i(function(t,e){return{type:"REMOVE_TASK",taskId:t,todoListId:e}}(t,e))}),[i]),c=Object(n.useCallback)((function(t,e){i(function(t,e){return{type:"ADD_TASK",newTitle:t,todoListId:e}}(t,e))}),[i]),o=Object(n.useCallback)((function(t,e,n){i(function(t,e,i){return{type:"CHANGE_TASK_STATUS",taskId:t,newIsDoneValue:e,todoListId:i}}(t,e,n))}),[i]),s=Object(n.useCallback)((function(t,e,n){i(function(t,e,i){return{type:"CHANGE_TASK_TITLE",taskId:t,newTitle:e,todoListId:i}}(t,e,n))}),[i]),l=Object(n.useCallback)((function(t,e){i(function(t,e){return{type:"CHANGE_TODOLIST_TITLE",todoListId:t,newTitle:e}}(t,e))}),[i]),r=Object(n.useCallback)((function(t,e){i(function(t,e){return{type:"CHANGE_FILTER",todoListId:e,value:t}}(t,e))}),[i]),d=Object(n.useCallback)((function(t){var e=function(t){return{type:"REMOVE_TODOLIST",todoListId:t}}(t);i(e)}),[i]),b=Object(n.useCallback)((function(t){var e=function(t){return{type:"ADD_TODOLIST",title:t,todoListId:Object(_.a)()}}(t);i(e)}),[i]);return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(I.a,{position:"static",children:Object(u.jsxs)(m.a,{children:[Object(u.jsx)(O.a,{color:"inherit",children:Object(u.jsx)(C.a,{})}),Object(u.jsx)(v.a,{variant:"h2",children:"Todo-Lists"})]})}),Object(u.jsxs)(g.a,{fixed:!0,children:[Object(u.jsx)(p.a,{container:!0,style:{padding:"20px 0"},children:Object(u.jsx)(j,{addItem:b})}),Object(u.jsx)(p.a,{container:!0,spacing:3,children:t.map((function(t){var i=e[t.id];return Object(u.jsx)(p.a,{item:!0,children:Object(u.jsx)(x.a,{style:{padding:"10px"},children:Object(u.jsx)(k,{todoListId:t.id,title:t.title,filter:t.filter,addTask:c,tasks:i,removeTask:a,changeFilter:r,changeTaskStatus:o,removeTodoList:d,changeTaskTitle:s,changeTodoListTitle:l})})},t.id)}))})]})]})},K=i(46),G=Object(K.a)({todoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE_TODOLIST":return t.filter((function(t){return t.id!==e.todoListId}));case"ADD_TODOLIST":return[].concat(Object(S.a)(t),[{id:e.todoListId,title:e.title,filter:"all"}]);case"CHANGE_TODOLIST_TITLE":return t.map((function(t){return t.id===e.todoListId?Object(D.a)(Object(D.a)({},t),{},{title:e.newTitle}):t}));case"CHANGE_FILTER":return t.map((function(t){return t.id===e.todoListId?Object(D.a)(Object(D.a)({},t),{},{filter:e.value}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE_TASK":return Object(D.a)(Object(D.a)({},t),{},Object(w.a)({},e.todoListId,t[e.todoListId].filter((function(t){return t.id!==e.taskId}))));case"ADD_TASK":var i={id:Object(_.a)(),title:e.newTitle,isDone:!1};return Object(D.a)(Object(D.a)({},t),{},Object(w.a)({},e.todoListId,[i].concat(Object(S.a)(t[e.todoListId]))));case"CHANGE_TASK_STATUS":return Object(D.a)(Object(D.a)({},t),{},Object(w.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(D.a)(Object(D.a)({},t),{},{isDone:e.newIsDoneValue}):t}))));case"CHANGE_TASK_TITLE":return Object(D.a)(Object(D.a)({},t),{},Object(w.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(D.a)(Object(D.a)({},t),{},{title:e.newTitle}):t}))));case"ADD_TODOLIST":return Object(D.a)(Object(D.a)({},t),{},Object(w.a)({},e.todoListId,[]));case"REMOVE_TODOLIST":var n=Object(D.a)({},t);return delete n[e.todoListId],n;default:return t}}}),R=Object(K.b)(G);o.a.render(Object(u.jsx)(N.a,{store:R,children:Object(u.jsx)(H,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[74,1,2]]]);
//# sourceMappingURL=main.853ce76e.chunk.js.map