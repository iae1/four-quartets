const { models: { User, Product, Order, OrderDetails } } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const annotateRequireToken = async (req, res, next) => {
  try {
    const token = req.body.token;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const userCart = async (req, res, next) => {
  try {
    req.userCart = await Order.findOne({
      include: Product,
      where: {
        userId: req.user.id.toString(),
        order_status: "pending"
      }
    });
    next();
  } catch (err) {
    next(err);
  }
};

const orderDetail = async (req, res, next) => {
  try {
    req.orderDetail = await OrderDetails.findOne({
      where: {
        orderId: req.userCart.id,
        productId: req.params.productId
      }
    });
    next();
  } catch (err) {
    next(err);
  }
};

const productPrice = async (req, res, next) => {
  try {
    const response = await Product.findByPk(req.body.id, {
      attributes: ["price"]
    });
    req.productPrice = response.dataValues.price;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin) {
      next();
    } else {
      return res.status(403).send("You are not an admin");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
  isAdmin,
  annotateRequireToken
};
