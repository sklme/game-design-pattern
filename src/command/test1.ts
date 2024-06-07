/**
 * @file test1.ts
 * @description 命令模式的测试，混元的解释
 */

// 首先，我们定义一个Command接口，它包含execute和undo两个方法，这样可以确保所有实现了Command接口的类都有这两个方法。
interface Command {
  execute(gameActor: GameActor): void;
  undo(): void;
}

// 接着，我们定义一个GameActor类，它代表游戏世界中的角色，具有jump和moveTo等方法。
class GameActor {
  x: number = 0;
  y: number = 0;

  jump(): void {
    console.log('Jumping..');
  }

  moveTo(x: number, y: number): void {
    console.log(`move to ${x}, ${y}`);
  }
}

// 然后，我们创建具体的命令类，如JumpCommand和MoveUnitCommand，它们都实现了Command接口，并且封装了对GameActor实例的操作。
class JumpCommand implements Command {
  constructor(private actor: GameActor) {}

  execute(): void {
    this.actor.jump();
  }

  undo(): void {
    console.log('undo jump');
  }
}

class MoveUnitCommand implements Command {
  constructor(private actor: GameActor, private x: number, private y: number) {
    this.xBefore = actor.x;
    this.yBefore = actor.y;
  }

  private xBefore: number = 0;
  private yBefore: number = 0;

  execute(): void {
    this.xBefore = this.actor.x;
    this.yBefore = this.actor.y;
    this.actor.moveTo(this.x, this.y);
  }

  undo(): void {
    this.actor.moveTo(this.xBefore, this.yBefore);
  }
}

// 在输入处理部分，我们可以创建一个InputHandler类，它根据用户的输入返回相应的命令对象。
class InputHandler {
  private buttonX: Command;
  private buttonY: Command;

  constructor() {
    this.buttonX = new JumpCommand(new GameActor());
    this.buttonY = new MoveUnitCommand(new GameActor(), 0, 0);
  }

  // 根据用户的输入返回相应的命令对象
  handleInput(): Command | null {
    // if (input === 'X') {
    //   return this.buttonX;
    // } else if (input === 'Y') {
    //   return this.buttonY;
    // }

    return null;
  }
}

// 最后，我们可以使用InputHandler来处理用户输入，并通过命令对象控制GameActor的行为。
const inputHandler = new InputHandler();
const actor = new GameActor();

let command = inputHandler.handleInput();
while (command) {
  command.execute(actor);
  // 需要撤销
  // command.undo();
  command = inputHandler.handleInput();
}
