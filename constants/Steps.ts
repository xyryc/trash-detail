export const STEP_NAMES = {
  1: "Problem Details",
  2: "Additional Info",
  3: "Review & Submit",
} as const;

export type StepKey = keyof typeof STEP_NAMES;
export const TOTAL_STEPS = Object.keys(STEP_NAMES).length;

export const getStepName = (step: number): string => {
  return STEP_NAMES[step as StepKey];
};
