/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class B extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Initial", "./B/costumes/Initial.svg", {
        x: 45,
        y: 70.84349274999998
      }),
      new Costume("Green", "./B/costumes/Green.svg", {
        x: 45,
        y: 69.79898812499998
      }),
      new Costume("Red", "./B/costumes/Red.svg", {
        x: 45,
        y: 69.79898624999997
      })
    ];

    this.sounds = [new Sound("pop", "./B/sounds/pop.wav")];

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
      this.itemOf(this.stage.vars.optionB, this.stage.vars.questionno - 1)
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
        "B"
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
        ) === "B"
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
        ) === "B"
      ) {
        if (
          this.toString(
            this.itemOf(this.stage.vars.answer, this.stage.vars.questionno - 1)
          ) === "B"
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
