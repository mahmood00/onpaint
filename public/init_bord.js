
	 var color='black';
	 var size=10;
	 var fun = 0;
	 var fill = 'transparent';
	 var localOpacity = 1;
	 var isEraser = false;
	 var ids = new HashMap();
	 var viewPortWidth;
	 var viewPortHeight;

	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 if (typeof window.innerWidth != 'undefined') {
	   viewPortWidth = window.innerWidth,
	   viewPortHeight = window.innerHeight
	 }

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	 else if (typeof document.documentElement != 'undefined'
	 && typeof document.documentElement.clientWidth !=
	 'undefined' && document.documentElement.clientWidth != 0) {
		viewPortWidth = document.documentElement.clientWidth,
		viewPortHeight = document.documentElement.clientHeight
	 }

	 // older versions of IE
	 else {
	   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
	   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
	 }
 
	var canvas = new fabric.Canvas('c' , {  });
	canvas.setWidth(viewPortWidth);
	canvas.setHeight(viewPortHeight);
	canvas.backgroundColor = '#FFFFFF';
	canvas.renderAll();	
	fabric.isTouchSupported = true;
	canvas.perPixelTargetFind = true;
	canvas.selection = false;
	canvas.skipTargetFind = true;
	canvas.freeDrawingBrush.width=8;
	//canvas.freeDrawingBrush.color='red';
	canvas.isDrawingMode = true ;
	//DrawingOpacity = 1;
	ids = new HashMap();//////////////////////////////////////////////////// again
	function addIdForObject(obj){
		obj.toObject = (function(toObject) {
				  return function() {
					return fabric.util.object.extend(toObject.call(this), {
					  id: this.id
					});
				  };
				})(obj.toObject);
				//canvas.add(rect);
		var d = new Date();
		//t = Math.floor(Math.random() * (max - min + 1)) + min;
		var t = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		t = d.getTime() +''+t;
		obj.id = t ;
	}
	function addIdForObjectByInt(obj , id){
		obj.toObject = (function(toObject) {
				  return function() {
					return fabric.util.object.extend(toObject.call(this), {
					  id: this.id
					});
				  };
				})(obj.toObject);
				//canvas.add(rect);
		obj.id = id ;
	}
	
	function changeSize(size){
		canvas.freeDrawingBrush.width=size;
	}
	function changeOpacity(value){
		DrawingOpacity = value;
		localOpacity = value;
	}
	function changeColor(value){
		color = value;
		canvas.freeDrawingBrush.color = value;
	}
	function changeFun(value){
		fun = value;
	}
	function changeDrawingMode(value){
		canvas.isDrawingMode = value ;
	}
	/*function showAndroidToast(toast) {
		var im=canvas.toDataURL({format: 'png'});
        console.log(im+" hh");
    }*/
	/*function toImage(){
		var im=canvas.toDataURL({format: 'png'});
		Android.gotoURL(im);
	}*/
	function canvasToImage(){
		canvas.backgroundColor = '#FFFFFF';
	    //var dataUrl = canvas.toDataURL({format: 'jpeg'});
	    var dataUrl = document.getElementById('c').toDataURL("image/jpeg");
	    //console.log("after");
	    dataUrl = dataUrl.replace("data:image/png;base64,", "");
	    dataUrl = dataUrl.replace("data:image/jpeg;base64,", "");
	    Android.saveImage(dataUrl);
	}
	function canvasToImageAndShare(){
		canvas.backgroundColor = '#FFFFFF';
	    //var dataUrl = canvas.toDataURL({format: 'jpeg'});
	    var dataUrl = document.getElementById('c').toDataURL("image/jpeg");
	    //console.log("after");
	    dataUrl = dataUrl.replace("data:image/png;base64,", "");
	    dataUrl = dataUrl.replace("data:image/jpeg;base64,", "");
	    Android.saveImageAndShare(dataUrl);
	}
	function changeRxRy(fun)
	{
		if(fun == 2)
			return function(obj , x, y){
				obj.set('rx', x );
		        obj.set('ry', y);
			}
		else
			return function(obj , x, y){
			}
	}
	function startDrawing(){
		var myfun = drawType(fun);
		var rxry  = changeRxRy(fun);
		canvas.on('mouse:down', function (option) {
	            //console.log(option);
	            if (typeof option.target != "undefined") {
	                return;
	            } else {
	            	var coord = canvas.getPointer(option.e);
	                var startY = coord.y,
	                    startX = coord.x;
	
					var obj = myfun(startX , startY  );
						//canvas.add(obj);
						//addIdForObject(obj);
						//obj.set('width', 0);
		                //obj.set('height', 0);
		                obj.setWidth(1);
		                obj.setHeight(1);
		                obj.setCoords();
		                canvas.add(obj);
		                canvas.on('mouse:move', function (option) {
		                	var coord = canvas.getPointer(option.e);
		                    //var e = option.e;
		                    var width  = coord.x - startX;
		                    var height = coord.y - startY;
	
		                    //obj.set('width', width);
		                    //obj.set('height', height);
		                    obj.setWidth(width);
		                	obj.setHeight(height);
		                    rxry(obj , Math.abs(width/2) , Math.abs(height/2));
		                    obj.setCoords();
		                    //sendWidthAndHeight( obj );
		                    canvas.renderAll();
		                });
	
	            	
	                canvas.on('mouse:up', function () {
	
		                //sendWidthAndHeight( obj );
		                //console.log(obj.type);
						sendWidthAndHeight(obj);
					    canvas.off('mouse:move');
					    canvas.off('mouse:up');
					    canvas.renderAll();
	
					 });
	                
	
	            }
	        }); // end mouse down event
	}
	
	function drawType(fun){

	if(fun == 2 )
		return function addCircle(x,y)
		{
			if ( fill != 'transparent') {
				fill = color;
			}
			var myc = new fabric.Ellipse({ 
			  //radius: 20, 
			  fill: fill,
			  left : x,
			  top : y ,
			  rx:0 ,
			  ry: 0 ,
			  stroke: color ,
              strokeWidth : 4 , 
			  opacity : DrawingOpacity
			});
			//canvas.add(myc);
			return myc;
			fun =0 ;
		}	
/*********************************************************/
/********** Add a text on X and Y location *************/
	if(fun == 5 )
		return function addText(x,y)
		{
			var t = new fabric.IText('click and Type', { 
				  fontFamily: 'arial black',
				  left: x, 
				  top: y ,
				  fill : color,
			 	  stroke: color ,
              	  strokeWidth : 4
				});

			addIdForObject(t);
			t.on("text:changed", function(options) {
				//socket.emit('data', JSON.stringify(t) );
			    //console.log("this does works though, text1 is now changing.");
			    var obj = t;
  				socket.emit('event', {op : 5 , id : obj.id , text : obj.getText() });
			});
			return t;
			//fun = 0;
		}	
/*********************************************************/
/********** Add a Rect on X and Y location *************/
	if(fun == 3 )
		return function addRect(x,y )
		{
			if ( fill != 'transparent') {
				fill = color;
			}
			var myc = new fabric.Rect({ 
			  //fill: color ,
			  left : x ,
			  top : y ,
			  width:0 ,
			  height:0 ,
			  fill : fill ,
              stroke: color ,
              strokeWidth : 4,
			  opacity : DrawingOpacity
			});
			//var cr = new fabric.CustomRect(myc, { id : 1 });
			
			//console.log(JSON.stringify( myc));
			return myc;
			//canvas.add(myc);
			//fun =0 ;
		}	
/*********************************************************/
/********** Add a Triangle on X and Y location *************/
	if(fun == 4 )
		return function addTriangle(x,y)
		{
			if ( fill != 'transparent') {
				fill = color;
			}
			var triangle = new fabric.Triangle({
			  left: x, 
			  top: y ,
			  width: 0,
			  height: 0, 
			  fill: fill, 
			  stroke: color ,
              strokeWidth : 4,
			  opacity : DrawingOpacity
			});
			//canvas.add(triangle);
			return triangle;
			//fun =0 ;
		}	
/*********************************************************/
}
function offAllListner(){
	canvas.off('mouse:down');
	canvas.off('mouse:up');
	canvas.off('mouse:move');
}
function startDrawingLine(){
	offAllListner();
	var line, isDown;
	//canvas.selection = false;
	canvas.on('mouse:down', function(o){
	  //isDown = true;
	  var pointer = canvas.getPointer(o.e);
	  var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
	  line = new fabric.Line(points, {
	    strokeWidth: 2,
	    fill: fill,
	    stroke: color,
	    originX: 'center',
	    originY: 'center'
	  });
	  //addIdForObject(line);
	  canvas.add(line);
	  
		canvas.on('mouse:move', function(o){
		  var pointer = canvas.getPointer(o.e);
		  line.set({ x2: pointer.x, y2: pointer.y });
		  line.setCoords();
		  canvas.renderAll();
		});

		canvas.on('mouse:up', function(o){
		  //isDown = false;

		  sendWidthAndHeight( line );
		  canvas.off('mouse:move');
		  canvas.off('mouse:up');
		  canvas.renderAll();
		});
	  
	});

}

