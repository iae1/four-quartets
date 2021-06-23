const router = require("express").Router();
const { requireToken, isAdmin, annotRequireToken } = require("./gateKeeping");

const { models: { User, Poem, Line, Annotation } } = require("../db");
module.exports = router;

//GET single poem line incl. all annotations
router.get("/:id", async (req, res, next) => {
  try {
    const line = await Line.findOne({
      include: Annotation,
      where: {
        id: req.params.id
      }
    });
    res.json(line);
  } catch (error) {
    next(error);
  }
});

//POST annotation to poem line
// router.post('/:id', annotRequireToken, async (req, res, next) => {
//   try {
//     const {charStart, charEnd, content} = req.body
//     const annotation = Annotation.create({
//       charStart,
//       charEnd,
//       content,
//       lineId: req.params.id,
//       userId: req.user.id
//     })
//     res.json(annotation)
//   } catch (error) {
//     next(error)
//   }
// })

//PUT annotation already assoc. w/ poem line
// router.put('/:id', annotRequireToken, async (req, res, next) => {
//   try {
//     const {charStart, charEnd, content} = req.body
//     const annotation = Annotation.create({
//       charStart,
//       charEnd,
//       content,
//       lineId: req.params.id,
//       userId: req.user.id
//     })
//     res.json(annotation)
//   } catch (error) {
//     next(error)
//   }
// })

// //DELETE annotation already assoc. w/ poem line
// router.delete('/:lineId/:noteId', async (req, res, next) => {
//   try {
//     const line = await Line.findOne({
//       where: {
//         id: req.params.lineId
//       },
//       include: {
//         Annotation,
//         where: {
//           id: req.params.noteId
//         }
//       }
//     })

//   } catch (error) {

//   }
// })

// //DELETE route to delete a product from a user's cart
// router.delete('/notes/:productId', requireToken, async (req,res,next) => {
//   try {
//     if (req.orderDetail) {
//       await req.orderDetail.destroy();
//       const updatedCart = await Order.findOne({
//         include: Product,
//         where: {
//           userId: req.user.id.toString(),
//           order_status: 'pending'
//         }
//       });
//       return res.status(200).send(updatedCart);
//     }
//     res.status(200).send("This product isn't in the user's cart")
//   } catch (err) {
//     next(err);
//   }
// })

// //PUT route to update a product's quantity, size, fit or length in a user's cart
// //this route as of 5:48pm 4/24 has not bee updated to reflect changes made to POST
// router.put('/cart/:productId', cartRequireToken, userCart, orderDetail, async (req,res,next) => {
//   try {
//     if (req.orderDetail) {
//       await req.orderDetail.update({
//         quantity: req.body.quantity,
//         fit: req.body.fit,
//         size: req.body.size,
//         length: req.body.length
//       });
//       const updatedCart = await Order.findOne({
//         include: Product,
//         where: {
//           userId: req.user.id.toString(),
//           order_status: 'pending'
//         }
//       });
//       return res.status(200).send(updatedCart);
//     }
//     res.status(200).send("This product isn't in the user's cart")
//   } catch (err) {
//     next(err);
//   }
// })

// //POST route to add a comment to a particular line
// router.post('/cart/:productId', cartRequireToken, userCart, orderDetail, productPrice, async (req,res,next) => {
//   try {
//     const { fit, size, length, quantity } = req.body;
//     console.log('req.productPrice--->', req.productPrice)
//     console.log('req.orderDetail--->', req.orderDetail)
//     if (!req.orderDetail) {

//       await OrderDetails.create({
//         fit,
//         size,
//         length,
//         quantity,
//         price: req.productPrice,
//         orderId: req.userCart.id,
//         productId: req.params.productId
//       });

//       const updatedCart = await Order.findOne({
//         include: Product,
//         where: {
//           userId: req.user.id.toString(),
//           order_status: 'pending'
//         }
//       });
//       return res.status(201).send(updatedCart);
//     }
//     res.status(200).send("This product is already in the user's cart")
//   } catch (err) {
//     next(err);
//   }
// })
