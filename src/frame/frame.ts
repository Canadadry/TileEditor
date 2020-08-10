import {Position,FixedPosition,XAlign,YAlign} from './position';
import {Size} from './size';
import {Window} from './window';
import {Layout,NoChildLayout} from './layout';


export type PaintFunction = (x:number,y:number,width:number,height:number)=>void;
export type InteractionPressFunction = (f:Frame,x:number,y:number)=>void;
export type InteractionReleaseFunction = (f:Frame)=>void;

export class Frame{
	kind:"frame" = "frame"
	pos:Position;
	currentPosition:FixedPosition;
	globalPosition:FixedPosition;
	size:Size;
	parent:Frame|Window;
	children:Frame[];
	layout:Layout;
	paint:PaintFunction|null;
	onPress:InteractionPressFunction|null;
	onRelease:InteractionReleaseFunction|null;
	needUpdate:boolean;
	focused:Frame|null;

	constructor(
			pos:Position,
			size:Size,
			parent:Frame|Window,
			layout:Layout = new NoChildLayout(),
			paint:PaintFunction|null = null,
			onPress:InteractionPressFunction|null = null,
			onRelease:InteractionReleaseFunction|null= null,
	){
		this.currentPosition = new FixedPosition();
		this.globalPosition = new FixedPosition();
		this.children = [];
		this.pos = pos;
		this.size = size;
		this.parent = parent;
		if (this.parent.kind=="frame"){
			table.insert(this.parent.children,this)
		}
		this.layout = layout;
		this.paint = paint;
		this.onPress = onPress;
		this.onRelease = onRelease;
		this.focused = null;
		this.needUpdate = true;
	}

	moveAt(x:number,y:number){
		if (this.pos.kind != "fixed"){
			return
		}
		this.pos.x = x;
		this.pos.y = y;
		this.needUpdate = true;
	}

	anchorAt(x:XAlign,y:YAlign){
		if (this.pos.kind != "anchored"){
			return
		}
		this.pos.setX(x);
		this.pos.setY(y);
		this.needUpdate = true;
	}

	switchPositionType(pos:Position){
		this.pos = pos;
		this.needUpdate = true;
	}

	resize(w:number,h:number){
		this.size.w = w;
		this.size.h = h;
		this.needUpdate = true;
	}

	update(forced:boolean=false){
		if(this.needUpdate == false && forced == false ){
			return;
		}
		if (this.pos.kind == "fixed"){
				this.currentPosition.x = this.pos.x;
				this.currentPosition.y = this.pos.y;
		}else if (this.pos.kind == "anchored" ) {
				this.currentPosition.x = this.pos.x * (this.parent.size.w - this.size.w);
				this.currentPosition.y = this.pos.y * (this.parent.size.h - this.size.h);
		}
		this.globalPosition.x = this.currentPosition.x + this.parent.globalPosition.x;
		this.globalPosition.y = this.currentPosition.y + this.parent.globalPosition.y;

		this.layoutChild()

		this.needUpdate = false;

		for(let i=0;i<this.children.length;i++){
			this.children[i].update(true)
		}
	}

	layoutChild(){
		if (this.layout.kind == "NoChildLayout"){
			return;
		}

		let layoutChild:Frame[] = [];
		for(let i=0;i<this.children.length;i++){
			if (this.children[i].pos.kind == "layout"){
				table.insert(layoutChild,this.children[i])
			}
		}
		if(this.layout.kind == "ColumnLayout"){
			let y:number =0;
			for(let i=0;i<layoutChild.length;i++){
				layoutChild[i].currentPosition.x = 0;
				layoutChild[i].currentPosition.y = y;
				y = y + layoutChild[i].size.h + this.layout.spacing;
			}
		}else if (this.layout.kind == "RowLayout"){
			let x:number =0;
			for(let i=0;i<layoutChild.length;i++){
				layoutChild[i].currentPosition.x = x;
				layoutChild[i].currentPosition.y = 0;
				x = x + layoutChild[i].size.w + this.layout.spacing;
			}
		}else if (this.layout.kind == "GridLayout"){
			let x:number =0;
			let y:number =0;
			for(let i:number=0;i<layoutChild.length;i++){	
				if(i%this.layout.col==0 && i!=0){
					y = y + layoutChild[i].size.h + this.layout.spacing;
					x = 0			
				}
				layoutChild[i].currentPosition.x = x;
				layoutChild[i].currentPosition.y = y;
				x = x + layoutChild[i].size.w + this.layout.spacing;
			}
		}
	}

	draw(){
		if(this.paint){
			this.paint(
				this.globalPosition.x,
				this.globalPosition.y,
				this.size.w,
				this.size.h,
			)
		}

		for(let i=0;i<this.children.length;i++){
			this.children[i].draw()
		}
	}

	hitTest(x:number,y:number):boolean{
 		return	x >= this.globalPosition.x && x <= this.globalPosition.x + this.size.w &&
				y >= this.globalPosition.y && y <= this.globalPosition.y + this.size.h
 	}

 	pick(x:number,y:number):Frame|null{

 		if(this.hitTest(x,y) == false){
 			return null
 		}
 		let found:Frame = this;
 		for(let i=0;i<this.children.length;i++){
 			let picked = this.children[i].pick(x,y)
			if( picked != null){
				found = picked
			}
		}
		return found
	}

	press(x:number,y:number){
		this.release()
		this.focused = this.pick(x,y);
		if(this.focused == null ){
			return 
		}
		if(this.focused && this.focused.onPress){
			this.focused.onPress(this.focused,x,y)
		}
	}

	release(){
		if(this.focused && this.focused.onRelease){
			this.focused.onRelease(this.focused)
		}
		this.focused = null;
	}

}