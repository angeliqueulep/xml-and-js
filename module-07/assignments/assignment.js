const data = [
  { born: 1870, died: 1924 },
  { born: 1893, died: 1976 },
  { born: 1869, died: 1948 },
  { born: 1901, died: 1989 },
];

const age = data.map((person) => person.died - person.born);

// console.log(age);

const filtered = age.filter((age) => age > 75);

// console.log(filtered);

const oldest = filtered.reduce((acc, value) => {
  return acc > value ? acc : value;
});

// console.log(oldest);

const oldestPerson = data
  .map((person) => person.died - person.born)
  .filter((age) => age > 75)
  .reduce((acc, val) => acc > val ? acc : val);

console.log(`Oldest age: ` + oldestPerson);