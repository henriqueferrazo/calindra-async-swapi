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

const isArray = (fields) => {
    return fields instanceof Array;
}

app.get('/:entyds/:id', async (req, res) => {
    const { entyds, id } = req.params;
    const enrichFields = isArray(req.query.enrichFields)
                ?req.query.enrichFields : [req.query.enrichFields]
    const urlResquest = `${url}/${entyds}/${id}`;

    const filmResponse = await axios.get(urlResquest);

    if (filmResponse.status === 200) {
        const film = filmResponse.data;
        // console.log(film);
        const fields = enrichFields.filter(field => urlEntitiesFilms[field]);

        for (const field of fields) {

            const currentField = film[field];
            const isAnArrayWithLinks = isArray(currentField)
                && currentField.filter(val => val.indexOf(url) !== -1).length > 0;

            const fullFields = [];

            if (isAnArrayWithLinks) {

                for (const url of currentField) {

                    const responseField = await axios.get(url);

                    if (responseField.status === 200) {
                        const fullField = responseField.data;
                        fullFields.push(fullField);
                    }
                }

                film[field] = fullFields;
            }

        }
        res.json(film)

    } else {
        res.status(404).send({ error: 'Filme não encontrado.' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
