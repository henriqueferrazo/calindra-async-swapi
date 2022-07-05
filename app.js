const axios = require('axios');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

const url = "https://swapi.dev/api/"


app.get('/:entyds/:id', async (req, res) => {
    const { entyds, id } = req.params;
    const urlResquest = `${url}/${entyds}/${id}`;
    const enrichFieldsParams = req.query.enrichFields;

    const filmResponse = await axios.get(urlResquest);
    const film = filmResponse.data;

    if (enrichFieldsParams !== undefined) {

        const enrichFields = enrichFieldsParams.split(",")

        if (filmResponse.status === 200) {
            for (let field of enrichFields) {

                const currentField = film[field];

                const fullFields = [];

                for (const url of currentField) {

                    const responseField = axios.get(url)
                    .then(url => {
                        if (url.status === 200) {
                            const fullField = responseField.data;
                            fullFields.push(fullField);
                        }
                    })                    
                    Promise.all([responseField]).then(value => {
                        fullFields = value[0] 
                    })

                }
                film[field] = fullFields;

            }
            res.json(film)

        } else {
            res.status(404).send({ error: 'Filme não encontrado.' })
        }
    } else {
        res.json(film)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
