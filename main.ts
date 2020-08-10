import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from './src/frame/position';
import {Size} from './src/frame/size';
import {Window} from './src/frame/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from './src/frame/layout';
import {Frame,PaintFunction,} from './src/frame/frame';
import {RectanglePainter} from './src/painter/rectangle';
import {ImagePainter} from './src/painter/image';
import {TilePainter,TileSheet,Tile,TileSetPainter} from './src/painter/tile';
import {LabelPainter} from './src/painter/label';
import {GroupPainter} from './src/painter/group';
import {NinePatchPainter} from './src/painter/ninepatch';
import {Colors} from './src/painter/color';

import {Button,ActionFunction} from './src/ui/button';

let root:Frame;
let toolSize:number= 35;

type ToolMode = "paint-brush" | "eraser" | "eye-dropper"
let toolMode= "paint-brush"

love.update = function(dt) {
	root.update()
}

love.draw = function() {
	love.graphics.clear(1,1,1)
	root.draw()
}

love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
	root.press(x,y);
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){
	root.release();
}

function IconButton(parent:Frame,size:number,text:string,tile:Tile,tilesheet:TileSheet,action:ActionFunction):Button{
	return new Button(
		text,
		new LayoutPosition(),
		new Size(size,size),
		parent,
		TilePainter(tilesheet,tile,Colors.Black),
		TilePainter(tilesheet,tile,Colors.White),
		action,
	)
}

love.load = function() {
	let icons:TileSheet = new TileSheet(love.graphics.newImage("assets/icons-38x39-white.png"),38,39);
	let tilemap:TileSheet = new TileSheet(love.graphics.newImage("assets/colored_tilemap_packed.png"),14,10);
	tilemap.img.setFilter("nearest", "nearest")

	root = new Frame(
		new FixedPosition(0,0),
		new Size(800,600),
		new Window(love.window.getMode()[0],love.window.getMode()[1]),
		new NoChildLayout()
	)

	buildToolBar(root,icons)
	buildTileSelector(root,tilemap)
	buildView(root,tilemap)

}

function buildToolBar(parent:Frame,icons:TileSheet){
	let toolbar:Frame = new Frame(
		new FixedPosition(0,0),
		new Size(800,toolSize),
		root,
		new RowLayout(5),
		RectanglePainter(Colors.Gray)
	)

	IconButton(toolbar,toolSize-2,"ellipsis-h",new Tile(32,10),icons,()=>{})
	IconButton(toolbar,toolSize-2,"paint-brush",new Tile(21,23),icons,()=>{toolMode = "paint-brush"})
	IconButton(toolbar,toolSize-2,"eraser",new Tile(5,11),icons,()=>{toolMode = "eraser"})
	IconButton(toolbar,toolSize-2,"eye-dropper",new Tile(22,11),icons,()=>{toolMode = "eye-dropper"})
	IconButton(toolbar,toolSize-2,"save",new Tile(28,27),icons,()=>{})
	IconButton(toolbar,toolSize-2,"trash",new Tile(36,33),icons,()=>{})
}

function buildTileSelector(parent:Frame,tilemap:TileSheet){
		let tool:Frame = new Frame(
		new FixedPosition(0,toolSize),
		new Size(toolSize,600-toolSize),
		parent,
		new NoChildLayout(),
		RectanglePainter(Colors.Gray)
	)
}
function buildView(parent:Frame,tilemap:TileSheet){
	let tiles:Tile[] = [];
	let resolution:number = 5
	let w:number = 4*resolution
	let h:number = 3*resolution
	let spacing:number = 1

	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			table.insert(
				tiles,
				new Tile(
					math.random(0,13),
					math.random(0,9)
				)
			)
		}		
	}
	let view:Frame = new Frame(
		new FixedPosition(toolSize,toolSize),
		new Size(800-toolSize,600-toolSize),
		parent,
		new NoChildLayout(),
		TileSetPainter(tilemap,tiles,w,spacing),
		(self:Frame,x:number,y:number)=>{
			let real_w = (800-toolSize)/w
			let real_h = (600-toolSize)/h
			
			let tileX:number = math.floor((x-self.globalPosition.x)/real_w)
			let tileY:number = math.floor((y-self.globalPosition.y)/real_h)
			let id:number = tileX+tileY*w
			tiles[id].x = 1
			tiles[id].y = 1
			self.paint = TileSetPainter(tilemap,tiles,w,spacing)
		},
				
	)
}
