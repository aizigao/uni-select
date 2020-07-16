# @aizigao/uni-select

build you own select usually like React Native Platform.select

<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@aizigao/uni-select?style=for-the-badge">

## WHAT AND HOW

just see src/UniSelect/index.test.ts

You can use it to create a Platform.Select util like ReactNative

```ts
import createSelector from '@aizigao/uni-select';

// image below val is always Truely
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const PlatformO = createSelector({
  ios: true,
  android: false,
});
const Platform = { ...PlatformO, OS: PlatformO.current };
Platform.OS = Platform.current;

Platform.select({
  ios: "I'm IOS",
}); // Return "I'm IOS"
Platform.OS; // ios
```

**extends original React Native's `Platform` for more possible**

> detect more android special manufacturer

> detect iphoneX

```ts
import createSelector from '@aizigao/uni-select';
import { Platform } from 'react-native';

// TIP: You need  set conditions by youself
const androidXiaomi = false;
const androidSamsung = true;
const isIphoneX = false; // detect it can use [react-native-iphone-x-helper](https://www.npmjs.com/package/react-native-iphone-x-helper)

const PlatformO = createSelector({
  iosGeneral: Platform.OS === 'ios' && !isIphoneX,
  iosIphoneX: Platform.OS === 'ios' && isIphoneX,
  androidSamsung: Platform.OS === 'android' && androidSamsung,
  androidXiaomi: Platform.OS === 'android' && androidXiaomi,
  androidGeneral:
    Platform.OS === 'android' && !androidSamsung && !androidXiaomi,
});

const Platform = { ...PlatformO, OS: PlatformO.current };

// use OS instead of current property
Platform.OS = Platform.current;

const spMsgForPlatfrom = Platform.select({
  androidSamsung: "I'm smasung devices",
  androidXiaomi: "I'm Xiaomi devices",
}); //"I'm smasung devices"

const currentVerson = Platform.OS; // androidSamsung
const currentVersonSame = Platform.current; // androidSamsung
```

**other test cases**

```ts
import createSelector from '@aizigao/uni-select';

test('normal', () => {
  const selector = createSelector({
    isIOS: true,
    isAndroid: false,
  });

  const rst = selector.select({
    isIOS: "I'm use safari browser now",
    isAndroid: "I'm use android browser now",
  });

  expect(rst).toEqual("I'm use safari browser now");
});

test("can't has multi match value", () => {
  expect(() => {
    createSelector({
      isIOS: true,
      isAndroid: true,
    });
  }).toThrow('[UniSelect]: conditions must be unique');
});

test('no match value', () => {
  const selector = createSelector({
    isIOS: true,
    isAndroid: false,
  });

  expect(
    selector.select({
      isAndroid: 'yyy',
      // isIOS: 'yyy',
    }),
  ).toBeNull();

  expect(selector.current).toEqual('isIOS');
});

test('fallback if not match config', () => {
  const selector = createSelector({
    isIOS: false,
    isAndroid: false,
  });

  expect(
    selector.select({
      default: "I'm fall back",
    }),
  ).toEqual("I'm fall back");

  expect(selector.current).toBeNull();
});
```

## Install

```bash
npm i @aizigao/uni-select
```

## Development

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Build library via `father-build`,

```bash
$ npm run build
```

## CHANGELOG

### 0.2.2 moidify examples more friendly for typescript

### 0.2.1 remove useless npm files

### 0.2.0 has break change

- `createSelector` not return select function any more, Now it return a Object type like `{ current: string; select: <U>(config: Record<string, U>): U}`

### 0.1.0 first version
