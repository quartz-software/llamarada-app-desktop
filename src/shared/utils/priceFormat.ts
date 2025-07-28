export const priceFormat = (price: number) => {
  return new Intl.NumberFormat("es-BO", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}