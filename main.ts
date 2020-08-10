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

import {Button,ActionFunction,ExampleButton} from './src/ui/button';

let root:Frame;

love.update = function(dt) {
	root.update()
}

love.draw = function() {
	root.draw()
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	root.press(x,y);
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	root.release();
}

love.load = function() {
	let img:Image = love.graphics.newImage( "assets/Icon.png" );
	let np:Image = love.graphics.newImage( "assets/ninepatch.png" );

	root = new Frame(
		new FixedPosition(0,0),
		new Size(800,600),
		new Window(love.window.getMode()[0],love.window.getMode()[1]),
		new GridLayout(3,10)
	)
	let subframe = new Frame(
		new FixedPosition(400,200),
		new Size(400,400),
		root,
		new NoChildLayout(),
		NinePatchPainter(np,63,63,63,63)
	)
	for(let i=0;i<13;i++){
		ExampleButton(root,200,100,""+i,(id:string)=>{ print(id) })
	}
}
