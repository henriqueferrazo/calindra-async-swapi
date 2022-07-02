const { default: axios } = require('axios');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const url = "https://swapi.dev/api/"

app.use(express.json());

const urlEntitiesFilms = {
    characters: "characters",
    planets: "planets",
    starships: "starships",
    vehicles: "vehicles",
    species: "species"
}


app.get('/:entity/:id', (req, res) => {
    const { entity, id } = req.params;
    const enrichFields = req.query.enrichFields
    const urlResquest = `${url}/${entity}/${id}/?enrichFields=${enrichFields}`;

    axios.get(urlResquest)
        .then((response) => {
            let arrayResponse = [];
            let responseDataValue = response.data[`${enrichFields}`]

            if (enrichFields == urlEntitiesFilms[`${enrichFields}`]) {
                for (let i = 0; i <= responseDataValue.length; i++) {
                    console.log(responseDataValue[i])

                    axios.get(responseDataValue[i])
                        .then((responseValueUrlApi) => {
                            arrayResponse.push(responseValueUrlApi.data);
                            console.log(arrayResponse)
                        }).catch((err) => {
                            console.log(err);
                         });
                    console.log(i)

                }
                
                res.json(arrayResponse);
            }
        }).catch((erro) => {
            console.log(erro)
            res.send("ERRO 500");
        })
    });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

