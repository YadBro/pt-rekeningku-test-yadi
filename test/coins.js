
exports.calculateCoins    = (req) =>{
    try {

        // INPUT
        let {
            coinsDodi,
            transactionTotal,
            feePerCoin
        } = req;

        // coinsDodi = coinsDodi.sort((a, b) => a-b); // mengurutkan dari yang terkecil
        coinsDodi = coinsDodi.sort(function (a, b) {
            return b - a;
        }); // mengurutkan dari yang terbesar

        // INITIAL OUTPUT
        let coinsNeeded = [];
        let remainCoins = [];
        let biaya       = 0;

        let feeTotalAwal    = 0;
        let sisCoinBayarPajak  = 0;
        let hargaBarang     = 0;

        for (let index  = 0; index < coinsDodi.length; index++) {
            hargaBarang += coinsDodi[index];
            if (hargaBarang > transactionTotal) {
                remainCoins.push(coinsDodi[index]);
            }else{
                coinsNeeded.push(coinsDodi[index]);
                feeTotalAwal    = coinsNeeded.length * feePerCoin;
            };
        }

        
        for (let index  = 0; index < coinsNeeded.length; index++) {
            if ((remainCoins[index] * feePerCoin) > feeTotalAwal){
                sisCoinBayarPajak  = remainCoins[index] - (feeTotalAwal + feePerCoin);
                biaya   = feeTotalAwal + feePerCoin;
                remainCoins.shift();
                break;
            }else {
                break;
            }
        }
        
        remainCoins = [sisCoinBayarPajak, ...remainCoins];


        return { coinsNeeded, biaya, remainCoins };
    } catch (error) {


    }
}
// const input = {
//     coinsDodi: [10, 5, 2, 3, 6, 7],
//     transactionTotal: 23,
//     feePerCoin: 0.5
// }
// console.log(calculateCoins(input));