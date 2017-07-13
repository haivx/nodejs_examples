/**
 * Created by xuanhai on 06/07/2017.
 */
/**
 * Xac dinh mot so co chia het cho 5 hay khong
 * **/
exports.devideFive = function (a) {
  if (isNaN(a)) {
    throw  new Error('a is not a number')
  }
  let lastC = a.toString().slice(-1)
  let newval = parseFloat(lastC)
  if ((newval % 5) === 0) {
    return(`so can xac dinh ${a} la so chia het cho 5`)
  } else {
    return(`so can xac dinh ${a} la so khong chia het cho 5`)
  }
}
try {
  let ax = devideFive("huhuko")
  console.log(ax)
} catch (error) {
  console.log(error.message)
}



