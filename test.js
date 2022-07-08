const axios = require("axios");


let attributeArray = [
  'https://swapi.dev/api/species/1/',
  'https://swapi.dev/api/species/2/',
  'https://swapi.dev/api/species/6/',
  'https://swapi.dev/api/species/11/',
  'https://swapi.dev/api/species/12/',
  'https://swapi.dev/api/species/13/',
  'https://swapi.dev/api/species/14/',
  'https://swapi.dev/api/species/15/',
  'https://swapi.dev/api/species/16/',
  'https://swapi.dev/api/species/17/',
  'https://swapi.dev/api/species/18/',
  'https://swapi.dev/api/species/19/',
  'https://swapi.dev/api/species/20/',
  'https://swapi.dev/api/species/21/',
  'https://swapi.dev/api/species/22/',
  'https://swapi.dev/api/species/23/',
  'https://swapi.dev/api/species/24/',
  'https://swapi.dev/api/species/25/',
  'https://swapi.dev/api/species/26/',
  'https://swapi.dev/api/species/27/'
]


async function retorne(array) {

  let fullField = [];
  let fullPromiseArray = [];

  for (let url of array) {

    const promise = axios.get(url)
    fullPromiseArray.push(promise);

  }
  const promiseAll = await Promise.all(fullPromiseArray);
  for(let urlRespondida of promiseAll) {
      let resposta = urlRespondida[a]
  }

  return array = resposta
  // console.log(fullField)
}

const resultado = retorne(attributeArray)
console.log(resultado)