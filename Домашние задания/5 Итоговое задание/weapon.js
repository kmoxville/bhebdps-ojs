class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.initDurability = this.durability;
        this.range = range;
    }

    takeDamage(damage) {
        if (this.durability > 0) {
            this.durability -= damage;
            if (this.durability < 0) {
                this.durability = 0;
            }
        }
    }

    getDamage() {
        if (this.durability <= 0) {
            return 0;
        }
        
        return this.durability >= this.initDurability * 0.3 ? this.attack : this.attack / 2;
    }

    isBroken() {
        return this.durability === 0;
    }
}