/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Prev extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Prev", "./Prev/costumes/Prev.svg", {
        x: 30.11904999999993,
        y: 30.119049999999987
      })
    ];

    this.sounds = [new Sound("pop", "./Prev/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "HidePrev" },
        this.whenIReceiveHideprev
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowPrev" },
        this.whenIReceiveShowprev
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenIReceiveHideprev() {
    this.visible = false;
  }

  *whenIReceiveShowprev() {
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.broadcast("PrevQ");
  }
}
