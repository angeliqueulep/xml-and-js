const xhr =(url, method = `GET`) =>
  new Promise((resolve) => {
    const xhrhttp = new XMLHttpRequest();
    xhrhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseXML);
      }
    };
    xhrhttp.open(method, url, true);
    xhrhttp.send();
  });


function stringToNode(value) {
  const html = value.trim();
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.firstChild;
}

function createCustomer(info) {
  const content = `
    <tr>
      <td>${info.orderNumber}</td>
      <td>${info.fullName}</td>
      <td>${info.address}</td>
      <td>${info.phone}</td>
      <td>${info.email}</td>
      <td>${info.orderDate}</td>
      <td>${info.itemQty}</td>
      <td>${info.itemPrice}</td>
    </tr>
  `;

  return stringToNode(content);
}

function parseInfo(person) {
  const title = person.getElementsByTagName(`name`)[0].attributes[`title`].nodeValue;
  const name = person.getElementsByTagName(`name`)[0].childNodes[0].nodeValue;
  const fullName = title + " " + name;
  const address = person.getElementsByTagName(`address`)[0].childNodes[0].nodeValue;
  const phone = person.getElementsByTagName(`phone`)[0].childNodes[0].nodeValue;
  const email_attribute = person.getElementsByTagName(`email`)[0];
  if (email_attribute != null) {
    email = person.getElementsByTagName(`email`)[0].childNodes[0].nodeValue
  } else {
    email = "";
  };
  const order = person.getElementsByTagName(`order`)[0]
  const orderNumber = order.attributes[`orderID`].nodeValue.toUpperCase();
  const orderDate = order.getElementsByTagName(`orderDate`)[0].childNodes[0].nodeValue;
  const item = order.getElementsByTagName(`item`)[0]
  const itemPrice = item.getElementsByTagName(`itemPrice`)[0].childNodes[0].nodeValue;
  const itemQty = item.getElementsByTagName(`itemQty`)[0].childNodes[0].nodeValue;

  return {
    fullName,
    address,
    phone,
    email,
    orderNumber,
    orderDate,
    itemPrice,
    itemQty
  };
}

function displayData(xmlDoc) {
  const customers = xmlDoc.getElementsByTagName(`customer`);
  const listElement = document.getElementById(`customerTable`);


  for (let index = 0; index < customers.length; index++) {
    const customer = customers[index];

    const parsedInfo = parseInfo(customer);
    const customerElement = createCustomer(parsedInfo);

    listElement.appendChild(customerElement);
  }
}

xhr(`../../module-05/customers.xml`)
  .then((data) => displayData(data));