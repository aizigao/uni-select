# @aizigao/uni-select

<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@aizigao/uni-select?style=for-the-badge">

## WHAT AND HOW

just see src/UniSelect/index.test.ts

```ts
import UniSelect from '@aizigao/uni-select';

test('normal', () => {
  const selector = UniSelect({
    isIOS: true,
    isAndroid: false,
  });

  const rst = selector({
    isIOS: "I'm use safari browser now",
    isAndroid: "I'm use android browser now",
  });

  expect(rst).toEqual("I'm use safari browser now");
});

test("can't has multi match value", () => {
  expect(() => {
    UniSelect({
      isIOS: true,
      isAndroid: true,
    });
  }).toThrow('[UniSelect]: conditions mustbe unique');
});

test('no match value', () => {
  const selector = UniSelect({
    isIOS: true,
    isAndroid: false,
  });
  expect(
    selector({
      isAndroid: 'yyy',
      // isIOS: 'yyy',
    }),
  ).toBeNull();
});

test('fallback if not match config', () => {
  const selector = UniSelect({
    isIOS: true,
    isAndroid: false,
  });
  expect(
    selector({
      fallback: "I'm fall back",
    }),
  ).toEqual("I'm fall back");
});
```

You can use it to create A Platform.Select util like ReactNative

```ts
import UniSelect from '@aizigao/uni-select';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const Platform = {
  select: UniSelect({
    ios: isSafari,
    android: !isSafari,
  }),
  OS: isSafari ? 'ios' : 'android',
  Version: -1,
};

expect(
  Platform.select({
    ios: "I'm IOS",
  }),
).toEqual("I'm IOS");

expect(Platform.OS).toEqual('ios');

const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();
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
