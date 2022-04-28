// import { Merlin } from "merlin";
// import { validateArgs } from "../utils/args/validate.ts";
// import { purple, red, yellow } from "../utils/color/colors.ts";
// import type { Args } from "../types.ts";

// const test = new Merlin();

// test.assertEqual("form", {
//   expect() {
//     const obj: Args = { flags: { form: true } };
//     return validateArgs(obj as Required<Args>);
//   },
//   toBe() {
//     return {
//       msg: `the flag ${purple("form")} needs the following arguments: ${
//         yellow("[METHOD]")
//       }, ${yellow("[URL]")}, ${yellow("[BODY]")}`,
//       exit: true,
//       type: `${red("error")}`,
//     };
//   },
//   ignore: true
// });

// test.assertEqual("request", {
//   expect() {
//     const obj: Args = { method: "POST" };
//     return validateArgs(obj as Required<Args>);
//   },
//   toBe() {
//     return {
//       msg: `miss ${yellow("[URL]")}`,
//       exit: true,
//       type: `${red("error")}`,
//     };
//   },
//   ignore: true
// });
