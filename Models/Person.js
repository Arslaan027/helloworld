const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                             Person Schema Sturecture                             */
/* -------------------------------------------------------------------------- */

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* -------------------------------------------------------------------------- */
/*                                    Model                                   */
/* -------------------------------------------------------------------------- */

//===>Password Hashing
personSchema.pre("save", async function (next) {
  const person = this; //===> what is this
  if (!person.isModified("password")) {
    return next();
  }
  try {
    //===> Generating Salt
    const salt = await bcrypt.genSalt(10);
    //===> hashing the pass adding the salt
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //===> overriding the password with hashedPassword
    person.password = hashedPassword;
    next();
  } catch (error) {
    return console.log(`Error in Hashing the password : ${error}`);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Person = mongoose.model("person", personSchema);

module.exports = Person;
