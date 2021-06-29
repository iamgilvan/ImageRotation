import { AnglesEnum } from '../angles';

const rotate90Angles = Object.freeze([AnglesEnum.ROnce, AnglesEnum.LTrice]);
const rotate180Angles = Object.freeze([AnglesEnum.RTwice, AnglesEnum.LTwice]);
const rotate270Angles = Object.freeze([AnglesEnum.RTrice, AnglesEnum.LOnce]);
const noopAngles = Object.freeze([
  AnglesEnum.None,
  AnglesEnum.RFull,
  AnglesEnum.LFull,
]);

// Exporting constants
export { rotate90Angles, rotate180Angles, rotate270Angles, noopAngles };
