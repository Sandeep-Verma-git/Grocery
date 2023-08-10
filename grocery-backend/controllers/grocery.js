const Grocery = require("../models/grocerys");

const getAllItems = async (req, res) => {
  try {
    const grocery = await Grocery.find({});
    res.status(200).json({ grocery });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const removeAllItems = async (req, res) => {
  try {
    const count = await Grocery.deleteMany();
    res.status(200).json({ count });
  } catch (error) {
    console.log(error);
  }
};

const addItem = async (req, res) => {
  try {
    const grocery = await Grocery.create(req.body);
    res.status(201).json({ grocery });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const grocery = await Grocery.findOneAndDelete({ _id: id });

    if (!grocery) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }

    return res.status(200).json({ grocery });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateitem = async (req, res) => {
  try {
    const { id } = req.params;

    const grocery = await Grocery.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!grocery) {
      return res.status(404).json({ msg: `No task with id ${id}` });
    }

    return res.status(200).json({ grocery });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllItems,
  addItem,
  removeItem,
  updateitem,
  removeAllItems,
};
