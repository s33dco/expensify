// Object Destructuring

// const person = {
//   name: 'Tarquin',
//   age : 57,
//   location: {
//     city: 'Brighton',
//     temp : 2
//   }
// };

// const {name: firstName = 'Anonymous', age} = person;         // set default value adn rename name

// console.log(`${firstName} is ${age}`)

// const {city, temp: temperature} = person.location; // rename temp as temperature

// if(temperature && city){
//   console.log(`It's ${temperature} degrees in ${city}`)
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName); // Penguin, Self-Published



// Array Destructuring

// const address = ['101 The Street', 'Tingville', 'Skillrex', 'aa1 1aa'];
// // const address = [];

// const [, , area='Withheld'] = address; // skip first 2 items in array

// console.log(`You are in ${area}`);

const item = ['Coffee (hot)', '£2.00', '£2.50', '£3.00'];

// console.log(`a medium Coffee (hot cost £2.50)`);

const [menuItem, , mediumPrice] = item

console.log(`A medium ${menuItem} costs ${mediumPrice}`);