Array.prototype.remove=function(c){for(var b=this.length;b--;)this[b]==c&&this.splice(b,1)};Array.prototype.contains=function(c){for(var b=this.length;b--;)if(this[b]==c)return!0;return!1};var Netron;
(function(c){var b=function(a,e){this._toPoint=null;this._from=a;this._to=e};Object.defineProperty(b.prototype,"from",{get:function(){return this._from},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"to",{get:function(){return this._to},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"selected",{get:function(){return this._selected},set:function(a){this._selected=a;this.invalidate()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hover",{get:function(){return this._hover},
set:function(a){this._hover=a},enumerable:!0,configurable:!0});b.prototype.updateToPoint=function(a){this._toPoint=a};b.prototype.remove=function(){this.invalidate();null!==this._from&&this._from.connections.contains(this)&&this._from.connections.remove(this);null!==this._to&&this._to.connections.contains(this)&&this._to.connections.remove(this);this._to=this._from=null};b.prototype.insert=function(a,e){this._from=a;this._to=e;this._from.connections.push(this);this._from.invalidate();this._to.connections.push(this);
this._to.invalidate();this.invalidate()};b.prototype.getCursor=function(){return c.Cursors.select};b.prototype.hitTest=function(a){if(null!==this.from&&null!==this.to){var e=this.from.element.getConnectorPosition(this.from),d=this.to.element.getConnectorPosition(this.to);if(0!==a.width||0!==a.height)return a.contains(e)&&a.contains(d);a=a.topLeft;if(e.x>d.x)var b=d,d=e,e=b;var b=new c.Rectangle(e.x,e.y,0,0),g=new c.Rectangle(d.x,d.y,0,0);b.inflate(3,3);g.inflate(3,3);if(b.union(g).contains(a)){if(e.x==
d.x||e.y==d.y)return!0;if(e.y<d.y)return e=b.x+b.width+(g.x+g.width-(b.x+b.width))*(a.y-b.y)/(g.y-b.y),a.x>b.x+(g.x-b.x)*(a.y-(b.y+b.height))/(g.y+g.height-(b.y+b.height))&&a.x<e;e=b.x+b.width+(g.x+g.width-(b.x+b.width))*(a.y-(b.y+b.height))/(g.y+g.height-(b.y+b.height));return a.x>b.x+(g.x-b.x)*(a.y-b.y)/(g.y-b.y)&&a.x<e}}return!1};b.prototype.invalidate=function(){null!==this._from&&this._from.invalidate();null!==this._to&&this._to.invalidate()};b.prototype.paint=function(a){a.strokeStyle=this._from.element.graph.theme.connection;
a.lineWidth=this._hover?2:1;this.paintLine(a,this._selected)};b.prototype.paintTrack=function(a){a.strokeStyle=this.from.element.graph.theme.connection;a.lineWidth=1;this.paintLine(a,!0)};b.prototype.paintLine=function(a,e){if(null!==this._from){var b=this._from.element.getConnectorPosition(this.from),f=null!==this._to?this._to.element.getConnectorPosition(this.to):this._toPoint;if(b.x!=f.x||b.y!=f.y)a.beginPath(),e?c.LineHelper.dashedLine(a,b.x,b.y,f.x,f.y):(a.moveTo(b.x-0.5,b.y-0.5),a.lineTo(f.x-
0.5,f.y-0.5)),a.closePath(),a.stroke()}};c.Connection=b})(Netron||(Netron={}));
(function(c){var b=function(a,e){this._connections=[];this._hover=!1;this._element=a;this._template=e};Object.defineProperty(b.prototype,"element",{get:function(){return this._element},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"template",{get:function(){return this._template},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"connections",{get:function(){return this._connections},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hover",{get:function(){return this._hover},
set:function(a){this._hover=a},enumerable:!0,configurable:!0});b.prototype.getCursor=function(){return c.Cursors.grip};b.prototype.hitTest=function(a){return 0===a.width&&0===a.height?this.rectangle.contains(a.topLeft):a.contains(this.rectangle.topLeft)};b.prototype.invalidate=function(){};b.prototype.isAssignable=function(a){if(a===this)return!1;var e=this._template.type.split(" ");if(!e.contains("[array]")&&1==this._connections.length)return!1;if(a instanceof b){var d=a._template.type.split(" ");
if(e[0]!=d[0]||this._element==a.element||e.contains("[in]")&&!d.contains("[out]")||e.contains("[out]")&&!d.contains("[in]")||!d.contains("[array]")&&1==a.connections.length)return!1}return!0};b.prototype.paint=function(a,e){var b=this.rectangle,f=this._element.graph.theme.connectorBorder,g=this._element.graph.theme.connector;this._hover&&(f=this._element.graph.theme.connectorHoverBorder,g=this._element.graph.theme.connectorHover,this.isAssignable(e)||(g="#f00"));a.lineWidth=1;a.strokeStyle=f;a.lineCap=
"butt";a.fillStyle=g;a.fillRect(b.x-0.5,b.y-0.5,b.width,b.height);a.strokeRect(b.x-0.5,b.y-0.5,b.width,b.height);this._hover&&(f="description"in this._template?this._template.description:this._template.name,a.textBaseline="bottom",a.font="8.25pt Tahoma",g=a.measureText(f),b=new c.Rectangle(b.x-Math.floor(g.width/2),b.y+14+6,g.width,14),g=new c.Rectangle(b.x,b.y,b.width,b.height),b.inflate(4,1),a.fillStyle="rgb(255, 255, 231)",a.fillRect(b.x-0.5,b.y-0.5,b.width,b.height),a.strokeStyle="#000",a.lineWidth=
1,a.strokeRect(b.x-0.5,b.y-0.5,b.width,b.height),a.fillStyle="#000",a.fillText(f,g.x,g.y+13))};Object.defineProperty(b.prototype,"rectangle",{get:function(){var a=this._element.getConnectorPosition(this),a=new c.Rectangle(a.x,a.y,0,0);a.inflate(3,3);return a},enumerable:!0,configurable:!0});c.Connector=b})(Netron||(Netron={}));
(function(c){var b=function(){this._undoUnits=[]};b.prototype.add=function(a){this._undoUnits.push(a)};b.prototype.undo=function(){for(var a=0;a<this._undoUnits.length;a++)this._undoUnits[a].undo()};b.prototype.redo=function(){for(var a=0;a<this._undoUnits.length;a++)this._undoUnits[a].redo()};Object.defineProperty(b.prototype,"isEmpty",{get:function(){if(0<this._undoUnits.length)for(var a=0;a<this._undoUnits.length;a++)if(!this._undoUnits[a].isEmpty)return!1;return!0},enumerable:!0,configurable:!0});
c.ContainerUndoUnit=b})(Netron||(Netron={}));(function(c){var b=function(a,e){this._element=a;this._undoContent=a.content;this._redoContent=e};b.prototype.undo=function(){this._element.content=this._undoContent};b.prototype.redo=function(){this._element.content=this._redoContent};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.ContentChangedUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(){};b.arrow="default";b.grip="pointer";b.cross="pointer";b.add="pointer";b.move="move";b.select="pointer";c.Cursors=b})(Netron||(Netron={}));
(function(c){var b=function(a){this._connection=a;this._from=a.from;this._to=a.to};b.prototype.undo=function(){this._connection.insert(this._from,this._to)};b.prototype.redo=function(){this._connection.remove()};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.DeleteConnectionUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(a){this._element=a;this._graph=a.graph};b.prototype.undo=function(){this._element.insertInto(this._graph)};b.prototype.redo=function(){this._element.remove()};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.DeleteElementUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(a,e){this._graph=null;this._selected=this._hover=!1;this._tracker=null;this._connectors=[];this._template=a;this._content=a.defaultContent;this._rectangle=new c.Rectangle(e.x,e.y,a.defaultWidth,a.defaultHeight);for(var b=0;b<a.connectorTemplates.length;b++)this._connectors.push(new c.Connector(this,a.connectorTemplates[b]))};Object.defineProperty(b.prototype,"rectangle",{get:function(){return null!==this._tracker&&this._tracker.track?this._tracker.rectangle:this._rectangle},
set:function(a){this.invalidate();this._rectangle=a;null!==this._tracker&&this._tracker.updateRectangle(a);this.invalidate()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"template",{get:function(){return this._template},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"graph",{get:function(){return this._graph},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"connectors",{get:function(){return this._connectors},enumerable:!0,configurable:!0});
Object.defineProperty(b.prototype,"tracker",{get:function(){return this._tracker},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"selected",{get:function(){return this._selected},set:function(a){(this._selected=a)?(this._tracker=new c.Tracker(this._rectangle,"resizable"in this._template?this._template.resizable:!1),this.invalidate()):(this.invalidate(),this._tracker=null)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hover",{get:function(){return this._hover},
set:function(a){this._hover=a},enumerable:!0,configurable:!0});b.prototype.paint=function(a){this._template.paint(this,a);this._selected&&this._tracker.paint(a)};b.prototype.invalidate=function(){};b.prototype.insertInto=function(a){this._graph=a;this._graph.elements.push(this)};b.prototype.remove=function(){this.invalidate();for(var a=0;a<this._connectors.length;a++)for(var e=this._connectors[a].connections,b=0;b<e.length;b++)e[b].remove();null!==this._graph&&this._graph.elements.contains(this)&&
this._graph.elements.remove(this);this._graph=null};b.prototype.hitTest=function(a){if(0===a.width&&0===a.height){if(this._rectangle.contains(a.topLeft))return!0;if(null!==this._tracker&&this._tracker.track){var e=this._tracker.hitTest(a.topLeft);if(-1<=e.x&&1>=e.x&&-1<=e.y&&1>=e.y)return!0}for(e=0;e<this._connectors.length;e++)if(this._connectors[e].hitTest(a))return!0;return!1}return a.contains(this._rectangle.topLeft)};b.prototype.getCursor=function(a){return null!==this._tracker&&(a=this._tracker.getCursor(a),
null!==a)?a:window.event.shiftKey?c.Cursors.add:c.Cursors.select};b.prototype.getConnector=function(a){for(var e=0;e<this._connectors.length;e++){var b=this._connectors[e];if(b.template.name==a)return b}return null};b.prototype.getConnectorPosition=function(a){var e=this.rectangle,a=a.template.getConnectorPosition(this);a.x+=e.x;a.y+=e.y;return a};b.prototype.setContent=function(a){this._graph.setElementContent(this,a)};Object.defineProperty(b.prototype,"content",{get:function(){return this._content},
set:function(a){this._content=a},enumerable:!0,configurable:!0});c.Element=b})(Netron||(Netron={}));
(function(c){var b=function(a){var e=this;this._pointerPosition=new c.Point(0,0);this._shiftKey=!1;this._undoService=new c.UndoService;this._elements=[];this._selection=this._newConnection=this._newElement=this._activeObject=this._activeTemplate=null;this._track=!1;this._canvas=a;this._canvas.focus();this._context=this._canvas.getContext("2d");this._theme={background:"#fff",connection:"#000",selection:"#000",connector:"#31456b",connectorBorder:"#fff",connectorHoverBorder:"#000",connectorHover:"#0c0"};
this._isWebKit="undefined"!==typeof navigator.userAgent.split("WebKit/")[1];this._isMozilla=0<=navigator.appVersion.indexOf("Gecko/")||0<=navigator.userAgent.indexOf("Gecko")&&!this._isWebKit&&"undefined"!==typeof navigator.appVersion;this._mouseDownHandler=function(a){e.mouseDown(a)};this._mouseUpHandler=function(a){e.mouseUp(a)};this._mouseMoveHandler=function(a){e.mouseMove(a)};this._doubleClickHandler=function(a){e.doubleClick(a)};this._touchStartHandler=function(a){e.touchStart(a)};this._touchEndHandler=
function(a){e.touchEnd(a)};this._touchMoveHandler=function(a){e.touchMove(a)};this._keyDownHandler=function(a){e.keyDown(a)};this._keyPressHandler=function(a){e.keyPress(a)};this._keyUpHandler=function(a){e.keyUp(a)};this._canvas.addEventListener("mousedown",this._mouseDownHandler,!1);this._canvas.addEventListener("mouseup",this._mouseUpHandler,!1);this._canvas.addEventListener("mousemove",this._mouseMoveHandler,!1);this._canvas.addEventListener("touchstart",this._touchStartHandler,!1);this._canvas.addEventListener("touchend",
this._touchEndHandler,!1);this._canvas.addEventListener("touchmove",this._touchMoveHandler,!1);this._canvas.addEventListener("dblclick",this._doubleClickHandler,!1);this._canvas.addEventListener("keydown",this._keyDownHandler,!1);this._canvas.addEventListener("keypress",this._keyPressHandler,!1);this._canvas.addEventListener("keyup",this._keyUpHandler,!1)};b.prototype.dispose=function(){null!==this._canvas&&(this._canvas.removeEventListener("mousedown",this._mouseDownHandler),this._canvas.removeEventListener("mouseup",
this._mouseUpHandler),this._canvas.removeEventListener("mousemove",this._mouseMoveHandler),this._canvas.removeEventListener("dblclick",this._doubleClickHandler),this._canvas.removeEventListener("touchstart",this._touchStartHandler),this._canvas.removeEventListener("touchend",this._touchEndHandler),this._canvas.removeEventListener("touchmove",this._touchMoveHandler),this._canvas.removeEventListener("keydown",this._keyDownHandler),this._canvas.removeEventListener("keypress",this._keyPressHandler),this._canvas.removeEventListener("keyup",
this._keyUpHandler),this._context=this._canvas=null)};Object.defineProperty(b.prototype,"theme",{get:function(){return this._theme},set:function(a){this._theme=a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"elements",{get:function(){return this._elements},enumerable:!0,configurable:!0});b.prototype.addElement=function(a,e,b){this._activeTemplate=a;a=new c.Element(a,e);a.content=b;a.insertInto(this);a.invalidate();return a};b.prototype.createElement=function(a){this._activeTemplate=
a;this._newElement=new c.Element(a,this._pointerPosition);this.update();this._canvas.focus()};b.prototype.addConnection=function(a,e){var b=new c.Connection(a,e);a.connections.push(b);e.connections.push(b);a.invalidate();e.invalidate();b.invalidate();return b};b.prototype.setElementContent=function(a,b){this._undoService.begin();this._undoService.add(new c.ContentChangedUndoUnit(a,b));this._undoService.commit();this.update()};b.prototype.deleteSelection=function(){this._undoService.begin();for(var a=
[],b=0;b<this._elements.length;b++)for(var d=this._elements[b],f=0;f<d.connectors.length;f++)for(var g=d.connectors[f],h=0;h<g.connections.length;h++){var i=g.connections[h];if((d.selected||i.selected)&&!a.contains(i))this._undoService.add(new c.DeleteConnectionUndoUnit(i)),a.push(i)}for(b=0;b<this._elements.length;b++)d=this._elements[b],d.selected&&this._undoService.add(new c.DeleteElementUndoUnit(d));this._undoService.commit()};b.prototype.mouseDown=function(a){a.preventDefault();this._canvas.focus();
this.updateMousePosition(a);0===a.button&&(null===this._newElement&&a.altKey&&this.createElement(this._activeTemplate),this.pointerDown())};b.prototype.mouseUp=function(a){a.preventDefault();this.updateMousePosition(a);0===a.button&&this.pointerUp()};b.prototype.mouseMove=function(a){a.preventDefault();this.updateMousePosition(a);this.pointerMove()};b.prototype.doubleClick=function(a){a.preventDefault();this.updateMousePosition(a);if(0===a.button&&(a=this._pointerPosition,this.updateActiveObject(a),
null!==this._activeObject&&this._activeObject instanceof c.Element)){var b=this._activeObject;null!==b.template&&"edit"in b.template&&(b.template.edit(b,this._context,a),this.update())}};b.prototype.touchStart=function(a){1==a.touches.length&&(a.preventDefault(),this.updateTouchPosition(a),this.pointerDown())};b.prototype.touchEnd=function(a){a.preventDefault();this.pointerUp()};b.prototype.touchMove=function(a){1==a.touches.length&&(a.preventDefault(),this.updateTouchPosition(a),this.pointerMove())};
b.prototype.pointerDown=function(){var a=this._pointerPosition;if(null!==this._newElement)this._undoService.begin(),this._newElement.invalidate(),this._newElement.rectangle=new c.Rectangle(a.x,a.y,this._newElement.rectangle.width,this._newElement.rectangle.height),this._newElement.invalidate(),this._undoService.add(new c.InsertElementUndoUnit(this._newElement,this)),this._undoService.commit(),this._newElement=null;else if(this._selection=null,this.updateActiveObject(a),null===this._activeObject)this._selection=
new c.Selection(a);else if(this._activeObject instanceof c.Connector&&!this._shiftKey){var b=this._activeObject;b.isAssignable(null)&&(this._newConnection=new c.Connection(b,null),this._newConnection.updateToPoint(a),b.invalidate())}else{b=this._activeObject;if(b.selected){if(this._shiftKey){this._undoService.begin();var d=new c.SelectionUndoUnit;d.deselect(b);this._undoService.add(d);this._undoService.commit()}}else this._undoService.begin(),d=new c.SelectionUndoUnit,this._shiftKey||this.deselectAll(d),
d.select(b),this._undoService.add(d),this._undoService.commit();b=new c.Point(0,0);this._activeObject instanceof c.Element&&(d=this._activeObject,b=d.tracker.hitTest(a));for(var f=0;f<this._elements.length;f++)d=this._elements[f],null!==d.tracker&&d.tracker.start(a,b);this._track=!0}this.update();this.updateMouseCursor()};b.prototype.pointerUp=function(){var a=this._pointerPosition;if(null!==this._newConnection){this.updateActiveObject(a);this._newConnection.invalidate();if(null!==this._activeObject&&
this._activeObject instanceof c.Connector){var b=this._activeObject;b!=this._newConnection.from&&b.isAssignable(this._newConnection.from)&&(this._undoService.begin(),this._undoService.add(new c.InsertConnectionUndoUnit(this._newConnection,this._newConnection.from,b)),this._undoService.commit())}this._newConnection=null}if(null!==this._selection){this._undoService.begin();var b=new c.SelectionUndoUnit,d=this._selection.rectangle,f=this._activeObject;if(null===this._activeObject||!f.selected)this._shiftKey||
this.deselectAll(b);(0!==d.width||0!==d.height)&&this.selectAll(b,d);this._undoService.add(b);this._undoService.commit();this._selection=null}if(this._track){this._undoService.begin();for(b=0;b<this._elements.length;b++)if(d=this._elements[b],null!==d.tracker){d.tracker.stop();d.invalidate();var f=d.rectangle,g=d.tracker.rectangle;(f.x!=g.x||f.y!=g.y||f.width!=g.width||f.height!=g.height)&&this._undoService.add(new c.TransformUndoUnit(d,f,g))}this._undoService.commit();this._track=!1;this.updateActiveObject(a)}this.update();
this.updateMouseCursor()};b.prototype.pointerMove=function(){var a=this._pointerPosition;null!==this._newElement&&(this._newElement.invalidate(),this._newElement.rectangle=new c.Rectangle(a.x,a.y,this._newElement.rectangle.width,this._newElement.rectangle.height),this._newElement.invalidate());if(this._track)for(var b=0;b<this._elements.length;b++){var d=this._elements[b];null!==d.tracker&&(d.invalidate(),d.tracker.move(a),d.invalidate())}null!==this._newConnection&&(this._newConnection.invalidate(),
this._newConnection.updateToPoint(a),this._newConnection.invalidate());null!==this._selection&&this._selection.updateCurrentPoint(a);this.updateActiveObject(a);this.update();this.updateMouseCursor()};b.prototype.keyDown=function(a){this._isMozilla||this.processKey(a,a.keyCode)};b.prototype.keyPress=function(a){if(this._isMozilla){if("undefined"===typeof this._keyCodeTable){this._keyCodeTable=[];var b={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",
66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'},d;for(d in b){var c=b[d];this._keyCodeTable[c.charCodeAt(0)]=d;c.toUpperCase()!=c&&(this._keyCodeTable[c.toUpperCase().charCodeAt(0)]=d)}}this.processKey(a,this._keyCodeTable[a.charCode]?this._keyCodeTable[a.charCode]:a.keyCode)}};b.prototype.keyUp=
function(){this.updateMouseCursor()};b.prototype.processKey=function(a,b){if((a.ctrlKey||a.metaKey)&&!a.altKey){if(65==b){this._undoService.begin();var d=new c.SelectionUndoUnit;this.selectAll(d,null);this._undoService.add(d);this._undoService.commit();this.update();this.updateActiveObject(this._pointerPosition);this.updateMouseCursor();this.stopEvent(a)}90==b&&!a.shiftKey&&(this._undoService.undo(),this.update(),this.updateActiveObject(this._pointerPosition),this.updateMouseCursor(),this.stopEvent(a));
if(90==b&&a.shiftKey||89==b)this._undoService.redo(),this.update(),this.updateActiveObject(this._pointerPosition),this.updateMouseCursor(),this.stopEvent(a)}if(46==b||8==b)this.deleteSelection(),this.update(),this.updateActiveObject(this._pointerPosition),this.updateMouseCursor(),this.stopEvent(a);if(27==b){this._newConnection=this._newElement=null;this._track=!1;for(d=0;d<this._elements.length;d++){var f=this._elements[d];null!==f.tracker&&f.tracker.stop()}this.update();this.updateActiveObject(this._pointerPosition);
this.updateMouseCursor();this.stopEvent(a)}};b.prototype.stopEvent=function(a){a.preventDefault();a.stopPropagation()};b.prototype.selectAll=function(a,b){for(var d=0;d<this._elements.length;d++){var c=this._elements[d];(null===b||c.hitTest(b))&&a.select(c);for(var g=0;g<c.connectors.length;g++)for(var h=c.connectors[g],i=0;i<h.connections.length;i++){var j=h.connections[i];(null===b||j.hitTest(b))&&a.select(j)}}};b.prototype.deselectAll=function(a){for(var b=0;b<this._elements.length;b++){var d=
this._elements[b];a.deselect(d);for(var c=0;c<d.connectors.length;c++)for(var g=d.connectors[c],h=0;h<g.connections.length;h++)a.deselect(g.connections[h])}};b.prototype.updateActiveObject=function(a){a=this.hitTest(a);a!=this._activeObject&&(null!==this._activeObject&&(this._activeObject.hover=!1),this._activeObject=a,null!==this._activeObject&&(this._activeObject.hover=!0))};b.prototype.hitTest=function(a){for(var a=new c.Rectangle(a.x,a.y,0,0),b=0;b<this._elements.length;b++)for(var d=this._elements[b],
f=0;f<d.connectors.length;f++){var g=d.connectors[f];if(g.hitTest(a))return g}for(b=0;b<this._elements.length;b++)if(d=this._elements[b],d.hitTest(a))return d;for(b=0;b<this._elements.length;b++){d=this._elements[b];for(f=0;f<d.connectors.length;f++)for(var g=d.connectors[f],h=0;h<g.connections.length;h++){var i=g.connections[h];if(i.hitTest(a))return i}}return null};b.prototype.updateMouseCursor=function(){this._canvas.style.cursor=null!==this._newConnection?null!==this._activeObject&&this._activeObject instanceof
c.Connector?this._activeObject.getCursor(this._pointerPosition):c.Cursors.cross:null!==this._activeObject?this._activeObject.getCursor(this._pointerPosition):c.Cursors.arrow};b.prototype.updateMousePosition=function(a){this._shiftKey=a.shiftKey;this._pointerPosition=new c.Point(a.pageX,a.pageY);for(a=this._canvas;null!==a;)this._pointerPosition.x-=a.offsetLeft,this._pointerPosition.y-=a.offsetTop,a=a.offsetParent};b.prototype.updateTouchPosition=function(a){this._shiftKey=!1;this._pointerPosition=
new c.Point(a.touches[0].pageX,a.touches[0].pageY);for(a=this._canvas;null!==a;)this._pointerPosition.x-=a.offsetLeft,this._pointerPosition.y-=a.offsetTop,a=a.offsetParent};b.prototype.update=function(){this._canvas.style.background=this.theme.background;this._context.clearRect(0,0,this._canvas.width,this._canvas.height);for(var a=[],b=0;b<this._elements.length;b++)for(var d=this._elements[b],c=0;c<d.connectors.length;c++)for(var g=d.connectors[c],h=0;h<g.connections.length;h++){var i=g.connections[h];
a.contains(i)||(i.paint(this._context),a.push(i))}for(b=0;b<this._elements.length;b++)this._context.save(),this._elements[b].paint(this._context),this._context.restore();for(b=0;b<this._elements.length;b++){d=this._elements[b];for(c=0;c<d.connectors.length;c++){g=d.connectors[c];a=!1;for(h=0;h<g.connections.length;h++)g.connections[h].hover&&(a=!0);d.hover||g.hover||a?g.paint(this._context,null!==this._newConnection?this._newConnection.from:null):null!==this._newConnection&&g.isAssignable(this._newConnection.from)&&
g.paint(this._context,this._newConnection.from)}}null!==this._newElement&&(this._context.save(),this._newElement.paint(this._context),this._context.restore());null!==this._newConnection&&this._newConnection.paintTrack(this._context);null!==this._selection&&(this._context.strokeStyle=this.theme.selection,this._selection.paint(this._context))};c.Graph=b})(Netron||(Netron={}));
(function(c){var b=function(a,b,c){this._connection=a;this._from=b;this._to=c};b.prototype.undo=function(){this._connection.remove()};b.prototype.redo=function(){this._connection.insert(this._from,this._to)};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.InsertConnectionUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(a,b){this._element=a;this._graph=b};b.prototype.undo=function(){this._element.remove()};b.prototype.redo=function(){this._element.insertInto(this._graph)};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.InsertElementUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(){};b.dashedLine=function(a,b,c,f,g){a.moveTo(b,c);for(var h=f-b,i=g-c,j=Math.floor(Math.sqrt(h*h+i*i)/3),h=h/j,i=i/j,k=0;k++<j;)b+=h,c+=i,0===k%2?a.moveTo(b,c):a.lineTo(b,c);0===k%2?a.moveTo(f,g):a.lineTo(f,g)};c.LineHelper=b})(Netron||(Netron={}));(function(c){c.Point=function(b,a){this.x=b;this.y=a}})(Netron||(Netron={}));
(function(c){var b=function(a,b,c,f){this.x=a;this.y=b;this.width=c;this.height=f};b.prototype.contains=function(a){return a.x>=this.x&&a.x<=this.x+this.width&&a.y>=this.y&&a.y<=this.y+this.height};b.prototype.inflate=function(a,b){this.x-=a;this.y-=b;this.width+=a+a+1;this.height+=b+b+1};b.prototype.union=function(a){var e=this.x<a.x?this.x:a.x,c=this.y<a.y?this.y:a.y;return new b(e,c,(this.x+this.width<a.x+a.width?a.x+a.width:this.x+this.width)-e,(this.y+this.height<a.y+a.height?a.y+a.height:this.y+
this.height)-c)};Object.defineProperty(b.prototype,"topLeft",{get:function(){return new c.Point(this.x,this.y)},enumerable:!0,configurable:!0});b.prototype.clone=function(){return new b(this.x,this.y,this.width,this.height)};c.Rectangle=b})(Netron||(Netron={}));
(function(c){var b=function(a){this._currentPoint=this._startPoint=a};Object.defineProperty(b.prototype,"rectangle",{get:function(){var a=new c.Rectangle(this._startPoint.x<=this._currentPoint.x?this._startPoint.x:this._currentPoint.x,this._startPoint.y<=this._currentPoint.y?this._startPoint.y:this._currentPoint.y,this._currentPoint.x-this._startPoint.x,this._currentPoint.y-this._startPoint.y);0>a.width&&(a.width*=-1);0>a.height&&(a.height*=-1);return a},enumerable:!0,configurable:!0});b.prototype.updateCurrentPoint=
function(a){this._currentPoint=a};b.prototype.paint=function(a){var b=this.rectangle;a.lineWidth=1;a.beginPath();c.LineHelper.dashedLine(a,b.x-0.5,b.y-0.5,b.x-0.5+b.width,b.y-0.5);c.LineHelper.dashedLine(a,b.x-0.5+b.width,b.y-0.5,b.x-0.5+b.width,b.y-0.5+b.height);c.LineHelper.dashedLine(a,b.x-0.5+b.width,b.y-0.5+b.height,b.x-0.5,b.y-0.5+b.height);c.LineHelper.dashedLine(a,b.x-0.5,b.y-0.5+b.height,b.x-0.5,b.y-0.5);a.closePath();a.stroke()};c.Selection=b})(Netron||(Netron={}));
(function(c){var b=function(){this._states=[]};b.prototype.undo=function(){for(var a=0;a<this._states.length;a++)this._states[a].value.selected=this._states[a].undo};b.prototype.redo=function(){for(var a=0;a<this._states.length;a++)this._states[a].value.selected=this._states[a].redo};Object.defineProperty(b.prototype,"isEmpty",{get:function(){for(var a=0;a<this._states.length;a++)if(this._states[a].undo!=this._states[a].redo)return!1;return!0},enumerable:!0,configurable:!0});b.prototype.select=function(a){this.update(a,
a.selected,!0)};b.prototype.deselect=function(a){this.update(a,a.selected,!1)};b.prototype.update=function(a,b,c){for(var f=0;f<this._states.length;f++)if(this._states[f].value==a){this._states[f].redo=c;return}this._states.push({value:a,undo:b,redo:c})};c.SelectionUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(a,b){this._track=!1;this._rectangle=a.clone();this._resizable=b};Object.defineProperty(b.prototype,"rectangle",{get:function(){return this._rectangle},enumerable:!0,configurable:!0});b.prototype.hitTest=function(a){if(this._resizable)for(var b=-1;1>=b;b++)for(var d=-1;1>=d;d++)if(0!==b||0!==d){var f=new c.Point(b,d);if(this.getGripRectangle(f).contains(a))return f}return this._rectangle.contains(a)?new c.Point(0,0):new c.Point(-2,-2)};b.prototype.getGripRectangle=function(a){var b=
new c.Rectangle(0,0,7,7);0>a.x&&(b.x=this._rectangle.x-7);0===a.x&&(b.x=this._rectangle.x+Math.floor(this._rectangle.width/2)-3);0<a.x&&(b.x=this._rectangle.x+this._rectangle.width+1);0>a.y&&(b.y=this._rectangle.y-7);0===a.y&&(b.y=this._rectangle.y+Math.floor(this._rectangle.height/2)-3);0<a.y&&(b.y=this._rectangle.y+this._rectangle.height+1);return b};b.prototype.getCursor=function(a){a=this.hitTest(a);if(0===a.x&&0===a.y)return this._track?c.Cursors.move:c.Cursors.select;if(-1<=a.x&&1>=a.x&&-1<=
a.y&&1>=a.y&&this._resizable){if(-1===a.x&&-1===a.y)return"nw-resize";if(1===a.x&&1===a.y)return"se-resize";if(-1===a.x&&1===a.y)return"sw-resize";if(1===a.x&&-1===a.y)return"ne-resize";if(0===a.x&&-1===a.y)return"n-resize";if(0===a.x&&1===a.y)return"s-resize";if(1===a.x&&0===a.y)return"e-resize";if(-1===a.x&&0===a.y)return"w-resize"}return null};b.prototype.start=function(a,b){-1<=b.x&&(1>=b.x&&-1<=b.y&&1>=b.y)&&(this._handle=b,this._currentPoint=a,this._track=!0)};b.prototype.stop=function(){this._track=
!1};Object.defineProperty(b.prototype,"track",{get:function(){return this._track},enumerable:!0,configurable:!0});b.prototype.move=function(a){var b=this._handle,d=new c.Point(0,0),f=new c.Point(0,0);if(-1==b.x||0===b.x&&0===b.y)d.x=a.x-this._currentPoint.x;if(-1==b.y||0===b.x&&0===b.y)d.y=a.y-this._currentPoint.y;if(1==b.x||0===b.x&&0===b.y)f.x=a.x-this._currentPoint.x;if(1==b.y||0===b.x&&0===b.y)f.y=a.y-this._currentPoint.y;var b=new c.Point(this._rectangle.x,this._rectangle.y),g=new c.Point(this._rectangle.x+
this._rectangle.width,this._rectangle.y+this._rectangle.height);b.x+=d.x;b.y+=d.y;g.x+=f.x;g.y+=f.y;this._rectangle.x=b.x;this._rectangle.y=b.y;this._rectangle.width=g.x-b.x;this._rectangle.height=g.y-b.y;this._currentPoint=a};b.prototype.updateRectangle=function(a){this._rectangle=a.clone()};b.prototype.paint=function(a){if(this._resizable)for(var b=-1;1>=b;b++)for(var d=-1;1>=d;d++)if(0!==b||0!==d){var f=this.getGripRectangle(new c.Point(b,d));a.fillStyle="#ffffff";a.strokeStyle="#000000";a.lineWidth=
1;a.fillRect(f.x-0.5,f.y-0.5,f.width-1,f.height-1);a.strokeRect(f.x-0.5,f.y-0.5,f.width-1,f.height-1)}};c.Tracker=b})(Netron||(Netron={}));
(function(c){var b=function(a,b,c){this._element=a;this._undoRectangle=b.clone();this._redoRectangle=c.clone()};b.prototype.undo=function(){this._element.rectangle=this._undoRectangle};b.prototype.redo=function(){this._element.rectangle=this._redoRectangle};Object.defineProperty(b.prototype,"isEmpty",{get:function(){return!1},enumerable:!0,configurable:!0});c.TransformUndoUnit=b})(Netron||(Netron={}));
(function(c){var b=function(){this._container=null;this._stack=[];this._position=0};b.prototype.begin=function(){this._container=new c.ContainerUndoUnit};b.prototype.cancel=function(){this._container=null};b.prototype.commit=function(){this._container.isEmpty||(this._stack.splice(this._position,this._stack.length-this._position),this._stack.push(this._container),this.redo());this._container=null};b.prototype.add=function(a){this._container.add(a)};b.prototype.undo=function(){0!==this._position&&(this._position--,
this._stack[this._position].undo())};b.prototype.redo=function(){0!==this._stack.length&&this._position<this._stack.length&&(this._stack[this._position].redo(),this._position++)};c.UndoService=b})(Netron||(Netron={}));