function chaneTypeofDrawing(value){
		if(value == '0'){
			offAllListner();
			canvas.freeDrawingBrush.color=color;
			DrawingOpacity = localOpacity;
			canvas.isDrawingMode = true ;
			isEraser = false;
			fun = 0;
			
		}
		else if(value == '1'){//Eraser
			offAllListner();
			canvas.freeDrawingBrush.color='#FFFFFF';
			isEraser = true;
			DrawingOpacity = 1;
			canvas.isDrawingMode = true ;
		}
		else if(value == '2'){//line
			offAllListner();
			canvas.isDrawingMode = false ;
			startDrawingLine();
		}
		else if(value == '3'){//rectangle
			fun=3;
			offAllListner();
			canvas.isDrawingMode = false ;
			startDrawing();
		}
		else if(value == '4'){//triangle
			fun=4;
			offAllListner();
			canvas.isDrawingMode = false ;
			startDrawing();
		}
		else if(value == '5'){//circle
			fun = 2;
			offAllListner();
			canvas.isDrawingMode = false ;
			startDrawing();
		}
}
canvas.on('object:added', function(e) {
		if( !ids.hasItem(e.target.id))
		{
			if(isEraser != true)
				e.target.opacity = DrawingOpacity;
			addIdForObject(e.target);
			ids.setItem(e.target.id , '1');
			socket.emit('data', {op :1 , object : JSON.stringify(e.target) } );
			console.log(' sendByAdded ' + e.target.id);
		}
	});
