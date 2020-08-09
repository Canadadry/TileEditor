import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from './src/frame/position';
import {Size} from './src/frame/size';
import {Window} from './src/frame/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/frame/layout';
import {Frame,PaintFunction,} from './src/frame/frame';
import {Rectangle} from './src/painter/rectangle';
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
	window = new Window(love.window.getMode()[0],love.window.getMode()[1])
	frame = new Frame(
		new FixedPosition(0,0),
		new Size(200,600),
		window,
		new GridLayout(3,10),
		Rectangle(Colors.White)
	)

	for(let i=0;i<7;i++){
		let subframe = new Frame(
			new LayoutPosition(),
			new Size(200,100),
			frame,
			new NoChildLayout(),
			Rectangle(Colors.Red,50)
		)
	}
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	picked = frame.pick(x,y);
	if(picked){
		lastPaint = picked.paint
		picked.paint = Rectangle(Colors.Blue)
	}
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	if(picked){
		picked.paint = lastPaint
		lastPaint = null
	}
}