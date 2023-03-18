const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomNumber = () => Math.floor(Math.random() * 40);

const generateData = async () => {
  await timeout(1000);
  return Array.from({ length: 20 }, generateRandomNumber);
};

const convertToFeet = async (meters) => {
  const feet = meters * 3.2808;
  await timeout(3500);
  return feet;
};

const processData = async (data) => {
  for (const value of data) {
    const convertedValue = await convertToFeet(value);
    logResult(value, convertedValue);
  }
};

const logResult = async (meters, feet) => {
  console.log(`Converted ${meters}m to ${feet}ft`);
};

const main = async () => {
  console.log("Start");
  const data = await generateData();
  await processData(data);
  console.log("Finish");
}

main();