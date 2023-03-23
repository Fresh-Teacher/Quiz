/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class C extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Initial", "./C/costumes/Initial.svg", {
        x: 45,
        y: 70.84349681249999
      }),
      new Costume("Green", "./C/costumes/Green.svg", {
        x: 45,
        y: 69.79898218749996
      }),
      new Costume("Red", "./C/costumes/Red.svg", {
        x: 45,
        y: 69.79898218749996
      })
    ];

    this.sounds = [new Sound("pop", "./C/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowOptions" },
        this.whenIReceiveShowoptions
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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

  *whenIReceiveShowoptions() {
    this.visible = true;
    this.say(
      this.itemOf(this.stage.vars.optionC, this.stage.vars.questionno - 1)
    );
  }

  *whenGreenFlagClicked() {
    this.costume = "Initial";
    this.visible = true;
  }

  *whenthisspriteclicked() {
    if (this.toString(this.stage.vars.state) === "Play") {
      this.stage.vars.usersChoice.splice(
        this.stage.vars.questionno - 1,
        1,
        "C"
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
        ) === "C"
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
        ) === "C"
      ) {
        if (
          this.toString(
            this.itemOf(this.stage.vars.answer, this.stage.vars.questionno - 1)
          ) === "C"
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
