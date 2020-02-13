const { redCmd } = require("./redCommand");

// turn on my light
try {
  redCmd("/home/imamachi/private-smart-home-with-raspberry-pi/data/ch4.data");
  console.log(
    "実行時刻: " + new Date().toLocaleString({ timeZone: "Asia/Tokyo" })
  );
  console.log("Successfully Done!!");
} catch (err) {
  console.error("ERROR: " + err);
}
