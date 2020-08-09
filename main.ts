import {Window,Frame,PaintFunction,FixedPosition,LayoutPosition,Size,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/frame'


let WhiteRectangle:PaintFunction =  (x:number,y:number,width:number,height:number)=>{
	love.graphics.setColor(1,1,1,255)
	love.graphics.rectangle("fill",x,y,width,height)			
}

let RedRectangle:PaintFunction =  (x:number,y:number,width:number,height:number)=>{
	love.graphics.setColor(1,0,0,255)
	love.graphics.rectangle("fill",x,y,width,height)			
}

let window:Window;
let frame:Frame;

love.update = function(dt) {}

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
		WhiteRectangle
	)

	for(let i=0;i<7;i++){
		let subframe = new Frame(
			new LayoutPosition(),
			new Size(100,100),
			frame,
			new NoChildLayout(),
			RedRectangle
		)
	}
	frame.update()
}



love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){

}