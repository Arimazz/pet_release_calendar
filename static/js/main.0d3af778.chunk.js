(this.webpackJsonprelease_calendar=this.webpackJsonprelease_calendar||[]).push([[0],{82:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(0),c=a.n(r),s=a(23),i=a.n(s),o=a(50),l=a(6),u=a(20),d=a(21),h=a(27),j=a(26),b=a(10),p=a.n(b),f=a(34),O=a(51),m=a(17),v=a(89),x=a(96),g=a(90),y=a(91),w=a(92),k=a(93),D=a(94),M=a(49),S=a(95),N=a(97),L=a(30),R=a.n(L),C="71fed632d4534bfea69e3d18c9926374",z=new(function(){function e(){Object(u.a)(this,e)}return Object(d.a)(e,[{key:"requestDayGames",value:function(){var e=Object(m.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=x.a(t,"yyyy-MM-dd"),e.prev=1,e.next=4,R.a.get("https://api.rawg.io/api/games?key=".concat(C),{headers:{"Content-Type":"application/json"},params:{platforms:"4",dates:"".concat(a,",").concat(a),ordering:"-added"},timeout:3e3});case 4:return n=e.sent,e.abrupt("return",n);case 8:return e.prev=8,e.t0=e.catch(1),console.log("ERROR",e.t0),e.abrupt("return","ERROR");case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"test",value:function(){var e=Object(m.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("https://api.rawg.io/api/games?key=".concat(C),{headers:{"Content-Type":"application/json"},params:{platforms:"4",dates:"2020-12-10,2020-12-10",ordering:"-added"}});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}()),F=a(9),E=function(e){return e.gamesData},_=a(25),I=a(35),T=Object(I.b)({name:"gameData",initialState:{data:null,meta:null},reducers:{recordData:function(e,t){var a=t.data,n=a.count,r=a.next,c=a.previous,s=a.results;e.data=s,e.meta={count:n,next:r,previous:c}}}}),q=Object(F.c)({gamesData:T.reducer}),A=T.actions.recordData,G=Object(I.a)({reducer:q});console.log(G.getState());var J=function(e){var t=e.prevMonthCallback,a=e.nextMonthCallback,r=e.currentLocale,c=e.currentMonth;return Object(n.jsxs)("div",{className:"header row flex-middle",children:[Object(n.jsx)("div",{className:"col col-start",children:Object(n.jsx)("div",{className:"icon",onClick:t,children:"chevron_left"})}),Object(n.jsx)("div",{className:"col col-center",children:Object(n.jsx)("span",{children:x.a(c,"LLLL yyyy",{locale:r})})}),Object(n.jsx)("div",{className:"col col-end",children:Object(n.jsx)("div",{className:"icon",onClick:a,children:"chevron_right"})})]})},B=a(48),U=a.n(B),H=function(){return Object(n.jsx)(U.a,{type:"spin",color:"blue",className:"loading",height:20,width:20})},K=function(e){var t=e.rows;return Object(r.useMemo)((function(){return t.length>0?Object(n.jsx)("div",{className:"body",children:t.map((function(e,t){return Object(n.jsx)("div",{className:"row",children:e.map((function(e){var t=e.isDisabled,a=e.day,r=e.formattedDate,c=e.data,s=e.isLoading;return Object(n.jsxs)("div",{className:"col cell ".concat(t?"disabled":""),onClick:Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),children:[Object(n.jsx)("span",{className:"number",children:r}),Object(n.jsx)("span",{className:"bg",children:r}),s&&Object(n.jsx)(H,{}),c&&c.map((function(e){return Object(n.jsx)("div",{children:Object(n.jsx)("span",{className:"game-title ".concat(e.isInteresting&&"game-title-heavy"),children:e.name})},e.name)}))]},String(a))}))},t)}))}):Object(n.jsx)(H,{})}),[t])},P=function(e){Object(h.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={currentMonth:new Date,selectedDate:new Date,currentLocale:N.a,days:[],rows:[],arr:[!1,!1,!1,!1,!1],isStartLoading:!1,isFreezing:!1},e.fillDays=function(){for(var t=e.state.currentLocale,a=[],n=v.a(e.state.currentMonth),r=0;r<7;r++)a.push(x.a(g.a(n,r),"iiii",{locale:t}));e.setState({days:a})},e.fillRows=function(){for(var t=e.state.currentMonth,a=y.a(t),n=w.a(a),r=v.a(a),c=k.a(n),s=[],i=[],o=r,l="";o<=c;){for(var u=0;u<7;u++){l=x.a(o,"d");var d=o;i.push({day:d,formattedDate:l,isDisabled:!D.a(o,a),data:null,isLoading:D.a(o,a)}),o=g.a(o,1)}s.push(i),i=[]}e.setState({rows:s})},e.getMonthData=Object(m.a)(p.a.mark((function t(){var a,n,r,c,s,i,o,l;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.state.rows,e.setState({isStartLoading:!0,isFreezing:!0}),n=0;case 3:if(!(n<a.length)){t.next=19;break}r=a[n],c=0;case 6:if(!(c<r.length)){t.next=16;break}if((s=Object(O.a)({},r[c])).isDisabled){t.next=13;break}return t.next=11,z.requestDayGames(s.day);case 11:"ERROR"!==(i=t.sent)?(s.isLoading=!1,s.data=null===i||void 0===i?void 0:i.data.results.slice(0,5).map((function(e){return{name:e.name,isInteresting:e.added>5}})),(o=Object(f.a)(a))[n][c]=s,e.setState({rows:o})):(s.isLoading=!1,s.data=[{name:"ERROR",isInteresting:!0}],(l=Object(f.a)(a))[n][c]=s,e.setState({rows:l}));case 13:c++,t.next=6;break;case 16:n++,t.next=3;break;case 19:e.setState({isFreezing:!1});case 20:case"end":return t.stop()}}),t)}))),e.onDateClick=function(t){e.setState({selectedDate:t})},e.nextMonth=function(){e.state.isFreezing||e.setState({currentMonth:M.a(e.state.currentMonth,1),rows:[],isStartLoading:!1,isFreezing:!1})},e.prevMonth=function(){e.state.isFreezing||e.setState({currentMonth:S.a(e.state.currentMonth,1),rows:[],isStartLoading:!1,isFreezing:!1})},e.test=Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.fillDays(),this.fillRows()}},{key:"componentDidUpdate",value:function(e,t){var a=this.state,n=a.currentMonth,r=a.rows;!a.isStartLoading&&r.length>0&&this.getMonthData(),n!==t.currentMonth&&(this.fillDays(),this.fillRows())}},{key:"renderDays",value:function(){var e=this.state.days;return Object(n.jsx)("div",{className:"days row",children:e.length>0&&e.map((function(e){return Object(n.jsx)("div",{className:"col col-center",children:e},String(e))}))})}},{key:"render",value:function(){var e=this.state,t=e.currentLocale,a=e.currentMonth,r=e.rows;return Object(n.jsxs)("div",{className:"calendar",children:[Object(n.jsx)("button",{style:{height:"20px"},onClick:this.test,children:Object(n.jsx)("span",{children:"TEST"})}),Object(n.jsx)(J,{currentLocale:t,currentMonth:a,nextMonthCallback:this.nextMonth,prevMonthCallback:this.prevMonth}),this.renderDays(),Object(n.jsx)(K,{rows:r})]})}}]),a}(c.a.Component),Q=Object(_.b)((function(e){return{gamesData:E(e)}}),(function(e){return Object(F.b)({recordData:A},e)}))(P),V=(a(82),function(e){Object(h.a)(a,e);var t=Object(j.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("header",{children:Object(n.jsxs)("div",{id:"logo",children:[Object(n.jsx)("span",{className:"icon",children:"date_range"}),Object(n.jsxs)("span",{children:["react",Object(n.jsx)("b",{children:"calendar"})]})]})}),Object(n.jsx)("div",{className:"calendar-wrap",children:Object(n.jsx)(Q,{})})]})}}]),a}(r.Component)),W=function(){return Object(n.jsx)(o.a,{children:Object(n.jsxs)(l.d,{children:[Object(n.jsx)(l.b,{path:"/",children:Object(n.jsx)(V,{})}),Object(n.jsx)(l.a,{to:"/"})]})})};a(86);i.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(_.a,{store:G,children:Object(n.jsx)(W,{})})}),document.getElementById("root"))}},[[87,1,2]]]);
//# sourceMappingURL=main.0d3af778.chunk.js.map