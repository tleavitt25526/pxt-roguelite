enum Controllers {
    TopDown,
    Platformer
}
namespace Roguelite {

    /**
     * Create a new roguelite player
     */
    //% block="create player"
    //% group="Player"
    //% blockSetVariable=roguePlayer
    export function createRoguePlayer() : RoguePlayer {
        return new RoguePlayer(100, Controllers.TopDown);
    }

    /**
     * Create a new coffee item
     */
    //% block="create coffee"
    //% group="Items"
    //% blockSetVariable=coffee
    export function createCoffee() : Coffee {
        return new Coffee(10, 50, 50);
    }
}
class RoguePlayer {
    _moveSpeed: number;
    _controller: Controllers;

    _playerSprite: Sprite

    constructor(moveSpeed: number, controller: Controllers) {
        this._moveSpeed = moveSpeed;
        this._controller = controller;

        this._playerSprite = sprites.create(assets.image`Player`, SpriteKind.Player);
        
    }

    /**
     * Set movement speed of the given player
     */
    //% block="set $this to $moveSpeed"
    //% this.defl=roguePlayer
    //% this.shadow=variables_get
    //% moveSpeed.shadow=number
    //% moveSpeed.defl=10
    //% group="Player"
    setMoveSpeed(moveSpeed: number) {
        this._moveSpeed = moveSpeed;
    }

    /**
     * Allow given player to move
     */
    //% block="wake $this"
    //% this.defl=roguePlayer
    //% this.shadow=variables_get
    //% group="Player"
    wakePlayer() {
        if (this._controller == Controllers.TopDown) {
            controller.moveSprite(this._playerSprite, this._moveSpeed, this._moveSpeed);
        }
    }
    
    /**
     * Prevent given player from moving
     */
    //% block="sleep $this"
    //% this.defl=roguePlayer
    //% this.shadow=variables_get
    //% group="Player"
    sleepPlayer() {
        if (this._controller == Controllers.TopDown) {
            controller.moveSprite(this._playerSprite, 0, 0);
        }
    }
}
class Coffee {
    _modifier: number;
    _sprite: Sprite;
    
    constructor(modifier: number, x: number, y: number) {
        this._modifier = modifier;

        this._sprite = sprites.create(assets.image`Coffee`, SpriteKind.Player);
        this._sprite.setPosition(x, y);
    }
}
let roguePlayer = Roguelite.createRoguePlayer()
roguePlayer.wakePlayer()
let coffee = Roguelite.createCoffee()
