namespace SpriteKind {
    export const Coffee = SpriteKind.create()
    export const CustomPlayer = SpriteKind.create()
}
enum Controllers {
    TopDown,
    Platformer
}

namespace Roguelite {

    let roguePlayer: RoguePlayer;
    let coffeeModifier = 10;

    /**
     * Create a new roguelite player
     */
    //% block="create player"
    //% group="Player"
    //% blockSetVariable=roguePlayer
    export function createRoguePlayer(): RoguePlayer {
        roguePlayer = new RoguePlayer(100, Controllers.TopDown);
        return roguePlayer;
        //return new RoguePlayer(100, Controllers.TopDown);
    }

    /**
     * Spawn a new coffee item
     */
    //% block="create coffee at $x $y"
    //% group="Coffee"
    //% blockSetVariable=coffee
    export function createCoffee(x: number, y: number)  {
        let coffee = sprites.create(assets.image`Coffee`, SpriteKind.Coffee);
        coffee.setPosition(x, y);
        return coffee;
    }

    // sprite overlap with coffee
    sprites.onOverlap(SpriteKind.CustomPlayer, SpriteKind.Coffee, function (sprite: Sprite, otherSprite: Sprite) {
        otherSprite.destroy();
        roguePlayer.addMoveSpeed(coffeeModifier);
    })

    /**
     * Set Coffee Modifier
     */
    //% block="set coffeeModifier to $coffeeModifier"
    //% coffeeModifier.shadow=number
    //% coffeeModifier.defl=10
    //% group="Coffee"
    export function setCoffeeModifier(modifier: number) {
        coffeeModifier = modifier;
    }
}

//% blockNamespace=Roguelite
class RoguePlayer {
    _moveSpeed: number;
    _controller: Controllers;

    _playerSprite: Sprite;

    constructor(moveSpeed: number, controller: Controllers) {
        this._moveSpeed = moveSpeed;
        this._controller = controller;

        this._playerSprite = sprites.create(assets.image`Player`, SpriteKind.CustomPlayer);
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
    addMoveSpeed(moveSpeed: number) {
        this._moveSpeed += moveSpeed
        controller.moveSprite(this._playerSprite, this._moveSpeed, this._moveSpeed);
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
let roguePlayer = Roguelite.createRoguePlayer()
roguePlayer.wakePlayer()
let coffee = Roguelite.createCoffee(50, 50)