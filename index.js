const express    = require("express");
const router    = require("./src/routes");

const app   = express();
app.use(express.json());
const PORT  = process.env.PORT || 5000;


app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.send("HELLO");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});