/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Teacher extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "femalepresenter3-0045150wcmxsb",
        "./Teacher/costumes/femalepresenter3-0045150wcmxsb.svg",
        { x: 111.5, y: 332 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Play" }, this.whenIReceivePlay),
      new Trigger(Trigger.BROADCAST, { name: "NextQ" }, this.whenIReceiveNextq),
      new Trigger(Trigger.BROADCAST, { name: "PrevQ" }, this.whenIReceivePrevq),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Results" },
        this.whenIReceiveResults
      )
    ];
  }

  *whenIReceivePlay() {
    this.stage.vars.state = "Play";
    this.stage.vars.questionno = 1;
    yield* this.showquestion();
  }

  *showquestion() {
    this.say(
      this.toString(this.stage.vars.questionno) +
        ") " +
        this.toString(
          this.itemOf(this.stage.vars.questions, this.stage.vars.questionno - 1)
        )
    );
    yield* this.broadcastAndWait("ShowOptions");
    this.broadcast("resetOptions");
    if (this.toNumber(this.stage.vars.questionno) === 1) {
      this.broadcast("HidePrev");
    } else {
      this.broadcast("ShowPrev");
    }
    if (
      this.compare(
        this.stage.vars.questionno,
        this.stage.vars.questions.length
      ) === 0
    ) {
      this.broadcast("HideNext");
      this.broadcast("ShowResults");
    } else {
      this.broadcast("ShowNext");
    }
  }

  *whenIReceiveNextq() {
    this.stage.vars.questionno++;
    yield* this.showquestion();
  }

  *whenIReceivePrevq() {
    this.stage.vars.questionno--;
    yield* this.showquestion();
  }

  *whenIReceiveResults() {
    this.stage.vars.state = "Results";
    yield* this.match();
    this.say(
      "Your score: " +
        (this.toString(this.stage.vars.score) +
          ("/" + this.toString(this.stage.vars.questions.length)))
    );
  }

  *match() {
    this.stage.vars.score = 0;
    this.stage.vars.i = 1;
    while (
      !(this.compare(this.stage.vars.i, this.stage.vars.questions.length) > 0)
    ) {
      if (
        this.compare(
          this.itemOf(this.stage.vars.answer, this.stage.vars.i - 1),
          this.itemOf(this.stage.vars.usersChoice, this.stage.vars.i - 1)
        ) === 0
      ) {
        this.stage.vars.score++;
      }
      this.stage.vars.i++;
      yield;
    }
  }
}
