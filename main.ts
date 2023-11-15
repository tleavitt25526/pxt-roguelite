enum Controllers {
    TopDown,
    Platformer
}

//% color="#00bf83"
namespace Roguelite {

    /**
     * Create a new roguelite player
     */
    //% block="create player"
    //% blockSetVariable=roguePlayer
    export function createRoguePlayer() : RoguePlayer {
        return new RoguePlayer(100, Controllers.TopDown);
    }
}

//% blockNamespace=Roguelite
class RoguePlayer {
    _moveSpeed: number;
    _controller: Controllers;

    _playerSprite: Sprite

    constructor(moveSpeed: number, controller: Controllers) {
        this._moveSpeed = moveSpeed;
        this._controller = controller;

        this._playerSprite = sprites.create(img`
            . . . . . . f f f f . . . . . .
            . . . . f f f 2 2 f f f . . . .
            . . . f f f 2 2 2 2 f f f . . .
            . . f f f e e e e e e f f f . .
            . . f f e 2 2 2 2 2 2 e e f . .
            . . f e 2 f f f f f f 2 e f . .
            . . f f f f e e e e f f f f . .
            . f f e f b f 4 4 f b f e f f .
            . f e e 4 1 f d d f 1 4 e e f .
            . . f e e d d d d d d e e f . .
            . . . f e e 4 4 4 4 e e f . . .
            . . e 4 f 2 2 2 2 2 2 f 4 e . .
            . . 4 d f 2 2 2 2 2 2 f d 4 . .
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
        `, SpriteKind.Player);
        
    }

    /**
     * Set movement speed of the given player
     */
    //% block="set $this to $moveSpeed"
    //% this.defl=roguePlayer
    //% this.shadow=variables_get
    //% moveSpeed.shadow=number
    //% moveSpeed.defl=10
    setMoveSpeed(moveSpeed: number) {
        this._moveSpeed = moveSpeed;
    }

    /**
     * Allow given player to move
     */
    //% block="wake $this"
    //% this.defl=roguePlayer
    //% this.shadow=variables_get
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
    sleepPlayer() {
        if (this._controller == Controllers.TopDown) {
            controller.moveSprite(this._playerSprite, 0, 0);
        }
    }
}
let roguePlayer = Roguelite.createRoguePlayer()
roguePlayer.wakePlayer()