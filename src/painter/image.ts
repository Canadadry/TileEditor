import {PaintFunction} from '../frame/frame'

export function ImagePainter(i:Image) :PaintFunction{
	let img_w:number = i.getWidth()
	let img_h:number = i.getHeight()

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(1,1,1,1)
		love.graphics.draw(i,x,y,0,width/img_w,height/img_h)
	}
}
