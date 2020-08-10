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
	defaultPainter:PaintFunction
	action:ActionFunction;
	id:string

	constructor(
		id:string,
		pos:Position,
		size:Size,
		parent:Frame,
		defaultPainter:PaintFunction,
		activePainter:PaintFunction,
		action:ActionFunction,
		){
			super(
				pos,
				size,
				parent,
				new NoChildLayout(),
				defaultPainter,
				(self:Button)=>{ self.paint = self.activePainter},
				(self:Button)=>{ 
					self.paint = self.defaultPainter
					self.action(self.id)
				},
			)
			this.defaultPainter = defaultPainter;
			this.activePainter = activePainter;
			this.action = action
			this.id = id
	}

}
