require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/db");
const productRoutes = require("./routes/product.route");
const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

const server = async ()=>{
  await sequelize.authenticate();

   app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

server()

 
