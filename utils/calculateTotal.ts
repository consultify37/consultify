export const calculateTotal = (subTotal: number, couponValue: number) => {
  return subTotal - couponValue > 0 ? subTotal - couponValue : 0
}