const os = require("os");
const path = require("path");
const fs = require("fs");
console.log("Platform:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Home Directory:", os.homedir());
console.log("Current Working Directory:", process.cwd());
const data = fs.readFileSync("notes.txt", "utf8");
console.log("\nFile Content:\n");
console.log(data);
function countWords(text) {
    return text.trim().split(/\s+/).length;
}
const wordCount=countWords(data);
fs.writeFileSync(
    "word-count.txt",
    `Word count: ${wordCount}`
);
console.log("Word count saved!");
console.log('Nodemon test is complete');