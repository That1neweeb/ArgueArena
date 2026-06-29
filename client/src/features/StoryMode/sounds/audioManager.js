import { Howl, Howler } from "howler";

const sounds = {
  battleBgm: new Howl({
    src: ["/sounds/battle-bgm.mp3"],
    loop: true,
    volume: 0.4,
  }),
  correctAnswer: new Howl({
    src: ["/sounds/correct.mp3"],
    volume: 0.6,
  }),
  wrongAnswer: new Howl({
    src: ["/sounds/wrong.mp3"],
    volume: 0.6,
  }),
  victory: new Howl({
    src: ["/sounds/victory.mp3"],
    volume: 0.7,
  }),
  defeat: new Howl({
    src: ["/sounds/defeat.mp3"],
    volume: 0.7,
  }),
};

export default sounds;