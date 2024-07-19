export const calculateCouponValue = (cartTotal: number, coupon: any) => {
  if ( coupon.amount_off ) {
    const couponValue = coupon.amount_off/100
    const total = cartTotal - couponValue > 0 ? cartTotal - couponValue : 0
    return { subTotal: cartTotal, coupon: couponValue, total }
  } else {
    const couponValue = Math.round(cartTotal*coupon.percent_off)/100
    const total = cartTotal - couponValue > 0 ? cartTotal - couponValue : 0
    return { subTotal: cartTotal, coupon: couponValue, total }
  }
}