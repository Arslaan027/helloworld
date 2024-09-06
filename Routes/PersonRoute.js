const express = require("express");
const router = express.Router();
const Person = require("../Models/Person");

/* -------------------------------------------------------------------------- */
/*                         All person routes are here                         */
/* -------------------------------------------------------------------------- */

//===> Add Person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const savedPerson = new Person(data);
    const response = await savedPerson.save();
    res.status(201).json(response);
    console.log("Person data added");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in adding the person" });
  }
});

//===> Show All Persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    if (!data || data.length === 0) {
      return res.status(404).send({ msg: "No persons found" });
    }
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in fetching the persons" });
  }
});

//===> Delete Person
router.delete("/:id", async (req, res) => {
  const personid = req.params.id;
  try {
    const response = await Person.findByIdAndRemove(personid);
    if (!response) {
      return res.status(404).send({ msg: "User not found" });
    }
    return res.status(200).send(response, { msg: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in deleting the person" });
  }
});

//===> Update Person
router.put("/:id", async (req, res) => {
  const personid = req.params.id;
  const updatedPerson = req.body;
  try {
    const response = await Person.findByIdAndUpdate(personid, updatedPerson, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ msg: "Person not found" });
    }
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in updating the person" });
  }
});

//===> Get Persons Based on Role
router.get("/:work", async (req, res) => {
  try {
    const work = req.params.work;
    const persons = await Person.find({ work: work });
    if (!persons || persons.length === 0) {
      return res.status(404).send({ msg: "No employees found with this role" });
    }
    return res.status(200).send(persons);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in fetching persons based on role" });
  }
});

module.exports = router;
