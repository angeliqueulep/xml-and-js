function stringToNode(value) {
  const html = value.trim();
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.firstChild;
}

function createPerson(info) {
  const content = `
    <tr>
      <td>${info.id}</td>
      <td>
        ${info.firstName} ${info.lastName}
      </td>
      <td>${info.email}</td>
      <td>${info.gender}</td>
      <td>${info.ipAddress}</td>
    </tr>
  `;

  return stringToNode(content);
}

function parseInfo(person) {
  const id = person.getElementsByTagName(`id`)[0].childNodes[0].nodeValue;
  const firstName = person.getElementsByTagName(`firstName`)[0].childNodes[0].nodeValue;
  const lastName = person.getElementsByTagName(`lastName`)[0].childNodes[0].nodeValue;
  const email = person.getElementsByTagName(`email`)[0].childNodes[0].nodeValue;
  const gender = person.getElementsByTagName(`gender`)[0].childNodes[0].nodeValue;
  const ipAddress = person.getElementsByTagName(`ipAddress`)[0].childNodes[0].nodeValue;
  return {
    id,
    firstName,
    lastName,
    email,
    gender,
    ipAddress
  };
}

function displayData(xmlDoc) {
  const people = xmlDoc.getElementsByTagName(`person`);
  const tableElement = document.getElementById(`pTable`);


  for (let index = 0; index < people.length; index++) {
    const person = people[index];

    const parsedInfo = parseInfo(person);
    const personElement = createPerson(parsedInfo);

    tableElement.appendChild(personElement);
  }
}

// Using fetch(promise)
// fetch(`../../module-05/assignments/people.xml`, { method: `GET`})
//   .then((resp) => resp.text())
//   .then((data) => new DOMParser().parseFromString(data, `text/xml`))
//   .then((data) => displayData(data));

// Using await
// const main = async () => {
//   const resp = await fetch(`../../module-05/assignments/people.xml`);
//   const data = await resp.text();
//   const xmlDoc = new DOMParser().parseFromString(data, `text/xml`);
//   displayData(xmlDoc);
// }

// consolidated function
const main = async () => {
  const data = await fetch(`../../module-05/assignments/people.xml`)
    .then((resp) => resp.text())
    .then((data) => new DOMParser().parseFromString(data, `text/xml`));
  displayData(data);
};

main();