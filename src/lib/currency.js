export const formatCedis = (value) => {
  try {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    return `GHS ${value.toFixed(2)}`;
  }
};
