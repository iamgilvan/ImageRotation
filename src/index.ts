import { AnglesEnum } from './shared/angles';
import {
  noopAngles,
  rotate180Angles,
  rotate270Angles,
  rotate90Angles,
} from './shared/constants/constants';

export class PixelArrayRotator {
  pixelArray: Uint8Array;
  width: number;
  height: number;
  rotatedWidth = 0;
  rotatedHeight = 0;

  constructor(data: Uint8Array, w: number, h: number) {
    this.pixelArray = data;
    this.width = w;
    this.height = h;
  }

  getPixelStartIndex(x: number, y: number) {
    return (x + y * this.width) * 4;
  }

  private rotate90(): Uint8Array {
    let index: number;
    const rotatedArray = [];

    for (let x = 0; x < this.width; x += 1) {
      for (let y = this.height - 1; y >= 0; y -= 1) {
        index = this.getPixelStartIndex(x, y);
        rotatedArray.push(this.pixelArray[index]);
        rotatedArray.push(this.pixelArray[index + 1]);
        rotatedArray.push(this.pixelArray[index + 2]);
        rotatedArray.push(this.pixelArray[index + 3]);
      }
    }

    return new Uint8Array(rotatedArray);
  }

  private rotate180(): Uint8Array {
    // TODO: try reverse approach as something less naive
    const rotatedArray = this.rotate(90);
    return new PixelArrayRotator(
      rotatedArray,
      this.rotatedWidth,
      this.rotatedHeight
    ).rotate(90);
  }

  private rotate270(): Uint8Array {
    let index: number;
    const rotatedArray = [];

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height; y += 1) {
        index = this.getPixelStartIndex(x, y);
        rotatedArray.push(this.pixelArray[index]);
        rotatedArray.push(this.pixelArray[index + 1]);
        rotatedArray.push(this.pixelArray[index + 2]);
        rotatedArray.push(this.pixelArray[index + 3]);
      }
    }

    return new Uint8Array(rotatedArray);
  }

  /**
   * Rotates the given one-dimensional array by the given right angle in degrees.
   * Degrees must be a +/- multiple of 90. Returns the original input if told to
   * rotate by 0 or 360 degrees.
   */
  rotate(degrees = 90): Uint8Array {
    // check input values
    if (!(degrees in AnglesEnum)) {
      throw new Error(
        `Invalid input; degrees must be in ${Object.values(AnglesEnum)}`
      );
    }

    if (rotate180Angles.includes(degrees) || noopAngles.includes(degrees)) {
      this.rotatedWidth = this.width;
      this.rotatedHeight = this.height;
    } else if (
      rotate90Angles.includes(degrees) ||
      rotate270Angles.includes(degrees)
    ) {
      this.rotatedWidth = this.height;
      this.rotatedHeight = this.width;
    }

    if (rotate90Angles.includes(degrees)) return this.rotate90();

    if (rotate180Angles.includes(degrees)) return this.rotate180();

    if (rotate270Angles.includes(degrees)) return this.rotate270();

    return this.pixelArray;
  }
}

export class ImageDataRotator {
  static rotate(image: ImageData, angle: number): ImageData {
    const pixelArrayRotator = new PixelArrayRotator(
      new Uint8Array(Array.from(image.data)),
      image.width,
      image.height
    );
    const rotatedArray = new Uint8ClampedArray(pixelArrayRotator.rotate(angle));

    return new ImageData(
      rotatedArray,
      pixelArrayRotator.rotatedWidth,
      pixelArrayRotator.rotatedHeight
    );
  }
}
