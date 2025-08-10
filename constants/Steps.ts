export const STEP_NAMES = {
  1: "Capture Photo",
  2: "Problem Details",
  3: "Select Customer",
  4: "Overview",
} as const;

export type StepKey = keyof typeof STEP_NAMES;
export const TOTAL_STEPS = Object.keys(STEP_NAMES).length;

export const getStepName = (step: number): string => {
  return STEP_NAMES[step as StepKey];
};
