class Snake extends Apple {
	SPEED= 3
	COLOR="#225f16"

    constructor(x, y, size) {
		super(x, y, size)
		this.status= {
			goingUp:false, goingDown:false, goingRight:false, goingLeft:false, dead:false
		}
	}
	
	moving(cw, ch) {
        if (this.status.goingLeft==true) {
            if(this.pos.x>0) this.pos.x-=this.SPEED
            else { this.pos.x=0; this.status.dead=true }
        } else if (this.status.goingRight==true) {
            if(this.pos.x+this.size<cw) this.pos.x+=this.SPEED
            else { this.pos.x=cw-this.size; this.status.dead=true }
        } else if (this.status.goingUp==true) {
            if(this.pos.y>0) this.pos.y-=this.SPEED
            else { this.pos.y=0; this.status.dead=true }
        } else if (this.status.goingDown==true) {
            if(this.pos.y+this.size<ch) this.pos.y+=this.SPEED
            else { this.pos.y=ch-this.size; this.status.dead=true }
        }
	}
	
	detectMovement(keyCode) {
		if ((keyCode=="ArrowUp" || keyCode=="KeyW") && this.status.goingDown!=true) {
			this.status.goingUp=true; this.status.goingLeft=false; this.status.goingRight=false
		} else if ((keyCode=="ArrowDown" || keyCode=="KeyS") && this.status.goingUp!=true) {
			this.status.goingDown=true; this.status.goingLeft=false; this.status.goingRight=false
		} else if ((keyCode=="ArrowRight" || keyCode=="KeyD") && this.status.goingLeft!=true) {
			this.status.goingRight=true; this.status.goingUp=false; this.status.goingDown=false
		} else if ((keyCode=="ArrowLeft" || keyCode=="KeyA") && this.status.goingRight!=true) {
			this.status.goingLeft=true; this.status.goingUp=false; this.status.goingDown=false
		}
	}

	grow() {
		
	}
}