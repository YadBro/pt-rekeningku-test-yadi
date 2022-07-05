const { calculateCoins } = require("./coins");


test("beli barang butuh coin", () => {
    const myResult = {
        coinsNeeded: [10,7,6,5],
        biaya: 2,
        remainCoins: [3,3,2]
    }
    const input = {
        coinsDodi: [10, 5, 2, 3, 6, 7],
        transactionTotal: 23,
        feePerCoin: 0.5
    }

    expect(calculateCoins(input)).toEqual(myResult);
})