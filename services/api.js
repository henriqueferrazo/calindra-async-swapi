const { default: axios } = require('axios');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3010;
const url = "https://swapi.dev/api/"

app.use(express.json());

// const urlEntitiesFilms = ["characters", "planets", "starships", "vehicles", "species"]

const urlEntitiesFilms = {
    characters: "characters",
    planets: "planets",
    starships: "starships",
    vehicles: "vehicles",
    species: "species"
}


function splintando(value) {

}

app.get('/:entity/:id', (req, res) => {
    const { entity, id } = req.params;
    const enrichFields = req.query.enrichFields
    const urlResquest = `${url}/${entity}/${id}/?enrichFields=${enrichFields}`;

    axios.get(urlResquest)
        .then((response) => {
            let arrayResponse = [];
            let responseArrayData = response.data
            
            if(enrichFields == urlEntitiesFilms.enrichFields) {
                console.log(response.data)

            // res.send({ resultado: response.data[`${enrichFields}`] });
            // console.log(response.data[`${enrichFields}`]);
            
            
        }
        
        // res.status(200).json(response.data)
        }).catch((erro) => {
            console.log(erro)
            res.send("ERRO 500");
        })
        
    });
    
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    
    
    // if (enrichFields == urlEntitiesFilms[`${enrichFields}`]) {
    //     for (let i = 0; i <= responseDataValue.length; i++) {
    //         console.log(responseDataValue[i])

    //         axios.get(responseDataValue[i])
    //             .then((responseValueUrlApi) => {
    //                 console.log(responseValueUrlApi.data);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         console.log(i)
    //     }