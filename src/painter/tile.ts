import {PaintFunction} from '../frame/frame'
import {Color,Colors} from '../painter/color';


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

export class Tile {
	x:number
	y:number

	constructor(x:number,y:number){
		this.x = x
		this.y = y
	}
}

export function TilePainter(sheet:TileSheet,tile:Tile,c:Color=Colors.White) : PaintFunction{

	if(tile.x>=sheet.column){
		tile.x= 0
	}
	if(tile.y>=sheet.row){
		tile.y= 0
	}

	let quad:Quad = love.graphics.newQuad(
		tile.x*sheet.tile_w,tile.y*sheet.tile_h,
		sheet.tile_w,sheet.tile_h,
		sheet.img_w,sheet.img_h,
	)

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,1)
		love.graphics.draw(sheet.img,quad,x,y,0,width/sheet.tile_w,height/sheet.tile_h)
	}
}

export function TileSetPainter(sheet:TileSheet,tiles:Tile[],column:number,spacing:number=0,c:Color=Colors.White) : PaintFunction{
	
	let batch:SpriteBatch = love.graphics.newSpriteBatch(sheet.img, tiles.length)
	let row = math.ceil(tiles.length / column)
	let tileset_w = column*(sheet.tile_w+spacing) - spacing
	let tileset_h = row   *(sheet.tile_h+spacing) - spacing

	let x:number = 0;
	let y:number = 0;

	for(let i=0;i<tiles.length;i++){
		let tile:Tile = tiles[i]

		if(tile.x>=sheet.column){ tile.x = 0 }
		if(tile.y>=sheet.row){ tile.y = 0 }

		batch.add(love.graphics.newQuad(
				tile.x*sheet.tile_w,tile.y*sheet.tile_h,
				sheet.tile_w,sheet.tile_h,
				sheet.img_w,sheet.img_h,
			),
			x*(sheet.tile_w+spacing),
			y*(sheet.tile_h+spacing)
		)
		x++
		if (x >= column){
			x=0
			y++
		}
	}

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,1)
		love.graphics.draw(batch,x,y,0,width/tileset_w,height/tileset_h)
	}
}