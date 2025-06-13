const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});

const Product = sequelize.define("Product", {
  name: { 
    type: DataTypes.STRING,
     allowNull: false 
    },
  stock: { 
    type: DataTypes.INTEGER,
     defaultValue: 0 },
});

module.exports = {Product , sequelize};
