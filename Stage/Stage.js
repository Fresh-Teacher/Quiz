/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 254.5,
        y: 201.6999969482422
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.i = 51;
    this.vars.questionno = 1;
    this.vars.score = 7;
    this.vars.state = "Play";
    this.vars.initial = [
      "What is the Capital City of Uganda ?",
      "Lira",
      "Jinja",
      "Kampala",
      "C",
      "What is the Capital City of India ?",
      "New Delhi",
      "Mumbai",
      "Hyderabad",
      "A",
      "What is the Capital City of USA ?",
      "New York",
      "Washington DC",
      "Los Angeles",
      "B",
      "Where is Machu Picchu Located ?",
      "Colombia",
      "Peru",
      "Brazil",
      "B",
      "What is the Capital City of Malaysia ?",
      "Singapore",
      "Bangkok",
      "Kuala Lumpur",
      "C",
      "What is the Capital City of Kenya ?",
      "Mombasa",
      "Nairobi",
      "Kisumu",
      "B",
      "What is the Capital City of Canada ?",
      "Ottawa",
      "Toronto",
      "Quebec City",
      "A",
      "What is the Capital City of UAE ?",
      "Dubai",
      "Sharjah",
      "Abu Dhabi",
      "C",
      "What is the Capital City of United Kingdom ?",
      "London",
      "Manchester",
      "Bristol",
      "A",
      "What is the Capital City of Pakistan ?",
      "Lahore",
      "Karachi",
      "Islamabad",
      "C",
      0
    ];
    this.vars.questions = [
      "What is the Capital City of Uganda ?",
      "What is the Capital City of India ?",
      "What is the Capital City of USA ?",
      "Where is Machu Picchu Located ?",
      "What is the Capital City of Malaysia ?",
      "What is the Capital City of Kenya ?",
      "What is the Capital City of Canada ?",
      "What is the Capital City of UAE ?",
      "What is the Capital City of United Kingdom ?",
      "What is the Capital City of Pakistan ?"
    ];
    this.vars.optionA = [
      "Lira",
      "New Delhi",
      "New York",
      "Colombia",
      "Singapore",
      "Mombasa",
      "Ottawa",
      "Dubai",
      "London",
      "Lahore"
    ];
    this.vars.optionB = [
      "Jinja",
      "Mumbai",
      "Washington DC",
      "Peru",
      "Bangkok",
      "Nairobi",
      "Toronto",
      "Sharjah",
      "Manchester",
      "Karachi"
    ];
    this.vars.optionC = [
      "Kampala",
      "Hyderabad",
      "Los Angeles",
      "Brazil",
      "Kuala Lumpur",
      "Kisumu",
      "Quebec City",
      "Abu Dhabi",
      "Bristol",
      "Islamabad"
    ];
    this.vars.answer = ["C", "A", "B", "B", "C", "B", "A", "C", "A", "C"];
    this.vars.usersChoice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  *whenGreenFlagClicked() {
    this.vars.questions = [];
    this.vars.optionA = [];
    this.vars.optionB = [];
    this.vars.optionC = [];
    this.vars.answer = [];
    this.vars.usersChoice = [];
    this.vars.i = 1;
    for (let i = 0; i < Math.floor(this.vars.initial.length / 5); i++) {
      this.vars.questions.push(this.itemOf(this.vars.initial, this.vars.i - 1));
      this.vars.optionA.push(
        this.itemOf(this.vars.initial, this.toNumber(this.vars.i))
      );
      this.vars.optionB.push(
        this.itemOf(this.vars.initial, this.toNumber(this.vars.i) + 1)
      );
      this.vars.optionC.push(
        this.itemOf(this.vars.initial, this.toNumber(this.vars.i) + 2)
      );
      this.vars.answer.push(
        this.itemOf(this.vars.initial, this.toNumber(this.vars.i) + 3)
      );
      this.vars.i += 5;
      this.vars.usersChoice.push(0);
      yield;
    }
    this.broadcast("Play");
  }
}
