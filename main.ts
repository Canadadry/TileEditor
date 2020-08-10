import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from './src/frame/position';
import {Size} from './src/frame/size';
import {Window} from './src/frame/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/frame/layout';
import {Frame,PaintFunction,} from './src/frame/frame';
import {RectanglePainter} from './src/painter/rectangle';
import {ImagePainter} from './src/painter/image';
import {LabelPainter} from './src/painter/label';
import {GroupPainter} from './src/painter/group';
import {NinePatchPainter} from './src/painter/ninepatch';
import {Colors} from './src/painter/color';


let window:Window;
let frame:Frame;
let picked:Frame|null;
let lastPaint:PaintFunction|null;

love.update = function(dt) {
	frame.update()
}

love.draw = function() {
	frame.draw()
}

love.load = function() {
	let img:Image = love.graphics.newImage( "assets/Icon.png" );
	let np:Image = love.graphics.newImage( "assets/ninepatch.png" );

	window = new Window(love.window.getMode()[0],love.window.getMode()[1])
	frame = new Frame(
		new FixedPosition(0,0),
		new Size(200,600),
		window,
		new GridLayout(3,10),
		ImagePainter(img),
	)

	for(let i=0;i<7;i++){
		let subframe = new Frame(
			new LayoutPosition(),
			new Size(200,100),
			frame,
			new NoChildLayout(),
			GroupPainter([	
				RectanglePainter(Colors.Red,50),
				LabelPainter("Button"+i,Colors.White,"center"),
			])
		)
	}
	let subframe = new Frame(
		new FixedPosition(400,200),
		new Size(400,400),
		frame,
		new NoChildLayout(),
		NinePatchPainter(np,63,63,63,63)
	)
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	picked = frame.pick(x,y);
	if(picked){
		lastPaint = picked.paint
		picked.paint = RectanglePainter(Colors.Blue)
	}
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	if(picked){
		picked.paint = lastPaint
		lastPaint = null
	}
}