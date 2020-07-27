class Apple {
    COLOR="#701515"

    constructor(x, y, size) {
		this.pos= { x: x, y: y }
		this.size= size
		this.eaten=false
    }

    draw(ctx) {
		ctx.fillStyle = this.COLOR
		ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size)
    }
	
	collidesWith(player) {
		let x1 = player.pos.x, y1 = player.pos.y
		let x2 = player.pos.x+player.size, y2 = player.pos.y+player.size
		
		if (x1>=this.pos.x && x1 <= this.pos.x+this.size) {
			if (y1>=this.pos.y && y1 <= this.pos.y+this.size) return true
            else if (y2>=this.pos.y && y2 <= this.pos.y+this.size) return true
            else return false
		} else if (x2>=this.pos.x && x2 <= this.pos.x+this.size) {
			if (y1>=this.pos.y && y1 <= this.pos.y+this.size) return true
            else if (y2>=this.pos.y && y2 <= this.pos.y + this.size) return true
			else return false
		}
	}

}