import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from './src/frame/position';
import {Size} from './src/frame/size';
import {Window} from './src/frame/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/frame/layout';
import {Frame,PaintFunction,} from './src/frame/frame';
import {RectanglePainter} from './src/painter/rectangle';
import {ImagePainter} from './src/painter/image';
import {TilePainter,TileSheet} from './src/painter/tile';
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
	love.graphics.clear()
	root.draw()
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	root.press(x,y);
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	root.release();
}

love.load = function() {
	let buttonUp:Image = love.graphics.newImage( "assets/button-up.png");
	let buttonDown:Image = love.graphics.newImage( "assets/button-down.png");
	let icons:TileSheet = new TileSheet(love.graphics.newImage( "assets/icons-38x39-white.png"),38,39);

	root = new Frame(
		new FixedPosition(0,0),
		new Size(800,600),
		new Window(love.window.getMode()[0],love.window.getMode()[1]),
		new GridLayout(3,10)
	)

	let icon = new Frame(
		new FixedPosition(750,0),
		new Size(50,50),
		root,
		new NoChildLayout(),
		TilePainter(icons,33,17,Colors.Red)
	)
	for(let i=0;i<13;i++){
		ExampleButton(root,200,100,""+i,(id:string)=>{ print(id) })
	}

	let subframe = new Button(
		"btn",
		new FixedPosition(700,500),
		new Size(100,100),
		root,
		GroupPainter([	
			NinePatchPainter(buttonUp,8,8,8,8)
		]),
		GroupPainter([	
			NinePatchPainter(buttonDown,8,8,8,8)
		]),
		(id:string)=>{ print(id) },
	)
}
