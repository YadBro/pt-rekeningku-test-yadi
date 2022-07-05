exports.calculateCoins    = (req, res) =>{
    try {

        // INPUT
        let {
            coinsDodi,
            transactionTotal,
            feePerCoin
        } = req.body;

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
                coinsNeeded = [...coinsNeeded, remainCoins[index]];
                sisCoinBayarPajak  = remainCoins[index] - (feeTotalAwal + feePerCoin);
                biaya   = feeTotalAwal + feePerCoin;
                remainCoins.shift();
                break;
            }else {
                break;
            }
        }
        
        remainCoins = [sisCoinBayarPajak, ...remainCoins];

        res.status(200).send(
            `Coin yang di perlukan: [${coinsNeeded}] \n Biaya: ${biaya} \n SisaCoin: [${remainCoins}]`
        );

        return { coinsNeeded, biaya, remainCoins };
    } catch (error) {

        console.log(error);
        res.status(500).send({
            message: error?.message
        });

    }
}