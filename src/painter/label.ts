import {PaintFunction} from '../frame/frame'
import {Color} from './color'

export type TextAlign = "left" | "center" | "right" | "justify"

export function LabelPainter(txt:string,c:Color,mode:TextAlign="justify") :PaintFunction{

	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(c.r,c.g,c.b,1)
		love.graphics.printf(txt,x,y+height/2,width,mode)
	}
}
