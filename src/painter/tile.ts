import {PaintFunction} from '../frame/frame'
import {Color} from '../painter/color';


export class TileSheet{
	img:Image;
	column:number;
	row:number;
	tile_w:number;
	tile_h:number;
	img_w:number;
	img_h:number;

	constructor(img:Image,column:number,row:number){
		this.img = img
		this.column = column
		this.row = row
		this.img_w = img.getWidth()
		this.img_h = img.getHeight()
		this.tile_w = this.img_w/column
		this.tile_h = this.img_h/row

	}
}

export function TilePainter(sheet:TileSheet,tileX:number,tileY:number,c:Color) : PaintFunction{

	if(tileX>=sheet.column){
		tileX= 0
	}
	if(tileY>=sheet.row){
		tileY= 0
	}

	let quad:Quad = love.graphics.newQuad(
		tileX*sheet.tile_w,tileY*sheet.tile_h,
		sheet.tile_w,sheet.tile_h,
		sheet.img_w,sheet.img_h,
	)

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,1)
		love.graphics.draw(sheet.img,quad,x,y,0,width/sheet.tile_w,height/sheet.tile_h)
	}
}
