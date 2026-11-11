export const seconds = 60;
export const rotate = (turns: number, fractionDigits = 1) =>
  `rotate(${Number((turns * 360).toFixed(fractionDigits))})`;

export const hourRotation = (clock: number) =>
  rotate(((clock / seconds ** 2) % (seconds / 5)) / (seconds / 5));
export const minuteRotation = (clock: number) =>
  rotate(((clock / seconds) % seconds) / seconds);
export const secondRotation = (clock: number) =>
  rotate((clock % seconds) / seconds);
export const subsecondRotation = (clock: number) => rotate(clock % 1, 0);

export const clockFaceId = 'clock-face';
export const clockGraduationId = 'clock-graduation';
export const clockHourId = 'clock-hour';
export const clockMinuteId = 'clock-minute';
export const clockSecondId = 'clock-second';
export const clockLiveRegionId = 'clock-live-region';
