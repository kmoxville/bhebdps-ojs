class Player {
    constructor(name, position, life = 100, mana = 20, speed = 1, attack = 10, agility = 5, luck = 10, 
        description = 'Игрок', weapon = new Arm()) {
        this.life = life;
        this.mana = mana;
        this.speed = speed;
        this.attack = attack;
        this.agility = agility;
        this.luck = luck;
        this.description = description;
        this.weapon = weapon;
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

    moveLeft(distance) {
        const moveDistance = Math.min(distance, this.speed);
        this.position -= moveDistance;
    }

    moveRight(distance) {
        const moveDistance = Math.min(distance, this.speed);
        this.position += moveDistance;
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(-distance);
        } else {
            this.moveRight(distance);
        }
    }

    isAttackBlocked() {
        const luckLimit = (100 - this.luck) / 100;
        return this.getLuck() > luckLimit;
    }

    dodged() {
        const dodgeLimit = (100 - this.agility - this.speed * 3) / 100;
        return this.getLuck() > dodgeLimit;
    }

    takeAttack(damage, target) {
        if (target.isAttackBlocked()) {
            target.weapon.takeDamage(damage);
            return;
        }

        if (target.dodged()) {
            return;
        }

        target.takeDamage(damage);
    }

    checkWeapon() {
        if (this.weapon.isBroken()) { 
            if (this.weapon instanceof Knife || this.weapon instanceof Arm) {
                this.weapon = new Arm();
                return;
            }

            this.weapon = new Knife();
        }
    }

    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);
 
        if (distance > this.weapon.range) {
            return;
        }
 
        const damageToWeapon = 10 * this.getLuck();
        this.weapon.takeDamage(damageToWeapon); 
 
        let damageDone = this.getDamage(distance);
 
        if (this.position === enemy.position) { 
            enemy.moveRight(1);
            damageDone *= 2;
        }
 
        enemy.takeDamage(damageDone);
    }

    chooseEnemy(players) {
        const aliveEnemies = players.filter(player => player !== this && !player.isDead());
        
        if (aliveEnemies.length === 0) {
            return null;
        }
 
        return aliveEnemies.reduce((prev, curr) => prev.life < curr.life ? prev : curr);
    }
 
    moveToEnemy(enemy) {
        const distance = Math.abs(this.position - enemy.position);
        
        if (distance > 0) {
            if (enemy.position > this.position) {
                this.moveRight(1);
            } else {
                this.moveLeft(1);
            }
        }
    }
 
    turn(players) {
        const enemy = this.chooseEnemy(players);
        
        if (!enemy || enemy.isDead()) {
            return;
        }
        
        this.moveToEnemy(enemy);
        
        if (Math.abs(this.position - enemy.position) <= this.weapon.range) {
            this.tryAttack(enemy);
        }
    }
}

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

// Основные персонажи
class Mage extends Player {
    constructor(name, position) {
        super(name, position);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            damage = damage / 2;
            this.magic -= 12;

            if (this.magic < 0) {
                this.magic = 0;
            }
        }

        super.takeDamage(damage);
    }
}

class Archer extends Player {
    constructor(name, position) {
        super(name, position);
        this.life = 80;
        this.magic = 35;
        this.attack = 5;
        this.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow();
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();
        const weaponRange = this.weapon.range;

        if (distance > weaponRange) {
            return 0;
        }

        return (this.attack + weaponDamage) * this.getLuck() * distance / weaponRange;
    }
}

class Warrior extends Player {
    constructor(name, position) {
        super(name, position);
        this.life = 120;
        this.speed = 2;
        this.attack = 10;
        this.description = 'Воин';
        this.weapon = new Sword();
    }

    takeDamage(damage) {
        if (this.life < this.life * 0.5 && this.getLuck() > 0.8) {
            if (this.magic > 0) {
                const damageToMagic = Math.min(damage, this.magic);
                this.magic -= damageToMagic;
                damage -= damageToMagic;
            }
        }

        super.takeDamage(damage);
    }
}

// Дополнительные персонажи
class Crossbowman extends Archer {
    constructor(name, position) {
        super(name, position);
        this.life = 85;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
    }
}

class Demiurge extends Mage {
    constructor(name, position) {
        super(name, position);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 20;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
    }

    getDamage(distance) {
        if (super.getDamage(distance) === 0)
            return 0;

        const weaponDamage = this.weapon.getDamage();
        let baseDamage = (this.attack + weaponDamage) * this.getLuck() / distance;

        if (this.magic > 0 && this.getLuck() > 0.6) {
            baseDamage *= 1.5;
        }

        return baseDamage;
    }
}

class Dwarf extends Warrior {
    constructor(name, position) {
        super(name, position);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.hitCount = 0;
    }

    takeDamage(damage) {
        this.hitCount++;

        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            damage /= 2;
        }

        super.takeDamage(damage);
    }
}

// основное оружие
class Arm extends Weapon {
    constructor() {
        super('Рука', 1, Infinity, 1);
    }
}

class Bow extends Weapon {
    constructor() {
        super('Лук', 10, 200, 3);
    }
}

class Knife extends Weapon {
    constructor() {
        super('Нож', 5, 300, 1);
    }
}

class Staff extends Weapon {
    constructor() {
        super('Посох', 8, 300, 2);
    }
}

class Sword extends Weapon {
    constructor() {
        super('Меч', 25, 500, 1);
    }
}

// дополнительное оружие
class Axe extends Sword {
    constructor() {
        super();
        this.name = 'Секира';
        this.attack = 27;
        this.durability = 800;
    }
}

class LongBow extends Bow {
    constructor() {
        super();
        this.name = 'Лук';
        this.attack = 15;
        this.durability = 4;
    }
}

class StormStaff extends Staff {
    constructor() {
        super();
        this.name = 'Посох Бури';
        this.attack = 10;
        this.range = 3;
    }
}

let player = new Warrior("Алёша Попович", 0);
let archer = new Archer("Леголас", 2);

console.log(archer.life, archer.position);
player.tryAttack(archer);
console.log(archer.life, archer.position);
player.moveRight(1);
player.tryAttack(archer);
console.log(archer.life, archer.position);
player.moveRight(1);
player.tryAttack(archer);
console.log(archer.life, archer.position);