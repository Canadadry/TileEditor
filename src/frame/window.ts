import {FixedPosition} from './position';
import {Size} from './size';

export class Window{
	kind:"window" = "window"
	globalPosition:FixedPosition;
	size:Size;

	constructor(width:number, height:number){
		this.globalPosition = new FixedPosition(0,0);
		this.size = new Size(width,height);
	}
}
