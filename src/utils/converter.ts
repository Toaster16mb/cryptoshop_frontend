export const ethToGWei = (eth: number): number => {
  return eth * 1000000000;
};

export const gweiToEth = (gwei: number): number => {
  gwei = gwei / 1000000000;
  return Math.round((gwei + Number.EPSILON) * 100000) / 100000;
};
