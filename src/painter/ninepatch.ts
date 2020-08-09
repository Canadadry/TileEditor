import {PaintFunction} from '../frame/frame'

export function NinePatchPainter(i:Image,left:number,right:number,top:number,bottom:number) :PaintFunction{
	let img_w:number = i.getWidth()
	let img_h:number = i.getHeight()
	print(img_w,img_h)

	let xAxis:number[] = [0,left,img_w-right,img_w];
	let yAxis:number[] = [0,top,img_h-bottom,img_h];

	let batch:SpriteBatch = love.graphics.newSpriteBatch(i, 9)
	for(let x:number=0;x<3;x++){	
		for(let y:number=0;y<3;y++){
			batch.add(
				love.graphics.newQuad(
					xAxis[x],xAxis[y],
					xAxis[x+1]-xAxis[x],xAxis[y+1]-xAxis[y],
					img_w,img_h,
				),
				xAxis[x],xAxis[y],
			)			
		}
	}


	return (x:number,y:number,width:number,height:number)=>{
		love.graphics.setColor(1,1,1,1)
		love.graphics.draw(batch,x,y,0,width/img_w,height/img_h)
	}
}