function sendWidthAndHeight(obj ){
	if(obj.type == 'ellipse')
		socket.emit('data', {op : 7 , id : obj.id , width : obj.getWidth() , height: obj.getHeight() 
								, rx : obj.get('rx') , ry : obj.get('ry') });
	else if(obj.type == 'line')
		socket.emit('data', {op : 8 , id : obj.id , x2 : obj.get('x2') , y2: obj.get('y2') });
	else
		socket.emit('data', {op : 6 , id : obj.id , width : obj.getWidth() , height: obj.getHeight() });
	//console.log(obj.type);
}
socket.on('newobj', function (data) {
	if(data.op == 1 ){
		var newobj = JSON.parse(data.object);

		/*canvas.forEachObject(function(obj){
				if(obj.id == newobj.id){
					ids.removeItem(obj.id);
					canvas.remove(obj);
				}
			 });*/
		var objs = new Array();
		objs.push(newobj);

		fabric.util.enlivenObjects(objs, function(objects) {
			//var origRenderOnAddRemove = canvas.renderOnAddRemove;
			//canvas.renderOnAddRemove = false;
			
			var o = objects;
			ids.setItem(newobj.id , '1');
			addIdForObjectByInt(o[0] , newobj.id );
			canvas.add(o[0]);
			console.log('recived '+o[0].id);
			//canvas.renderOnAddRemove = origRenderOnAddRemove;
			canvas.renderAll();
		});
	}
	else if(data.op == 6){
		canvas.forEachObject(function(obj){
	    	if(obj.id == data.id){
	    		obj.setWidth(data.width);
	            obj.setHeight(data.height);
	            obj.setCoords();
	            canvas.renderAll();
	    	}
	        //console.log(obj.id)
	     });
	}
	else if(data.op == 7){
		canvas.forEachObject(function(obj){
	    	if(obj.id == data.id){
	    		obj.setWidth(data.width);
	            obj.setHeight(data.height);
	            obj.set('rx', data.rx );
	        	obj.set('ry', data.ry );
	            obj.setCoords();
	            canvas.renderAll();
	    	}
	        //console.log(obj.id)
	     });
	}
	else if(data.op == 8){
		canvas.forEachObject(function(obj){
	    	if(obj.id == data.id){
	    		obj.set({ x2: data.x2 , y2: data.y2 });
	        	canvas.renderAll();
	    	}
	        //console.log(obj.id)
	    });
	}
  });
  function closeEverything(){
	socket.disconnect();
  };
  function connectAgain(){
	socket.connect();
  };