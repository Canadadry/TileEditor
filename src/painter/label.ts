import {PaintFunction} from '../frame/frame'
import {Color} from './color'

export function LabelPainter(txt:string,c:Color) :PaintFunction{

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,1)
		love.graphics.print(txt,x,y)
	}
}
