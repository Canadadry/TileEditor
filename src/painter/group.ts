import {PaintFunction} from '../frame/frame'
import {Color} from './color'

export function GroupPainter(p:PaintFunction[]) :PaintFunction{
	return (x:number,y:number,width:number,height:number)=>{
		for(let i:number=0;i<p.length;i++){
			p[i](x,y,width,height)
		}
	}
}
