namespace Roguelike {

    //% block="create apple"
    //% blockSetVariable=item
    export function createMaxHealth(): Apple {
        return new Apple()
    }
}

//% blockNamespace=Roguelike
class Apple {
    _health: number

    //% block="set $this to $health"
    //% this.defl=item
    //% this.shadow=variables_get
    //% health.shadow=number
    //% health.defl=10
    setHealth(health: number) {
        this._health = health
    }
}
