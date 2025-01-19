export const padZero = (num: number, size: number = 2): string => {
  let output = num.toString();
  while (output.length < size)
    output = "0" + output;
  return output;
}

export const sec2time = (seconds: number): string => {
  const time = new Date(0, 0, 0, 0, 0, Math.abs(seconds), 0);
  return padZero(time.getHours()) + ":" + padZero(time.getMinutes()) + ":" + padZero(time.getSeconds());
};

export const extractTime = (value: string) => {
  if (typeof value === "undefined" || !value || +value.split('-')[0] === 1900)
    return '';
  const splitter = (value.indexOf('T') !== -1) ? 'T' : ' ';
  return value.split(splitter)[1];
}
