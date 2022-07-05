const { Router }    = require("express");
const { calculateCoins } = require("../constrollers/coins");

const router    = Router();

router.post("/coins", calculateCoins);

module.exports = router;