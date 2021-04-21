function toFarsiNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n
    .toString()
    .split('')
    .map((x) => (Number(x) || x === '0' ? farsiDigits[x] : x))
    .join('');
}
export default { toFarsiNumber };
