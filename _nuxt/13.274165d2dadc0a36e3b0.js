(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{215:function(e,t,l){var content=l(225);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(15).default)("cc6ac9b0",content,!0,{sourceMap:!1})},217:function(e,t,l){"use strict";var n={components:{AtomLinkTo:l(65).a},props:{type:{type:String,default:()=>null},list:{type:Array,default:()=>[]}},computed:{styleClasses(){const e={};return e[`type--${this.type}`]=this.type,e}},methods:{getUrl(e){return"$i18n"in this?this.localePath(e.url):e.url}}},o=(l(224),l(5)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ul",{directives:[{name:"font",rawName:"v-font",value:e.$getFont("Raleway"),expression:"$getFont('Raleway')"}],staticClass:"molecule-link-list",class:e.styleClasses},[e._t("default",(function(){return e._l(e.list,(function(t){return l("li",{key:t.title},[l("atom-link-to",{attrs:{url:e.getUrl(t)}},[e._v("\n        "+e._s(t.title)+"\n      ")])],1)}))}))],2)}),[],!1,null,null,null);t.a=component.exports},224:function(e,t,l){"use strict";l(215)},225:function(e,t,l){var n=l(14)((function(i){return i[1]}));n.push([e.i,".molecule-link-list.type--page-menu-links{padding:0;margin:0;list-style:none}.molecule-link-list.type--page-menu-links li{display:block;font-size:8.53333vw;line-height:2em}@media (min-width:576px){.molecule-link-list.type--page-menu-links li{font-size:32px}}@media (min-width:992px){.molecule-link-list.type--page-menu-links li{font-size:36px}}.molecule-link-list.type--page-menu-links li a{color:#000;text-decoration:none;opacity:.6}.molecule-link-list.type--page-menu-links li a.nuxt-link-exact-active{opacity:1}.type--page-menu-links .molecule-link-list.type--page-menu-links{line-height:1;text-align:center}.type--page-menu-links .molecule-link-list.type--page-menu-links li{display:inline-block;margin:0 2.66667vw;font-size:5.86667vw;line-height:1.5em}@media (min-width:576px){.type--page-menu-links .molecule-link-list.type--page-menu-links li{margin:0 10px;font-size:22px}}@media (min-width:992px){.type--page-menu-links .molecule-link-list.type--page-menu-links li{font-size:26px}}.molecule-link-list.type--page-footer{padding:0;margin:0;list-style:none}@media (max-width:991px){.molecule-link-list.type--page-footer{text-align:center}}.molecule-link-list.type--page-footer li{display:inline-block;margin-right:2.66667vw;font-size:4.26667vw;line-height:2em}@media (min-width:576px){.molecule-link-list.type--page-footer li{font-size:16px}}.molecule-link-list.type--page-footer li a{color:#000;text-decoration:none;opacity:.6}.molecule-link-list.type--page-footer li a.nuxt-link-exact-active{opacity:1}",""]),n.locals={},e.exports=n},236:function(e,t,l){var content=l(257);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(15).default)("4426b2a0",content,!0,{sourceMap:!1})},256:function(e,t,l){"use strict";l(236)},257:function(e,t,l){var n=l(14)((function(i){return i[1]}));n.push([e.i,".page-footer{padding:5.33333% 0;margin:0}@media (min-width:576px){.page-footer{padding:20px 0}}.page-footer{background:#eee}",""]),n.locals={},e.exports=n},271:function(e,t,l){"use strict";l.r(t);var n=l(63),o=l(217),r={components:{LayoutDefaultContainer:n.a,LinkList:o.a},props:{options:{type:Object,default:()=>({})},navigation:{type:Array,default:()=>[]}}},c=(l(256),l(5)),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("layout-default-container",{staticClass:"page-footer",attrs:{tag:"footer"}},[l("nav",[l("link-list",{attrs:{list:e.navigation,type:"page-footer"}})],1)])}),[],!1,null,null,null);t.default=component.exports}}]);