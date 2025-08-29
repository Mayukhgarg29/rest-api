const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// === CONFIGURE YOUR DETAILS ===
const FULL_NAME = "john_doe"; // lowercase
const DOB = "17091999";       // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL = "ABCD123";

// Helper function for alternating caps
function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse();
  return reversed.map((ch, i) =>
    i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    let concatAlphabets = "";

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // numeric
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabetic string
        alphabets.push(item.toUpperCase());
        concatAlphabets += item;
      } else {
        // special char
        special_characters.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(concatAlphabets)
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("BFHL API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
