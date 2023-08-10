const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addItem,
  removeItem,
  updateitem,
  removeAllItems,
} = require("../controllers/grocery");

router.route("/").get(getAllItems).post(addItem).delete(removeAllItems);
router.route("/:id").delete(removeItem).patch(updateitem);

module.exports = router;
