export type Position = FixedPosition|AnchoredPosition|LayoutPosition;

export class FixedPosition{
	kind:"fixed" = "fixed";
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
	kind:"anchored" = "anchored";
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
	kind:"layout" = "layout"
}

