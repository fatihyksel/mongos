var mongoose = require("mongoose");
var dbURI = "mongodb+srv://fatihyuksel2822:h3URMW0ATp4DK94F@cluster0.9qwck.mongodb.net/mekanbul?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {
  console.log(dbURI + "baglandi");
});
mongoose.connection.on("disconnected", function () {
  console.log(dbURI + "baglantisi koptu");
});
process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("baglanti kapatildi");
  process.exit(0);
});
require("./venue"); 