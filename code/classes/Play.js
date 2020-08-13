"use strict"
$ = jQuery

class Play {
    DEF_SQR_SZ=30
    INIT_X=50; INIT_Y=50

    constructor(cw, ch) {
        //  Snake Vars
        this.snake= [new Snake(this.INIT_X, this.INIT_Y,  this.DEF_SQR_SZ)]
        this.points_got= 0
        this.apples_eaten=0
        this.special_apples_eaten=0
        this.dead=false

        //  Apples Vars
        this.apple= new Apple(Math.floor(Math.random()*(cw-this.DEF_SQR_SZ)), Math.floor(Math.random()*(ch-this.DEF_SQR_SZ)), this.DEF_SQR_SZ)
        this.special_apple= new SpecialApple(Math.floor(Math.random()*(cw-this.DEF_SQR_SZ)), Math.floor(Math.random()*(ch-this.DEF_SQR_SZ)), this.DEF_SQR_SZ)
        this.special_apple_on=false
    }

    growSnake() {
        const last_snake= this.snake[this.snake.length-1]
        if (this.snake[this.snake.length-1].status.goingRight) {
            this.snake.push(new Snake(0, last_snake.pos.y, last_snake.size))
            this.snake[this.snake.length-1].pos.x= last_snake.pos.x-last_snake.size
        } else if (this.snake[this.snake.length-1].status.goingLeft) {
            this.snake.push(new Snake(0, last_snake.pos.y, last_snake.size))
            this.snake[this.snake.length-1].pos.x= last_snake.pos.x+last_snake.size
        } else if (this.snake[this.snake.length-1].status.goingUp) {
            this.snake.push(new Snake(last_snake.pos.x, 0, last_snake.size))
            this.snake[this.snake.length-1].pos.y= last_snake.pos.y+last_snake.size
        } else if (this.snake[this.snake.length-1].status.goingDown) {
            this.snake.push(new Snake(last_snake.pos.x, 0, last_snake.size))
            this.snake[this.snake.length-1].pos.y= last_snake.pos.y-last_snake.size
        }  Object.assign(this.snake[this.snake.length-1].status, last_snake.status)
        return this.snake
    }

    updatePointsBox() {
        $(".points_text_box").html("POINTS: "+this.points_got)
    }

    eatApple(cw, ch) {        
        if (!this.special_apple_on && this.apple.eaten) {
            this.apple.pos.x= Math.floor(Math.random()*(cw-this.DEF_SQR_SZ))
            this.apple.pos.y= Math.floor(Math.random()*(ch-this.DEF_SQR_SZ))
            this.apple.eaten=false
            this.apples_eaten++
            this.points_got+=this.apple.POINTS
            this.growSnake()
            this.probablyPicker(this.special_apple)
        } else if (this.special_apple_on && this.special_apple.eaten) {
            this.special_apple.pos.x= Math.floor(Math.random()*(cw-this.DEF_SQR_SZ))
            this.special_apple.pos.y= Math.floor(Math.random()*(ch-this.DEF_SQR_SZ))
            this.special_apple.eaten=false
            this.special_apples_eaten++
            this.points_got+=this.special_apple.POINTS
            this.growSnake()
            this.probablyPicker(this.special_apple)
        }
    }

    probablyPicker() {
        if (Math.floor(Math.random()*100)<=this.special_apple.APPEAR_CHANCE) this.special_apple_on=true
        else this.special_apple_on=false
    }
}