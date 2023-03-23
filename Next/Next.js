/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Next extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Next", "./Next/costumes/Next.svg", {
        x: 30.11904999999996,
        y: 30.119050000000016
      })
    ];

    this.sounds = [new Sound("pop", "./Next/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "HideNext" },
        this.whenIReceiveHidenext
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowNext" },
        this.whenIReceiveShownext
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenIReceiveHidenext() {
    this.visible = false;
  }

  *whenIReceiveShownext() {
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.broadcast("NextQ");
  }
}
