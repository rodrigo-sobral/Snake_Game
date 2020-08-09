"use strict"

class Snake extends Apple {
	DEFAULT_SPEED= 3
	MAX_SPEED=6
	COLOR="#064806"

    constructor(x, y, size) {
		super(x, y, size)
		this.status= { goingUp:false, goingDown:false, goingRight:false, goingLeft:false }
		this.speed=this.DEFAULT_SPEED
	}

	moving(cw, ch) {
        if (this.status.goingLeft) {
            if(this.pos.x>0) this.pos.x-=this.speed
            else { this.pos.x=0; return false }
        } else if (this.status.goingRight) {
            if(this.pos.x+this.size<cw) this.pos.x+=this.speed
            else { this.pos.x=cw-this.size; return false }
        } else if (this.status.goingUp) {
            if(this.pos.y>0) this.pos.y-=this.speed
            else { this.pos.y=0; return false }
        } else if (this.status.goingDown) {
            if(this.pos.y+this.size<ch) this.pos.y+=this.speed
            else { this.pos.y=ch-this.size; return false }
        }
	}
	
	detectMovement(keyType, keyCode) {
		if (keyType=="keydown") {
			if ((keyCode=="ArrowUp" || keyCode=="KeyW") && !this.status.goingDown) {
				if (this.status.goingUp && this.speed<this.MAX_SPEED) this.speed++ 
				else this.status.goingUp=true; this.status.goingLeft=false; this.status.goingRight=false;
			} else if ((keyCode=="ArrowDown" || keyCode=="KeyS") && !this.status.goingUp) {
				if (this.status.goingDown && this.speed<this.MAX_SPEED) this.speed++ 
				else this.status.goingDown=true; this.status.goingLeft=false; this.status.goingRight=false;
			} else if ((keyCode=="ArrowRight" || keyCode=="KeyD") && !this.status.goingLeft) {
				if (this.status.goingRight && this.speed<this.MAX_SPEED) this.speed++ 
				else this.status.goingRight=true; this.status.goingUp=false; this.status.goingDown=false; 
			} else if ((keyCode=="ArrowLeft" || keyCode=="KeyA") && !this.status.goingRight) {
				if (this.status.goingLeft && this.speed<this.MAX_SPEED) this.speed++ 
				else this.status.goingLeft=true; this.status.goingUp=false; this.status.goingDown=false; 
			}
		} else this.speed=this.DEFAULT_SPEED
	}

}