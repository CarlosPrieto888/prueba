const express = require("express");
const cors = require("cors");
const dataBase = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
dataBase();

app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/peliculas", require("./routes/peliculas"));
app.use("/api/series", require("./routes/series"));

if (process.env.NODE_ENV === "production ") {
    app.use(express.static ("../ frontend/build "));
    app.get("*", (req , res) => {
    res.sendFile(path.resolve(__dirname , "../ frontend", "build", "index.html"));
    });
}

app.listen(5000, function (req, res){
    console.log("Escuchando en 5000");
});