export type HAlign = "LEFT"  | "CENTER" | "RIGHT" | "STRETCH"
export type VAlign = "TOP" | "CENTER" | "BOTTOM" | "STRETCH"

export class Align{
	h:HAlign;
	v:VAlign;
	constructor(h:HAlign = "LEFT",v:VAlign ="TOP"){
		this.h = h;
		this.v = v;
	}
}