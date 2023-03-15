const timeout = (ms = 1500) =>
  new Promise(resolve => setTimeout(resolve, ms));

function inc(a) {
  return timeout().then(() => a + 1);
}

const sum = function (a, b) {
  return timeout().then(() => a + b);
};

const max = (a, b) => {
  return timeout().then(() => a > b ? a : b);
};

const avg = (a, b) => {
  return timeout().then(() => sum(a,b))
    .then(answer => answer/2);
};

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  },
};
class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return timeout().then(() => new Person(name));
  }

  split(sep = " ") {
    return timeout().then(() => this.name.split(sep));
  }
}

inc(5)
  .then(answer => console.log(`inc(5) = ${answer}`))
  .then(() => sum(1, 3)
  .then(answer => console.log(`sum(1, 3) = ${answer}`)))
  .then(() => max(8, 6)
  .then(answer => console.log(`max(8, 6) = ${answer}`)))
  .then(() => avg(8, 6)
  .then(answer => console.log(`avg(8, 6) = ${answer}`)))
  .then(() => obj.split()
  .then(answer => console.log("obj.split() = ", answer)))
  .then(() => Person.of("Marcus Aurelius")
  .then(person => person.split())
  .then(answer => console.log("person.split() =", answer)));