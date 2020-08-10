import {PaintFunction} from '../frame/frame'

export function NinePatchPainter(i:Image,left:number,right:number,top:number,bottom:number) :PaintFunction{
	let img_w:number = i.getWidth()
	let img_h:number = i.getHeight()
	let curr_w = img_w;
	let curr_h = img_h;


	let coord:number[][] = [[0,left,img_w-right,img_w],[0,top,img_h-bottom,img_h]];
	let batch:SpriteBatch = love.graphics.newSpriteBatch(i, 9)




	return (x:number,y:number,width:number,height:number)=>{
		if (curr_w != width || curr_h != height)
		{
			let proj:number[][] = [
				[0,left,width-right,width],
				[0,top,height-bottom,height]
			];

			batch.clear()
			for(let i:number=0;i<3;i++){	
				for(let j:number=0;j<3;j++){
					batch.add(
						love.graphics.newQuad(
							coord[0][i],coord[1][j],
							coord[0][i+1]-coord[0][i],coord[1][j+1]-coord[1][j],
							img_w,img_h,
						),
						proj[0][i],proj[1][j],
						0,
						(proj[0][i+1]-proj[0][i])/(coord[0][i+1]-coord[0][i]),
						(proj[1][j+1]-proj[1][j])/(coord[1][j+1]-coord[1][j]),
					)			
				}
			}
			curr_w = width;
			curr_h = height;			
		}

		love.graphics.setColor(1,1,1,1)
		love.graphics.draw(batch,x,y)
	}
}
