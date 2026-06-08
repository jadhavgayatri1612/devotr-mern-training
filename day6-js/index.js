const numbers = [3, 7, 2, 8, 1, 9, 4, 6];
const oddNumbers = numbers.filter(num => num % 2 !== 0);
const tripledNumbers = oddNumbers.map(num => num * 3);
const total = tripledNumbers.reduce((sum, num) => sum + num, 0);

console.log("Original Array:", numbers);
console.log("Odd Numbers:", oddNumbers);
console.log("Tripled Numbers:", tripledNumbers);
console.log("Total Sum:", total);


const student = {
  name: "Rahul",
  age: 21,
  marks: [80, 75, 90, 85, 70]
};
const getAverageMarks = (marks) => {
  const sum = marks.reduce((acc, mark) => acc + mark, 0);
  return sum / marks.length;
};
const averageMarks = getAverageMarks(student.marks);
console.log("\nStudent Details:", student);
console.log("Average Marks:", averageMarks);
const { name, age } = student;
console.log("\nName:", name);
console.log("Age:", age);

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
console.log("\nCapitalized:", capitalize("hello"));


const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
console.log("\nMerged Array:", mergedArray);
const students = [
  {
    name: "Aman",
    marks: [80, 85, 90]
  },
  {
    name: "Rohit",
    marks: [50, 60, 55]
  },
  {
    name: "Priya",
    marks: [95, 92, 88]
  }
];

const calculateAverage = (marks) => {
  return marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
};
const getTopStudents = (studentsArray) => {
  return studentsArray.filter(student => calculateAverage(student.marks) > 70);
};

const topStudents = getTopStudents(students);
console.log("\nStudents Above 70 Average:");
console.log(topStudents);