
export type Layout = NoChildLayout|ColumnLayout|RowLayout|GridLayout

export class NoChildLayout{
	kind:"NoChildLayout" = "NoChildLayout"
} 
export class ColumnLayout{
	kind:"ColumnLayout" = "ColumnLayout"
	spacing:number;

	constructor(s:number = 0){
		this.spacing = s;
	}
} 
export class RowLayout{
	kind:"RowLayout" = "RowLayout"
	spacing:number;

	constructor(s:number = 0){
		this.spacing = s;
	}
} 
export class GridLayout{
	kind:"GridLayout" = "GridLayout"
	spacing:number;
	col:number;	

	constructor(c:number= 1,s:number = 0){
		this.spacing = s;
		this.col = c;
		if(this.col<1){
			this.col = 1;
		}
	}
}