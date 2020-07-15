import UniSelect from './index';

test('normal', () => {
  const selector = UniSelect({
    isSafari: true,
    isAndroid: false,
  });

  const rst = selector({
    isSafari: "I'm use safari browser now",
    isAndroid: "I'm use android browser now",
  });

  expect(rst).toEqual("I'm use safari browser now");
});

test("can't has multi match value", () => {
  expect(() => {
    UniSelect({
      isSafari: true,
      isAndroid: true,
    });
  }).toThrow('[UniSelect]: conditions mustbe unique');
});

test('no match value', () => {
  const selector = UniSelect({
    isSafari: true,
    isAndroid: false,
  });
  expect(
    selector({
      isAndroid: 'yyy',
      // isSafari: 'yyy',
    }),
  ).toBeNull();
});

test('fallback if not match config', () => {
  const selector = UniSelect({
    isSafari: true,
    isAndroid: false,
  });
  expect(
    selector({
      fallback: "I'm fall back",
    }),
  ).toEqual("I'm fall back");
});
