import {PaintFunction} from '../frame/frame'
import {Color} from './color'

export function RectanglePainter(c:Color,rouned:number=0) :PaintFunction{
	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,255)
		love.graphics.rectangle("fill",x,y,width,height,rouned,rouned)
	}
}
