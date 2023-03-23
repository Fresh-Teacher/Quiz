/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class A extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Initial", "./A/costumes/Initial.svg", {
        x: 45,
        y: 70.8434986875
      }),
      new Costume("Green", "./A/costumes/Green.svg", {
        x: 45,
        y: 69.7989840625
      }),
      new Costume("Red", "./A/costumes/Red.svg", {
        x: 45,
        y: 69.79898812499998
      })
    ];

    this.sounds = [new Sound("pop", "./A/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowOptions" },
        this.whenIReceiveShowoptions
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "resetOptions" },
        this.whenIReceiveResetoptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Results" },
        this.whenIReceiveResults
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "Initial";
    this.visible = true;
  }

  *whenIReceiveShowoptions() {
    this.visible = true;
    this.say(
      this.itemOf(this.stage.vars.optionA, this.stage.vars.questionno - 1)
    );
  }

  *whenthisspriteclicked() {
    if (this.toString(this.stage.vars.state) === "Play") {
      this.stage.vars.usersChoice.splice(
        this.stage.vars.questionno - 1,
        1,
        "A"
      );
      this.broadcast("resetOptions");
    }
  }

  *whenIReceiveResetoptions() {
    if (this.toString(this.stage.vars.state) === "Play") {
      if (
        this.toString(
          this.itemOf(
            this.stage.vars.usersChoice,
            this.stage.vars.questionno - 1
          )
        ) === "A"
      ) {
        this.costume = "Green";
      } else {
        this.costume = "Initial";
      }
    } else {
      if (
        this.toString(
          this.itemOf(
            this.stage.vars.usersChoice,
            this.stage.vars.questionno - 1
          )
        ) === "A"
      ) {
        if (
          this.toString(
            this.itemOf(this.stage.vars.answer, this.stage.vars.questionno - 1)
          ) === "A"
        ) {
          this.costume = "Green";
        } else {
          this.costume = "Red";
        }
      } else {
        this.costume = "Initial";
      }
    }
  }

  *whenIReceiveResults() {
    this.visible = false;
  }
}
