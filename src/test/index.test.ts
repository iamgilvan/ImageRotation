import { PixelArrayRotator } from './../index';

// BB
// WW
// WW
const uArr = new Uint8Array([
  0,
  0,
  0,
  255,
  0,
  0,
  0,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
]);

// WWB
// WWB
const uArr2 = new Uint8Array([
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  0,
  0,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  0,
  0,
  255,
]);

// WW
// WW
// BB
const uArr3 = new Uint8Array([
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  0,
  0,
  255,
  0,
  0,
  0,
  255,
]);

// BWW
// BWW
const uArr4 = new Uint8Array([
  0,
  0,
  0,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  0,
  0,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
]);

const blackPixel = [0, 0, 0, 255];
const whitePixel = [255, 255, 255, 255];

const assertBlackPixel = (pixel: Array<any>) =>
  expect(pixel).toEqual(blackPixel);
const assertWhitePixel = (pixel: Array<any>) =>
  expect(pixel).toEqual(whitePixel);

describe('PixelArrayRotator', () => {
  let rotator: PixelArrayRotator;

  beforeEach(() => {
    rotator = new PixelArrayRotator(uArr, 2, 3);
  });

  it('#getPixelStartIndexForCoord should return the starting index of the pixel at (X, Y)', async () => {
    const rotator2 = new PixelArrayRotator(uArr2, 3, 3);

    let i = rotator.getPixelStartIndex(0, 0);
    const firstPixel = [
      rotator.pixelArray[i],
      rotator.pixelArray[i + 1],
      rotator.pixelArray[i + 2],
      rotator.pixelArray[i + 3],
    ];
    let i2 = rotator2.getPixelStartIndex(0, 0);
    const firstPixel2 = [
      rotator2.pixelArray[i2],
      rotator2.pixelArray[i2 + 1],
      rotator2.pixelArray[i2 + 2],
      rotator2.pixelArray[i2 + 3],
    ];

    assertBlackPixel(firstPixel);
    assertWhitePixel(firstPixel2);

    i = rotator.getPixelStartIndex(0, 1);
    const secondRowFirstPixel = [
      rotator.pixelArray[i],
      rotator.pixelArray[i + 1],
      rotator.pixelArray[i + 2],
      rotator.pixelArray[i + 3],
    ];
    i2 = rotator2.getPixelStartIndex(0, 1);
    const secondRowFirstPixel2 = [
      rotator2.pixelArray[i2],
      rotator2.pixelArray[i2 + 1],
      rotator2.pixelArray[i2 + 2],
      rotator2.pixelArray[i2 + 3],
    ];

    assertWhitePixel(secondRowFirstPixel);
    assertWhitePixel(secondRowFirstPixel2);
  });

  it('#rotate by default should return a 90 degree rotated-rightwards array', async () => {
    expect(rotator.rotate()).toEqual(uArr2);
  });

  it('#rotate(-90) should return a -90 degree rotated-leftwards array', async () => {
    expect(rotator.rotate(-90)).toEqual(uArr4);
  });

  it('#rotate(180) should return a 180 degree rotated-rightwards array', async () => {
    expect(rotator.rotate(180)).toEqual(uArr3);
  });

  it('#rotate(-180) should return a -180 degree rotated-leftwards array', async () => {
    expect(rotator.rotate(-180)).toEqual(uArr3);
  });

  it('#rotate(270) should return a 270 degree rotated-rightwards array', async () => {
    expect(rotator.rotate(270)).toEqual(uArr4);
  });

  it('#rotate(-270) should return a -270 degree rotated-leftwards array', async () => {
    expect(rotator.rotate(-270)).toEqual(uArr2);
  });
});

describe('ImageDataRotator#rotate', () => {
  let page: any;

  const browserRotate = async function(
    pixelArray: any,
    width: number,
    height: number,
    degree: number
  ) {
    return page.evaluate(
      (pixelArr: any, w: number, h: number, d: number) => {
        const data: Uint8ClampedArray = new Uint8ClampedArray(pixelArr);
        const image = new window.ImageData(data, w, h);
        // @ts-ignore
        const rotatedImage = rotator.ImageDataRotator.rotate(image, d);

        return {
          pixelArray: Array.from(rotatedImage.data),
          height: rotatedImage.rotatedHeigth,
          width: rotatedImage.rotatedWidth,
        };
      },
      pixelArray,
      width,
      height,
      degree
    );
  };

  beforeAll(async () => {
    page = await browser.newPage();
    await page.addScriptTag({
      path: 'dist/rotator.umd.development.js',
    });
  });

  afterAll(async () => page.close());

  it('should return a rotated-rightwards array', async () => {
    const result = await browserRotate(Array.from(uArr), 2, 3, 90);

    expect(result.pixelArray).toEqual(Array.from(uArr2));
  });
});
