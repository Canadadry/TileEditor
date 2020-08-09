export type Position = FixedPosition|AnchoredPosition|LayoutPosition;

export class FixedPosition{
	kind:"fixed";
	x:number;
	y:number;

	constructor(x:number=200, y:number=100){
		this.x = x
		this.y = y
	}
}

export type XAlign = "left"|"center"|"right"
export type YAlign = "top"|"center"|"bottom"

export class AnchoredPosition{
	kind:"anchored";
	x:number;
	y:number;

	constructor(x:XAlign="left", y:YAlign="top"){
		this.setX(x)
		this.setY(y)
	}

	setX(x:XAlign){
		switch (x) {
			case "left": this.x = 0;
			case "center": this.x = 0.5;
			case "right": this.x = 1;
		}
	}

	setY(y:YAlign){
		switch (y) {
			case "top": this.x = 0;
			case "center": this.x = 0.5;
			case "bottom": this.x = 1;
		}
	}
}

export class LayoutPosition{
	kind:"layout"
}


export type Layout = NoChildLayout|ColumnLayout|RowLayout|GridLayout

export class NoChildLayout{
	kind:"NoChildLayout"
} 
export class ColumnLayout{
	kind:"ColumnLayout"
	spacing:number;
} 
export class RowLayout{
	kind:"RowLayout"
	spacing:number;
} 
export class GridLayout{
	kind:"GridLayout"
	spacing:number;
	col:number;
	row:number;
} 

export class Size{
	w:number;
	h:number;

	constructor(width:number=200, height:number=100){
		this.w = width
		this.h = height
	}
}

export class Window{
	kind:"window";
	globalPosition:FixedPosition;
	size:Size;

	constructor(width:number, height:number){
		this.globalPosition = new FixedPosition(0,0);
		this.size = new Size(width,height);
	}
}

export type PaintFunction = (x:number,y:number,width:number,height:number)=>void;

export class Frame{
	kind:"frame";
	pos:Position;
	currentPosition:FixedPosition;
	globalPosition:FixedPosition;
	size:Size;
	parent:Frame|Window;
	children:Frame[];
	layout:Layout;
	paint:PaintFunction|null;

	constructor(
			pos:Position,
			size:Size,
			parent:Frame|Window,
			layout:Layout = new NoChildLayout(),
			paint:PaintFunction|null,
	){
		this.pos = pos;
		this.size = size;
		this.parent = parent;
		if (this.parent.kind=="frame"){
			table.insert(this.parent.children,this)
		}
		this.layout = layout;
		this.paint = paint;
		this.update();
	}

	moveAt(x:number,y:number){
		if (this.pos.kind != "fixed"){
			return
		}
		this.pos.x = x;
		this.pos.y = y;
		this.update();
	}

	anchorAt(x:XAlign,y:YAlign){
		if (this.pos.kind != "anchored"){
			return
		}
		this.pos.setX(x);
		this.pos.setY(y);
		this.update();
	}

	switchPositionType(pos:Position){
		this.pos = pos;
		this.update();
	}

	resize(w:number,h:number){
		this.size.w = w;
		this.size.h = h;
		this.update();
	}

	update(){
		switch (this.pos.kind){
			case "fixed" : {
				this.currentPosition.x = this.pos.x;
				this.currentPosition.y = this.pos.y;
			}
			case "anchored" : {
				this.currentPosition.x = this.pos.x * (this.parent.size.w - this.size.w);
				this.currentPosition.y = this.pos.y * (this.parent.size.h - this.size.h);
			}
		}
		this.globalPosition.x = this.currentPosition.x + this.parent.globalPosition.x;
		this.globalPosition.y = this.currentPosition.y + this.parent.globalPosition.y;

		this.layoutChild()

		for(let i=0;i<this.children.length;i++){
			this.children[i].update()
		}
	}

	layoutChild(){

		if (this.layout.kind == "NoChildLayout"){
			return;
		}

		let layoutChild:Frame[] = [];
		for(let i=0;i<this.children.length;i++){
			table.insert(layoutChild,this.children[i])
		}
		switch(this.layout.kind){
			case "ColumnLayout":{
				let y:number =0;
				for(let i=0;i<layoutChild.length;i++){
					layoutChild[i].currentPosition.x = 0;
					layoutChild[i].currentPosition.y = y;
					y = y + layoutChild[i].size.h + this.layout.spacing;
				}
			}
			case "RowLayout":{
				let x:number =0;
				for(let i=0;i<layoutChild.length;i++){
					layoutChild[i].currentPosition.x = x;
					layoutChild[i].currentPosition.y = 0;
					x = x + layoutChild[i].size.w + this.layout.spacing;
				}
			}
			case "GridLayout":{
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

}