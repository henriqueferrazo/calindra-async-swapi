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
    const entityParams = filmResponse.data;

    if (enrichFieldsParams !== undefined) {

        const enrichFields = enrichFieldsParams.split(",")

        if (filmResponse.status === 200) {
            for (let field of enrichFields) {

                const currentField = entityParams[field];

                const fullPromiseArray = [];
                const fullField = [];

                for (const url of currentField) {

                    const promise = axios.get(url)
                    fullPromiseArray.push(promise);
                    // console.log(fullPromiseArray)
                    
                }
                const promiseAll = await Promise.all(fullPromiseArray);
                console.log(promiseAll)
                const filterPromise = promiseAll.filter( obj => {
                    console.log(obj['data']);
                    fullField.push(obj['data']);

                })
            
                entityParams[field] = fullField;
                // console.log(entityParams)
            }
            res.json(entityParams)

        } else {
            res.status(404).send({ error: 'Filme não encontrado.' })
        }
    } else {
        res.json(entityParams)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
