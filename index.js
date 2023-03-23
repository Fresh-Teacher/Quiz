import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Teacher from "./Teacher/Teacher.js";
import A from "./A/A.js";
import B from "./B/B.js";
import C from "./C/C.js";
import Prev from "./Prev/Prev.js";
import Result from "./Result/Result.js";
import Next from "./Next/Next.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Teacher: new Teacher({
    x: 169,
    y: -23,
    direction: 90,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 5
  }),
  A: new A({
    x: -170,
    y: 108,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  B: new B({
    x: -170,
    y: 0.033144918356939,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  C: new C({
    x: -170,
    y: -110,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Prev: new Prev({
    x: -51,
    y: -130,
    direction: 90,
    costumeNumber: 1,
    size: 75,
    visible: false,
    layerOrder: 6
  }),
  Result: new Result({
    x: 5.537062425169282,
    y: -130,
    direction: 90,
    costumeNumber: 1,
    size: 75,
    visible: false,
    layerOrder: 4
  }),
  Next: new Next({
    x: 68.44111917889097,
    y: -130,
    direction: 90,
    costumeNumber: 1,
    size: 75,
    visible: true,
    layerOrder: 7
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
