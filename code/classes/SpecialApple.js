class SpecialApple extends Apple {
    COLOR="#888606"
	POINTS=50
	APPEAR_CHANCE=10

    constructor(x, y, size) {
		super(x, y, size)
		this.shown=false
    }
}