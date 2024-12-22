class Player {
    constructor(name, position) {
        this.life = 100;
        this.mana = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
    }

    getLuck() {
        const randomNumber = Math.floor(Math.random() * 100);
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();

        if (distance > this.weapon.range)
            return 0;

        return (this.attack + weaponDamage) * this.getLuck() / distance;
    }

    takeDamage(damage) {
        if (damage < 0) {
            return;
        }
        
        this.life -= damage;

        if (this.life < 0)
            this.life = 0;
    }

    isDead() {
        return this.life === 0;
    }
}