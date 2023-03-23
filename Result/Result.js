/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Result extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Next", "./Result/costumes/Next.svg", {
        x: 30.119050000000016,
        y: 33.74443547932668
      })
    ];

    this.sounds = [new Sound("pop", "./Result/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowResults" },
        this.whenIReceiveShowresults
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveShowresults() {
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.broadcast("Results");
    this.stage.vars.questionno = this.stage.vars.questions.length + 1;
  }
}
