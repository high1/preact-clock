export const getTestId = (testId: string) =>
  import.meta.env.MODE === 'test' ? testId : undefined;

// Preact's class prop is a string; join parts instead of passing arrays.
export const cx = (...parts: (false | null | string | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const requireElement = <T>(value: null | T, name: string): T => {
  if (value === null) throw new Error(`Missing ${name}`);
  return value;
};
