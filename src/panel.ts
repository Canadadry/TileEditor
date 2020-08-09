import { Color } from './color';
import { Frame } from './frame';
import { Align,HAlign,VAlign } from './align';
import { Vec2 } from './vec2';

export class PanelParam{
	frame:Frame = new Frame(0,0,200,100);
	pivot:Vec2 = new Vec2(0.5,0.5);
	fill:Color = new Color(76,76,76);
	opaque:boolean = true;
	align:Align = new Align("LEFT","TOP");
	border:number=0;
	inset:number = 10;
	parent:Panel;
	bg:Panel;
	anchor:Vec2=new Vec2(0,0);
	size:Vec2=new Vec2(1,1);
}

class Window{
	frame:Frame = new Frame();
	tframe:Frame= new Frame();

	getFrame():Frame{
		return this.frame;
	}
}

export class Panel{	

	anchor:Vec2;
	size:Vec2;
	frame:Frame;
	tframe:Frame;
	pivot:Vec2;
	fill:Color;
	interactive:boolean;
	visible:boolean;
	opaque:boolean;
	needsLayout:boolean;
	children:Array<Panel>;
	parent:Panel|Window|null;
	align:Align;
	border:number;
	inset:number;
	bg:Panel|null;
	parentW:number;
	parentH:number;
	layout:(()=>void)|null;

	constructor(params:PanelParam){

		this.pivot = params.pivot
		this.anchor = new Vec2(0,0)
		this.size = new Vec2(1,1)

		if (params.parent){
			params.parent.addChild(this)
		} 

		this.setFrame(params.frame)  
		this.tframe = new Frame(); 

		this.anchor = params.anchor
		this.size = params.size

		this.fill = params.fill
		this.interactive = false
		this.visible = true
		this.opaque = params.opaque 
		this.needsLayout = false
		this.children = []
		this.align = params.align
		this.border = params.border
		this.inset = params.inset


		this.update()
	}

	draw(){
		if (!this.visible){
			return
		}

		if (this.bg){
			this.bg.fill = this.fill
		}
		love.graphics.push("all")
		love.graphics.translate(this.frame.x, this.frame.y)

		love.graphics.setColor(this.fill.r,this.fill.g,this.fill.b,255)
		love.graphics.rectangle("fill",0,0,this.frame.w,this.frame.h)

		for(let i=0;i<this.children.length;i++){
			this.children[i].draw()
		}
		love.graphics.pop()
	}

	update(){
		let fakeParent = false;
		if(!this.parent){
			this.parent = new Window();
			this.parent.frame.w = love.window.getMode()[0]
			this.parent.frame.h = love.window.getMode()[1]
			this.parent.tframe.x = 0
			this.parent.tframe.y = 0
			fakeParent = true;
		}

		let pw:number = this.parent.frame.w
		let ph:number = this.parent.frame.h

		if (pw != this.parentW){
			this.ajustToParentWidth(pw)
		}
		if (ph != this.parentH){
			this.ajustToParentwHeight(ph)
		}

		this.frame.w = this.parent.frame.w * this.size.x 
		this.frame.h = this.parent.frame.h * this.size.y
		this.frame.x = this.anchor.x * this.parent.frame.w - this.frame.w * this.pivot.x
		this.frame.y = this.anchor.y * this.parent.frame.h - this.frame.h * this.pivot.y

		this.tframe.w = this.frame.w
		this.tframe.h = this.frame.h 
		this.tframe.x = this.parent.tframe.x + this.frame.x
		this.tframe.y = this.parent.tframe.y + this.frame.y

		if (this.needsLayout &&  this.layout) { 
			this.layout() 
			this.needsLayout = false
		}

		for(let i=0;i<this.children.length;i++){
			this.children[i].update()
		}
	}

	ajustToParentWidth(pw:number){
		let w = this.size.x * this.parentW;
		let x = this.anchor.x * this.parentW - this.pivot.x * w

		if( this.align.h == "LEFT"){
			x = x + this.pivot.x * w
			this.anchor.x = x / pw
		}else if(this.align.h == "CENTER"){
			x = x - this.parentW/2 + pw/2 + this.pivot.x * w
			this.anchor.x = x / pw
		}else if(this.align.h == "RIGHT" ){
			x = x - this.parentW + pw + this.pivot.x * w
			this.anchor.x = x / pw
		}else if(this.align.h == "STRETCH"){
			let left = x
			let right = x - this.parentW + pw + w
			w = right - left
			this.anchor.x = (left + this.pivot.x * w) / pw
		}

		this.size.x = w / pw
		this.parentW = pw
	}

