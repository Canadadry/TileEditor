import {Frame,PaintFunction,} from '../frame/frame';
import {Position,FixedPosition,LayoutPosition,XAlign,YAlign} from '../frame/position';
import {Size} from '../frame/size';
import {Window} from '../frame/window';
import {Layout,ColumnLayout,RowLayout,NoChildLayout,GridLayout} from '../frame/layout';
import {RectanglePainter} from '../painter/rectangle';
import {LabelPainter} from '../painter/label';
import {GroupPainter} from '../painter/group';
import {Colors} from '../painter/color';


export type ActionFunction = (id:string)=>void;

export class Button extends Frame {
	activePainter:PaintFunction
	selectedPainter:PaintFunction
	defaultPainter:PaintFunction
	action:ActionFunction;
	selected:boolean;
	id:string

	constructor(
		id:string,
		pos:Position,
		size:Size,
		parent:Frame,
		defaultPainter:PaintFunction,
		selectedPainter:PaintFunction,
		activePainter:PaintFunction,
		action:ActionFunction,
		){
			super(
				pos,
				size,
				parent,
				new NoChildLayout(),
				defaultPainter,
				(self:Button,x:number,y:number)=>{ self.paint = self.activePainter},
				(self:Button)=>{ 
					if(this.selected){
						self.paint = self.selectedPainter
					}{
						self.paint = self.defaultPainter
					}
					self.action(self.id)
				},
			)
			this.selected = false;
			this.defaultPainter = defaultPainter;
			this.selectedPainter = selectedPainter;
			this.activePainter = activePainter;
			this.action = action
			this.id = id
	}

	setSelected(s:boolean){
		this.selected = s;
		if (this.paint == this.defaultPainter && s){			
			this.paint = this.selectedPainter
		}else if (this.paint == this.selectedPainter && !s){			
			this.paint = this.defaultPainter
		}
	}
}

export class GroupButton{
	btns:Button[];
	selected:string;

	constructor(btns:Button[]){
		this.btns = btns
		this.selected = ""
	}

	select(btnId:string){
		this.selected = btnId
		for(let i:number=0;i<this.btns.length;i++){
			this.btns[i].setSelected(this.btns[i].id == btnId)
		}
	}
}
