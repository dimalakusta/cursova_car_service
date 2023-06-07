export const mapDataToOptions = (data, key) => {
  return data.reduce((acc, item) => {
    if (key) {
      return { ...acc, [item[key]]: item[key] };
    }

    return { ...acc, [item]: item };
  }, {});
};
