const express = require("express");
const MenuItem = require("../Models/MenuItem");
const router = express.Router();

//===> Add MenuItems
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new MenuItem(data);
    await menuItem.save();
    res.status(201).send({ msg: "New menu item added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in adding the MenuItems" });
  }
});

//===> Show MenuItems
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).send({ msg: "Menu items not found" });
    }
    return res.status(200).send(menuItems);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in showing the Menu Items" });
  }
});

//===> Delete MenuItems
router.delete("/:id", async (req, res) => {
  const itemid = req.params.id;
  try {
    const response = await MenuItem.findByIdAndRemove(itemid);
    if (!response) {
      return res.status(404).send({ msg: "Menu item not found" });
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in the delete delete router" });
  }
});

//===> Update MenuItems
router.put("/:id", async (req, res) => {
  const itemid = req.params.id;
  const updateditem = req.body;
  try {
    const response = await MenuItem.findByIdAndUpdate(itemid, updateditem, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ msg: "Menu item not found" });
    }
    return res.status(200).send({ msg: "Menu item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "error in the server" });
  }
});

//===> based on the taste
router.get("/:taste", async (req, res) => {
  const taste = req.params.taste;
  try {
    const itemtaste = await MenuItem.find({ taste: taste });
    if (!itemtaste) {
      return res
        .status(404)
        .send({ msg: "No menu item found with this taste" });
    }
    return res.status(200).send(itemtaste);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to get the data based on the Taste" });
  }
});

module.exports = router;
