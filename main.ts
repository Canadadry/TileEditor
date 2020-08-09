import {Panel, PanelParam} from './src/panel'
import { Color } from './src/color'


let panel:Panel;

love.update = function(dt) {}

love.draw = function() {
	panel.draw()
}

love.load = function() {
	let param = new PanelParam()
	param.frame.w = 200
	param.frame.h = 10
	param.fill = new Color(0,0.1,0.3)
	param.align.v = "CENTER"
	param.align.h = "CENTER"
	panel = new Panel(param)
}



love.mousepressed = function( x:number, y:number, button:number,isTouch:boolean ){
}

love.mousereleased = function( x:number, y:number, button:number,isTouch:boolean ){

}