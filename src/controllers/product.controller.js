const Product = require("../models/product.model");
const Subscription = require("../models/subscription.model");
const sendEmail = require("../utils/mailer");

exports.createProduct = async (req, res) => {
  try {
    const { name, stock } = req.body;
    if (!name) return res.status(400).json({ message: "Product name is required" });

    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      existingProduct.stock += stock || 0;
      await existingProduct.save();
      return res.status(200).json({ message: "Stock updated for existing product", product: existingProduct });
    }

    const product = await Product.create({ name, stock: stock || 0});
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.subscribeToProduct = async (req, res) => {
  try {
    const { productId, email } = req.body;
    if (!productId || !email)
      return res.status(400).json({ message: "Missing data" });

    const subscription = await Subscription.create({ productId, email });
    res.status(201).json({ message: "Subscribed", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId , 'productIdproductIdproductId');
    
    const { stock } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });
    product.stock = stock;
    await product.save();

    if (stock > 0) {
      const subscribers = await Subscription.findAll({ where: { productId } });
      for (const user of subscribers) {
        await sendEmail(
          user.email,
          `The product '${product.name}' is now back in stock.`
        );
      }
    }
    res.status(200).json({ message: "Stock updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