	ajustToParentwHeight(ph:number){
		let h = this.size.y * this.parentH
		let y = this.anchor.y * this.parentH - this.pivot.y * h   

		if (this.align.v == "BOTTOM" ){
			y = y + this.pivot.y * h
			this.anchor.y = y / ph
		}else if( this.align.v == "CENTER" ){
			y = y - this.parentH/2 + ph/2 + this.pivot.y * h
			this.anchor.y = y / ph
		}else if( this.align.v == "TOP" ){
			y = y - this.parentH + ph + this.pivot.y * h
			this.anchor.y = y / ph
		}else if( this.align.v == "STRETCH" ){
			let left = y
			let right = y - this.parentH + ph + h
			h = right - left
			this.anchor.y = (left + this.pivot.y * h) / ph
		}

		this.size.y = h / ph
		this.parentH = ph
	}

	setFrame(frame:Frame){

		let pw:number = love.window.getMode()[0]
		let ph:number = love.window.getMode()[1]
		if(this.parent){
			pw = this.parent.frame.w
			ph = this.parent.frame.h        
		}

		this.anchor = new Vec2((frame.x + this.pivot.x * frame.w) / pw, (frame.y + this.pivot.y * frame.h) / ph)
		this.size = new Vec2(frame.w / pw, frame.h / ph)    
		this.parentW = pw 
		this.parentH = ph  

		this.frame = frame       
	}

	getFrame():Frame{
		let pf = new Frame(0,0,love.window.getMode()[0],love.window.getMode()[1])
		if(this.parent){
			pf = this.parent.getFrame()
		}

		let w = this.size.x * pf.w
		let h = this.size.y * pf.h
		let x = this.anchor.x * pf.w - this.pivot.x * w
		let y = this.anchor.y * pf.h - this.pivot.y * h
		return new Frame(x,y,w,h)
	}


	top(inside:boolean){
		let value:number = 0
		if(inside){
			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]
				value = math.max(value, this.tframe.y + v.frame.y + v.frame.h)
			}
		}else{
			value = this.tframe.y + this.tframe.h 
		}
		return value
	}

	bottom(inside:boolean){
		let value:number = this.tframe.y + this.tframe.h
		if(inside){
			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]
				value = math.min(value, this.tframe.y + v.frame.y)
			}
		}else{
			value = this.tframe.y
		}
		return value
	}

	right(inside:boolean){
		let value:number = 0
		if (inside) {
			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]            
				value = math.max(value, this.tframe.x + v.frame.x + v.frame.w)

			}
		}else{
			value = this.tframe.x + this.tframe.w
		}
		return value
	}


	layoutHorizontal(spacing:number, stretch:boolean){
		if (stretch) {
			let width = (this.frame.w - spacing * (this.children.length+1)) / this.children.length
			let x = spacing
			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]       
				v.frame.x = x
				v.frame.w = width
				x = x + width + spacing
				v.needsLayout = true
			}
		}else{
			let x = spacing
			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]      
				v.frame.x = x
				x = x + v.frame.w + spacing
				v.needsLayout = true
			}
		}
		this.update()
	}

	layoutVertical(spacing:number, stretch:boolean){
		if (stretch) {
			let height = (this.frame.h - spacing * (this.children.length+1)) / this.children.length
			let y = this.frame.h - spacing

			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]  
				v.frame.y = y - v.frame.h
				v.frame.h = height
				y = y - height - spacing
				v.needsLayout = true
			}
		}else{
			let y = this.frame.h - spacing

			for(let i=0;i<this.children.length;i++){
				let v = this.children[i]  
				v.frame.y = y - v.frame.h
				y = y - v.frame.h - spacing
				v.needsLayout = true
			}
		}
		this.update()
	}

	addChild(child:Panel){
		let f = child.getFrame()
		child.parent = this
		child.setFrame(f)
		table.insert(this.children,child)
	}

	hitTest(x:number,y:number):boolean{
		return	x >= this.tframe.x && x <= this.tframe.x + this.tframe.w &&
		y >= this.tframe.y && y <= this.tframe.y + this.tframe.h
	}
	touched(touch:Vec2):boolean{
		return this.interactive && this.visible && this.hitTest(touch.x, touch.y)
	}

}
