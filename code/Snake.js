class Snake extends Apple {
	DEFAULT_SPEED= 3
	MAX_SPEED=6
	COLOR="#225f16"

    constructor(x, y, size) {
		super(x, y, size)
		this.status= {
			goingUp:false, goingDown:false, goingRight:false, goingLeft:false, dead:false
		}
		this.speed=this.DEFAULT_SPEED
	}
	
	draw(ctx) {
		ctx.fillStyle = this.COLOR
		ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size)
    }

	moving(cw, ch) {
        if (this.status.goingLeft==true) {
            if(this.pos.x>0) this.pos.x-=this.speed
            else { this.pos.x=0; this.status.dead=true }
        } else if (this.status.goingRight==true) {
            if(this.pos.x+this.size<cw) this.pos.x+=this.speed
            else { this.pos.x=cw-this.size; this.status.dead=true }
        } else if (this.status.goingUp==true) {
            if(this.pos.y>0) this.pos.y-=this.speed
            else { this.pos.y=0; this.status.dead=true }
        } else if (this.status.goingDown==true) {
            if(this.pos.y+this.size<ch) this.pos.y+=this.speed
            else { this.pos.y=ch-this.size; this.status.dead=true }
        }
	}
	
	detectMovement(keyType, keyCode) {
		if (keyType=="keydown") {
			if ((keyCode=="ArrowUp" || keyCode=="KeyW") && this.status.goingDown!=true) {
				if (this.status.goingUp==true && this.speed<this.MAX_SPEED) this.speed++ 
				else { this.status.goingUp=true; this.status.goingLeft=false; this.status.goingRight=false }
			} else if ((keyCode=="ArrowDown" || keyCode=="KeyS") && this.status.goingUp!=true) {
				if (this.status.goingDown==true && this.speed<this.MAX_SPEED) this.speed++ 
				else { this.status.goingDown=true; this.status.goingLeft=false; this.status.goingRight=false }
			} else if ((keyCode=="ArrowRight" || keyCode=="KeyD") && this.status.goingLeft!=true) {
				if (this.status.goingRight==true && this.speed<this.MAX_SPEED) this.speed++ 
				else { this.status.goingRight=true; this.status.goingUp=false; this.status.goingDown=false }
			} else if ((keyCode=="ArrowLeft" || keyCode=="KeyA") && this.status.goingRight!=true) {
				if (this.status.goingLeft==true && this.speed<this.MAX_SPEED) this.speed++ 
				else { this.status.goingLeft=true; this.status.goingUp=false; this.status.goingDown=false }
			}
		} else this.speed=this.DEFAULT_SPEED
	}

	
}