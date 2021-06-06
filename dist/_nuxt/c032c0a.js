/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6,13],{286:function(t,e,n){"use strict";n.r(e);var o=n(279);n.d(e,"default",(function(){return o.a}));o.a.registerVersion("firebase","8.6.3","app")},287:function(t,e,n){var content=n(296);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(62).default)("342a18c7",content,!0,{sourceMap:!1})},295:function(t,e,n){"use strict";n(287)},296:function(t,e,n){var o=n(61)(!1);o.push([t.i,"*[data-v-200ce1a8],[data-v-200ce1a8]:after,[data-v-200ce1a8]:before{box-sizing:border-box}ol[class][data-v-200ce1a8],ul[class][data-v-200ce1a8]{padding:0}blockquote[data-v-200ce1a8],body[data-v-200ce1a8],dd[data-v-200ce1a8],dl[data-v-200ce1a8],figcaption[data-v-200ce1a8],figure[data-v-200ce1a8],h1[data-v-200ce1a8],h2[data-v-200ce1a8],h3[data-v-200ce1a8],h4[data-v-200ce1a8],li[data-v-200ce1a8],ol[class][data-v-200ce1a8],p[data-v-200ce1a8],ul[class][data-v-200ce1a8]{margin:0}html[data-v-200ce1a8]{scroll-behavior:smooth}body[data-v-200ce1a8]{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}ol[class][data-v-200ce1a8],ul[class][data-v-200ce1a8]{list-style:none}a[data-v-200ce1a8]:not([class]){-webkit-text-decoration-skip:ink;text-decoration-skip-ink:auto}img[data-v-200ce1a8]{max-width:100%;display:block}article>*+*[data-v-200ce1a8]{margin-top:1em}button[data-v-200ce1a8],input[data-v-200ce1a8],select[data-v-200ce1a8],textarea[data-v-200ce1a8]{font:inherit}input[data-v-200ce1a8],textarea[data-v-200ce1a8]{outline:none}@media (prefers-reduced-motion:reduce){*[data-v-200ce1a8]{-webkit-animation-duration:.01ms!important;animation-duration:.01ms!important;-webkit-animation-iteration-count:1!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}input[data-v-200ce1a8]::-webkit-inner-spin-button,input[data-v-200ce1a8]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number][data-v-200ce1a8]{-moz-appearance:textfield}.content[data-v-200ce1a8]{height:100%}.content[data-v-200ce1a8],.info[data-v-200ce1a8]{width:100%}.info__actions[data-v-200ce1a8]{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:30px;align-items:center;margin:20px 0}.info__items[data-v-200ce1a8]{display:grid;grid-template-columns:1fr;grid-gap:20px}",""]),t.exports=o},307:function(t,e,n){"use strict";n.r(e);var o=n(17),r=(n(2),n(46),n(286)),c={name:"Info",data:function(){return{info:null,additional:{name:"",count:null,cost:null}}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getUserInfo();case 2:case"end":return e.stop()}}),e)})))()},computed:{summary:function(){return+this.additional.count*+this.additional.cost},fields:function(){return[{label:"Наименование",key:"name"},{label:"Количество",key:"count"},{label:"Стоимость",key:"cost"},{label:"Сумма",key:"sum"}]}},methods:{createInvoice:function(){this.$router.push("/invoice/".concat(this.$route.params.id))},disableContract:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$fire.firestore.collection("guest").doc(t.$route.params.id);case 2:return n=e.sent,e.prev=3,n.update({"invoice.dailyServices":{breakfast:!1,cleaning:!1,dinner:!1,lunch:!1},rooms:{current:null,number:null,days:null},"invoice.additionalServices":[]}),e.next=7,t.getUserInfo();case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),t.showToast(e.t0,"Ошибка");case 12:case"end":return e.stop()}}),e,null,[[3,9]])})))()},printContract:function(){window.open("/Dogovor-o-predostavlenii-gostinichnyh-uslug.pdf").print()},addAdditionalService:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.additional).sum=t.summary,e.next=4,t.$fire.firestore.collection("guest").doc(t.$route.params.id);case 4:return o=e.sent,e.prev=5,o.update({"invoice.additionalServices":r.default.firestore.FieldValue.arrayUnion(n)}),e.next=9,t.getUserInfo();case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(5),t.showToast(e.t0,"Ошибка");case 14:case"end":return e.stop()}}),e,null,[[5,11]])})))()},totalSum:function(t){var e=0;return t.length?(t.forEach((function(t){e+=+t.sum})),e):e},getUserInfo:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$fire.firestore.collection("guest").doc(t.$route.params.id);case 2:return n=e.sent,e.prev=3,e.next=6,n.get();case 6:o=e.sent,t.info=o.data(),n.onSnapshot((function(e){t.info=e.data()})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),t.showToast(e.t0,"Ошибка");case 14:case"end":return e.stop()}}),e,null,[[3,11]])})))()}}},d=(n(295),n(63)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.info?n("div",{staticClass:"content"},[n("div",{staticClass:"info"},[n("div",{staticClass:"info__actions"},[t.info.rooms.number?n("b-btn",{attrs:{variant:"outline-danger"},on:{click:function(e){return t.createInvoice()}}},[t._v("\n        Выставить счет\n      ")]):t._e(),t._v(" "),t.info.rooms.number?n("b-btn",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-off-contract",modifiers:{"modal-off-contract":!0}}],attrs:{variant:"outline-danger"}},[t._v("\n        Завершить договор\n      ")]):t._e(),t._v(" "),t.info.rooms.number?n("b-btn",{attrs:{variant:"outline-info"},on:{click:function(e){return t.printContract()}}},[t._v("\n        Распечатать договор\n      ")]):t._e(),t._v(" "),t.info.rooms.number?n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-add",modifiers:{"modal-add":!0}}],attrs:{variant:"outline-info"}},[t._v("\n        Добавить доп. сервис\n      ")]):t._e()],1),t._v(" "),n("div",{staticClass:"info__items"},[n("div",{staticClass:"info__item"},[t._v("\n        ФИО: "+t._s(t.info.profile.fio)+"\n      ")]),t._v(" "),t.info.rooms.number?n("div",{staticClass:"info__item"},[t._v("\n        Номер: "+t._s(t.info.rooms.number)+"\n      ")]):t._e(),t._v(" "),t.info.rooms.days?n("div",{staticClass:"info__item"},[t._v("\n        Количество дней: "+t._s(t.info.rooms.days)+"\n      ")]):t._e(),t._v(" "),n("div",{staticClass:"info__item"},[t._v("\n        Телефон: "+t._s(t.info.profile.phone)+"\n      ")]),t._v(" "),n("div",{staticClass:"info__item"},[t._v("\n        Пасспортные данные: "+t._s(t.info.profile.passportDetails)+"\n      ")]),t._v(" "),n("div",{staticClass:"info__item"},[t._v("\n        Место регистрации: "+t._s(t.info.profile.placeOfRegistration)+"\n      ")]),t._v(" "),t.info.invoice.dailyServices&&t.info.rooms.number?n("div",{staticClass:"info__item"},[t._v("\n        Дневные сервисы:\n        "),n("ul",[n("li",[t._v("\n            Завтрак:\n            "),t.info.invoice.dailyServices.breakfast?n("span",[t._v("\n              Да\n            ")]):n("span",[t._v("\n              Нет\n            ")])]),t._v(" "),n("li",[t._v("\n            Обед:\n            "),t.info.invoice.dailyServices.lunch?n("span",[t._v("\n              Да\n            ")]):n("span",[t._v("\n              Нет\n            ")])]),t._v(" "),n("li",[t._v("\n            Ужин:\n            "),t.info.invoice.dailyServices.dinner?n("span",[t._v("\n              Да\n            ")]):n("span",[t._v("\n              Нет\n            ")])]),t._v(" "),n("li",[t._v("\n            Уборка:\n            "),t.info.invoice.dailyServices.cleaning?n("span",[t._v("\n              Да\n            ")]):n("span",[t._v("\n              Нет\n            ")])])])]):t._e(),t._v(" "),t.info.rooms.number?n("div",{staticClass:"info__item"},[t._m(0),t._v(" "),n("b-table",{attrs:{fields:t.fields,items:t.info.invoice.additionalServices}})],1):t._e(),t._v(" "),t.info.invoice.additionalServices.length?n("div",{staticClass:"info__item"},[t._v("\n        Итого: "+t._s(t.totalSum(t.info.invoice.additionalServices))+"\n      ")]):t._e()])]),t._v(" "),n("b-modal",{attrs:{id:"modal-add",centered:"",title:"Добавить дополнительный сервис"},on:{ok:t.addAdditionalService}},[n("div",[n("div",{staticClass:"info__items"},[n("b-form-input",{attrs:{placeholder:"Введите наименовение"},model:{value:t.additional.name,callback:function(e){t.$set(t.additional,"name",e)},expression:"additional.name"}}),t._v(" "),n("b-form-input",{attrs:{type:"number",placeholder:"Введите количество"},model:{value:t.additional.count,callback:function(e){t.$set(t.additional,"count",e)},expression:"additional.count"}}),t._v(" "),n("b-form-input",{attrs:{type:"number",placeholder:"Введите стоимость"},model:{value:t.additional.cost,callback:function(e){t.$set(t.additional,"cost",e)},expression:"additional.cost"}})],1)])]),t._v(" "),n("b-modal",{attrs:{id:"modal-off-contract",centered:"",title:"Подтвердите действие"},on:{ok:function(e){return t.disableContract()}}},[t._v("\n    Вы уверены ?\n  ")])],1):t._e()}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info__actions"},[n("span",[t._v("\n            Дополнительные сервисы:\n          ")])])}],!1,null,"200ce1a8",null);e.default=component.exports}}]);