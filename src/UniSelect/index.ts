const createSelector = <T extends string>(conditionMap: Record<T, boolean>) => {
  const matchedKeys = Object.keys(conditionMap).filter(
    k => conditionMap[k as keyof typeof conditionMap],
  );

  if (matchedKeys.length > 1) {
    throw new Error('[UniSelect]: conditions must be unique');
  }

  const matchKey = matchedKeys[0] as T;

  const select = <U>(config: Partial<Record<T | 'default', U>>): U | null => {
    if (matchKey in config) {
      return config[matchKey] as U;
    }
    if ('default' in config) {
      return config.default as U;
    }
    return null;
  };

  return {
    select,
    current: matchKey || null,
  };
};

export default createSelector;
