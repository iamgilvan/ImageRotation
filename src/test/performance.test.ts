// BB
// WW
// WW
const arr = [
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
];

// 2x bigger image (x4 extra to account for pixels)
const arr2 = [...arr];
arr2.push(...arr);
arr2.push(...arr2);

const arr3 = [...arr2];
arr3.push(...arr2);
arr3.push(...arr3);

const arr4 = [...arr3];
arr4.push(...arr3);
arr4.push(...arr4);

const arr5 = [...arr4];
arr5.push(...arr4);
arr5.push(...arr5);
arr5.push(...arr5);
arr5.push(...arr5);

describe('[PERFORMANCE] ImageDataRotator#rotate', () => {
  let page: any;

  const measureBrowserRotate = async function(
    pixelArray: any,
    width: number,
    height: number,
    degree: number
  ) {
    return page.evaluate(
      (pixelArr: any, w: number, h: number, d: number) => {
        const data: Uint8ClampedArray = new Uint8ClampedArray(pixelArr);
        const image = new window.ImageData(data, w, h);
        const median = function(sequence: any) {
          sequence.sort();
          return sequence[Math.ceil(sequence.length / 2)];
        };
        const measureFn = function(fn: any, args: Array<any>) {
          const numbers = [];
          const runCount = 10;
          for (let i = 0; i < runCount; i += 1) {
            const t0 = window.performance.now();
            fn(...args);
            const t1 = window.performance.now();
            numbers.push(t1 - t0);
          }
          console.log(
            fn.name,
            `[PERFORMANCE][ImageDataRotator#rotate] ${w}x${h} run-time takes: ~${median(
              numbers
            ).toFixed(5)}`
          );
        };
        // @ts-ignore
        measureFn(rotator.ImageDataRotator.rotate, [image, d]);
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
  it('should measure run-times in the browser', async () => {
    await measureBrowserRotate(arr, 2, 3, 90);
    await measureBrowserRotate(arr2, 4, 6, 90);
    await measureBrowserRotate(arr3, 8, 12, 90);
    await measureBrowserRotate(arr4, 16, 24, 90);
    await measureBrowserRotate(arr5, 64, 96, 90);
  });
});
