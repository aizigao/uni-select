const UniSelect = <T extends string>(conditionMap: Record<T, boolean>) => {
  const matchedKeys = Object.entries(conditionMap)
    .filter(([k, v]) => v)
    .map(([k]) => k);

  if (matchedKeys.length > 1) {
    throw new Error('[UniSelect]: conditions mustbe unique');
  }
  const matchKey = matchedKeys[0] as T;

  return <U>(config: Partial<Record<T | 'default', U>>): U | null => {
    if (matchKey in config) {
      return config[matchKey] as U;
    }
    if ('default' in config) {
      return config.default as U;
    }
    return null;
  };
};

export default UniSelect;
