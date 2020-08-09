import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from './src/position';
import {Size} from './src/size';
import {Window} from './src/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/layout';
import {Frame,PaintFunction,} from './src/frame'

function rectangle(r:number,g:number,b:number) :PaintFunction{
	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(r,g,g,255)
		love.graphics.rectangle("fill",x,y,width,height)
	}
}

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
		rectangle(1,1,1)
	)

	for(let i=0;i<7;i++){
		let subframe = new Frame(
			new LayoutPosition(),
			new Size(100,100),
			frame,
			new NoChildLayout(),
			rectangle(1,0,0)
		)
	}
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	picked = frame.pick(x,y);
	if(picked){
		lastPaint = picked.paint
		picked.paint = rectangle(0,1,1)
	}
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	if(picked){
		picked.paint = lastPaint
		lastPaint = null
	}
}