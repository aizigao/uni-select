import createSelector from './index';

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

test('PlatForm like RN', () => {
  const Platform = createSelector({
    ios: true,
    android: false,
  }) as ReturnType<typeof createSelector> & {
    OS: string | null;
  };
  Platform.OS = Platform.current;

  expect(
    Platform.select({
      ios: "I'm IOS",
    }),
  ).toEqual("I'm IOS");

  expect(Platform.OS).toEqual('ios');
});
