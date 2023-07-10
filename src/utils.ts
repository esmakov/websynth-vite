export const reducedKeyCodes = [
  "KeyA", // C
  "KeyW", // C#
  "KeyS", // D
  "KeyE", // D#
  "KeyD", // E
  "KeyF", // F
  "KeyT", // F#
  "KeyG", // G
  "KeyY", // G#
  "KeyH", // A
  "KeyU", // A#
  "KeyJ", // B
];
export const keyCodes = [
  "Space",
  "ShiftLeft",
  "KeyZ",
  "KeyX",
  "KeyC",
  "KeyV",
  "KeyB",
  "KeyN",
  "KeyM",
  "Comma",
  "Period",
  "Slash",
  "ShiftRight",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyJ",
  "KeyK",
  "KeyL",
  "Semicolon",
  "Quote",
  "Enter",
  "Tab",
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyY",
  "KeyU",
  "KeyI",
  "KeyO",
  "KeyP",
  "BracketLeft",
  "BracketRight",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",
  "Backspace",
  "Escape",
];

export function createNoteTable() {
  const noteTable = [];
  for (let i = 0; i < 9; i++) {
    noteTable[i] = [];
  }

  noteTable[0]["A"] = 27.5;
  noteTable[0]["A#"] = 29.135235094880619;
  noteTable[0]["B"] = 30.867706328507756;

  noteTable[1]["C"] = 32.703195662574829;
  noteTable[1]["C#"] = 34.647828872109012;
  noteTable[1]["D"] = 36.708095989675945;
  noteTable[1]["D#"] = 38.890872965260113;
  noteTable[1]["E"] = 41.203444614108741;
  noteTable[1]["F"] = 43.653528929125485;
  noteTable[1]["F#"] = 46.249302838954299;
  noteTable[1]["G"] = 48.999429497718661;
  noteTable[1]["G#"] = 51.913087197493142;
  noteTable[1]["A"] = 55.0;
  noteTable[1]["A#"] = 58.270470189761239;
  noteTable[1]["B"] = 61.735412657015513;

  noteTable[2]["C"] = 65.406391325149658;
  noteTable[2]["C#"] = 69.295657744218024;
  noteTable[2]["D"] = 73.41619197935189;
  noteTable[2]["D#"] = 77.781745930520227;
  noteTable[2]["E"] = 82.406889228217482;
  noteTable[2]["F"] = 87.307057858250971;
  noteTable[2]["F#"] = 92.498605677908599;
  noteTable[2]["G"] = 97.998858995437323;
  noteTable[2]["G#"] = 103.826174394986284;
  noteTable[2]["A"] = 110.0;
  noteTable[2]["A#"] = 116.540940379522479;
  noteTable[2]["B"] = 123.470825314031027;

  noteTable[3]["C"] = 130.812782650299317;
  noteTable[3]["C#"] = 138.591315488436048;
  noteTable[3]["D"] = 146.83238395870378;
  noteTable[3]["D#"] = 155.563491861040455;
  noteTable[3]["E"] = 164.813778456434964;
  noteTable[3]["F"] = 174.614115716501942;
  noteTable[3]["F#"] = 184.997211355817199;
  noteTable[3]["G"] = 195.997717990874647;
  noteTable[3]["G#"] = 207.652348789972569;
  noteTable[3]["A"] = 220.0;
  noteTable[3]["A#"] = 233.081880759044958;
  noteTable[3]["B"] = 246.941650628062055;

  noteTable[4]["C"] = 261.625565300598634;
  noteTable[4]["C#"] = 277.182630976872096;
  noteTable[4]["D"] = 293.66476791740756;
  noteTable[4]["D#"] = 311.12698372208091;
  noteTable[4]["E"] = 329.627556912869929;
  noteTable[4]["F"] = 349.228231433003884;
  noteTable[4]["F#"] = 369.994422711634398;
  noteTable[4]["G"] = 391.995435981749294;
  noteTable[4]["G#"] = 415.304697579945138;
  noteTable[4]["A"] = 440.0;
  noteTable[4]["A#"] = 466.163761518089916;
  noteTable[4]["B"] = 493.883301256124111;

  noteTable[5]["C"] = 523.251130601197269;
  noteTable[5]["C#"] = 554.365261953744192;
  noteTable[5]["D"] = 587.32953583481512;
  noteTable[5]["D#"] = 622.253967444161821;
  noteTable[5]["E"] = 659.255113825739859;
  noteTable[5]["F"] = 698.456462866007768;
  noteTable[5]["F#"] = 739.988845423268797;
  noteTable[5]["G"] = 783.990871963498588;
  noteTable[5]["G#"] = 830.609395159890277;
  noteTable[5]["A"] = 880.0;
  noteTable[5]["A#"] = 932.327523036179832;
  noteTable[5]["B"] = 987.766602512248223;

  noteTable[6]["C"] = 1046.502261202394538;
  noteTable[6]["C#"] = 1108.730523907488384;
  noteTable[6]["D"] = 1174.659071669630241;
  noteTable[6]["D#"] = 1244.507934888323642;
  noteTable[6]["E"] = 1318.510227651479718;
  noteTable[6]["F"] = 1396.912925732015537;
  noteTable[6]["F#"] = 1479.977690846537595;
  noteTable[6]["G"] = 1567.981743926997176;
  noteTable[6]["G#"] = 1661.218790319780554;
  noteTable[6]["A"] = 1760.0;
  noteTable[6]["A#"] = 1864.655046072359665;
  noteTable[6]["B"] = 1975.533205024496447;

  noteTable[7]["C"] = 2093.004522404789077;
  noteTable[7]["C#"] = 2217.461047814976769;
  noteTable[7]["D"] = 2349.318143339260482;
  noteTable[7]["D#"] = 2489.015869776647285;
  noteTable[7]["E"] = 2637.020455302959437;
  noteTable[7]["F"] = 2793.825851464031075;
  noteTable[7]["F#"] = 2959.955381693075191;
  noteTable[7]["G"] = 3135.963487853994352;
  noteTable[7]["G#"] = 3322.437580639561108;
  noteTable[7]["A"] = 3520.0;
  noteTable[7]["A#"] = 3729.310092144719331;
  noteTable[7]["B"] = 3951.066410048992894;

  noteTable[8]["C"] = 4186.009044809578154;
  noteTable[8]["C#"] = 4434.922095629953319;
  noteTable[8]["D"] = 4698.636286678520965;
  noteTable[8]["D#"] = 4978.031739553294571;

  return noteTable;
}
