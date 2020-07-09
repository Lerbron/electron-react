module.exports=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n){e.exports=require("electron")},function(e,n){e.exports=require("path")},function(e,n,t){var r;function o(e){function t(){if(t.enabled){var e=t,o=+new Date,s=o-(r||o);e.diff=s,e.prev=r,e.curr=o,r=o;for(var i=new Array(arguments.length),a=0;a<i.length;a++)i[a]=arguments[a];i[0]=n.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var c=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,(function(t,r){if("%%"===t)return t;c++;var o=n.formatters[r];if("function"==typeof o){var s=i[c];t=o.call(e,s),i.splice(c,1),c--}return t})),n.formatArgs.call(e,i);var u=t.log||n.log||console.log.bind(console);u.apply(e,i)}}return t.namespace=e,t.enabled=n.enabled(e),t.useColors=n.useColors(),t.color=function(e){var t,r=0;for(t in e)r=(r<<5)-r+e.charCodeAt(t),r|=0;return n.colors[Math.abs(r)%n.colors.length]}(e),"function"==typeof n.init&&n.init(t),t}(n=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},n.disable=function(){n.enable("")},n.enable=function(e){n.save(e),n.names=[],n.skips=[];for(var t=("string"==typeof e?e:"").split(/[\s,]+/),r=t.length,o=0;o<r;o++)t[o]&&("-"===(e=t[o].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))},n.enabled=function(e){var t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=t(9),n.names=[],n.skips=[],n.formatters={}},function(e,n,t){const{BrowserWindow:r,app:o,globalShortcut:s,Menu:i,Tray:a,nativeTheme:c}=t(0),u=t(4),l=t(1);let p="./../resources/icon_mac.png",f="./../resources/icon_mac_light.png";u&&(p="./../resources/icon_mac.png",f="./../resources/icon_mac_light.png"),t(5)&&o.quit();let d=null;const m="darwin"===process.platform;let g=!0,h=!1,y=null;const v=()=>{g=!0,d.show()},w=()=>{if(g=!1,m)d.hide();else{if("close"==type)return void o.quit();d.minimize()}};o.on("ready",()=>{(()=>{if(m){const e=[{label:o.name,submenu:[{role:"quit"}]},{label:"View",submenu:[{role:"reload"}]}];let n=i.buildFromTemplate(e);i.setApplicationMenu(n)}else i.setApplicationMenu(null)})(),d=new r({useContentSize:!0,width:1024,height:650,minWidth:1024,minHeight:650,frame:!1,show:!1,backgroundColor:"#2e2c29",titleBarStyle:"hiddenInset",webPreferences:{webSecurity:!1,nodeIntegration:!0,webviewTag:!0}}),u?(d.loadURL("http://localhost:3000/"),d.webContents.openDevTools()):d.loadFile(l.resolve(__dirname,"./../dist/index.html")),d.on("ready-to-show",()=>{d.show()}),d.on("focus",()=>{u||(m?(s.register("Command + Option + I",()=>!1),s.register("fn + f12",()=>!1)):(s.register("Ctrol + Shift + I",()=>!1),s.register("F12",()=>!1)))}),d.on("blur",()=>{s.unregisterAll()}),d.on("close",e=>{h?d=null:(e.preventDefault(),m&&d.isMaximized()?(d.setFullScreen(!1),setTimeout(()=>{w()},700)):w("close"))}),d.on("closed",e=>{d=null}),y=new a(l.join(__dirname,p)),y.setToolTip("Electron React"),y.on("click",(function(){v()})),m&&(c.shouldUseDarkColors&&y.setImage(l.join(__dirname,f)),c.on("updated",()=>{c.shouldUseDarkColors?y.setImage(l.join(__dirname,f)):y.setImage(l.join(__dirname,p))}))}),o.on("will-finish-launching",()=>{u||t(15),t(16).init()}),o.on("window-all-closed",()=>{m||o.quit()}),o.on("activate",()=>{null===d?createWindow():!g&&v()}),o.on("before-quit",()=>{h=!0})},function(e,n,t){"use strict";const r=t(0);if("string"==typeof r)throw new TypeError("Not running in an Electron environment!");const o=r.app||r.remote.app,s="ELECTRON_IS_DEV"in process.env,i=1===parseInt(process.env.ELECTRON_IS_DEV,10);e.exports=s?i:!o.isPackaged},function(e,n,t){var r=t(1),o=t(6).spawn,s=t(7)("electron-squirrel-startup"),i=t(0).app,a=function(e,n){var t=r.resolve(r.dirname(process.execPath),"..","Update.exe");s("Spawning `%s` with args `%s`",t,e),o(t,e,{detached:!0}).on("close",n)};e.exports=function(){if("win32"===process.platform){var e=process.argv[1];s("processing squirrel command `%s`",e);var n=r.basename(process.execPath);if("--squirrel-install"===e||"--squirrel-updated"===e)return a(["--createShortcut="+n],i.quit),!0;if("--squirrel-uninstall"===e)return a(["--removeShortcut="+n],i.quit),!0;if("--squirrel-obsolete"===e)return i.quit(),!0}return!1}()},function(e,n){e.exports=require("child_process")},function(e,n,t){"undefined"!=typeof process&&"renderer"===process.type?e.exports=t(8):e.exports=t(10)},function(e,n,t){function r(){var e;try{e=n.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(n=e.exports=t(2)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},n.formatArgs=function(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,s=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))})),e.splice(s,0,r)},n.save=function(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}},n.load=r,n.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},n.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},n.enable(r())},function(e,n){var t=1e3,r=6e4,o=60*r,s=24*o;function i(e,n,t){if(!(e<n))return e<1.5*n?Math.floor(e/n)+" "+t:Math.ceil(e/n)+" "+t+"s"}e.exports=function(e,n){n=n||{};var a,c=typeof e;if("string"===c&&e.length>0)return function(e){if((e=String(e)).length>100)return;var n=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!n)return;var i=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"days":case"day":case"d":return i*s;case"hours":case"hour":case"hrs":case"hr":case"h":return i*o;case"minutes":case"minute":case"mins":case"min":case"m":return i*r;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}(e);if("number"===c&&!1===isNaN(e))return n.long?i(a=e,s,"day")||i(a,o,"hour")||i(a,r,"minute")||i(a,t,"second")||a+" ms":function(e){if(e>=s)return Math.round(e/s)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,n,t){var r=t(11),o=t(12);(n=e.exports=t(2)).init=function(e){e.inspectOpts={};for(var t=Object.keys(n.inspectOpts),r=0;r<t.length;r++)e.inspectOpts[t[r]]=n.inspectOpts[t[r]]},n.log=function(){return i.write(o.format.apply(o,arguments)+"\n")},n.formatArgs=function(e){var t=this.namespace;if(this.useColors){var r=this.color,o="  [3"+r+";1m"+t+" [0m";e[0]=o+e[0].split("\n").join("\n"+o),e.push("[3"+r+"m+"+n.humanize(this.diff)+"[0m")}else e[0]=(new Date).toUTCString()+" "+t+" "+e[0]},n.save=function(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e},n.load=a,n.useColors=function(){return"colors"in n.inspectOpts?Boolean(n.inspectOpts.colors):r.isatty(s)},n.colors=[6,2,3,4,5,1],n.inspectOpts=Object.keys(process.env).filter((function(e){return/^debug_/i.test(e)})).reduce((function(e,n){var t=n.substring(6).toLowerCase().replace(/_([a-z])/g,(function(e,n){return n.toUpperCase()})),r=process.env[n];return r=!!/^(yes|on|true|enabled)$/i.test(r)||!/^(no|off|false|disabled)$/i.test(r)&&("null"===r?null:Number(r)),e[t]=r,e}),{});var s=parseInt(process.env.DEBUG_FD,10)||2;1!==s&&2!==s&&o.deprecate((function(){}),"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();var i=1===s?process.stdout:2===s?process.stderr:function(e){var n;switch(process.binding("tty_wrap").guessHandleType(e)){case"TTY":(n=new r.WriteStream(e))._type="tty",n._handle&&n._handle.unref&&n._handle.unref();break;case"FILE":var o=t(13);(n=new o.SyncWriteStream(e,{autoClose:!1}))._type="fs";break;case"PIPE":case"TCP":var s=t(14);(n=new s.Socket({fd:e,readable:!1,writable:!0})).readable=!1,n.read=null,n._type="pipe",n._handle&&n._handle.unref&&n._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return n.fd=e,n._isStdio=!0,n}(s);function a(){return process.env.DEBUG}n.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts).split("\n").map((function(e){return e.trim()})).join(" ")},n.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts)},n.enable(a())},function(e,n){e.exports=require("tty")},function(e,n){e.exports=require("util")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("net")},function(e,n,t){const{dialog:r,autoUpdater:o,app:s}=t(0);"darwin"===process.platform?o.setFeedURL("https://maqlln.wang/update/darwin?version="+s.getVersion()):o.setFeedURL("https://maqlln.wang/update/win32?version="+s.getVersion()),o.checkForUpdates(),o.on("update-available",()=>{console.log("available----\x3e")}),o.on("update-downloaded",(e,n,t)=>{s.whenReady().then(()=>{1===r.showMessageBoxSync({type:"info",title:"版本升级",message:"已升级到最新版本，是否重启更新体验？",buttons:["取消","马上升级"],cancelId:0})&&(o.quitAndInstall(),s.quit())})}),o.on("error",e=>{s.whenReady().then(()=>{console.log("update error",e),r.showMessageBoxSync({type:"info",title:"error",message:JSON.stringify(e)})})})},function(e,n,t){const{crashReporter:r,app:o}=t(0);e.exports={init:function(){r.start({productName:o.getName(),companyName:"mine",submitURL:"http://127.0.0.1:3385/crash"})}}}]);