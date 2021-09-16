import type { Args } from "../types.ts";

export type ArgResult = void | Args;
export type FlagResult = { short: ArgResult; complete: ArgResult };