'use strict';
const request = require("request-promise");
const { swapiURL } = require("../../conf");
const _ = require("lodash");

// Number of results given back from swapi
const swapiLimit = 10;

const controller = {
    // Gets a list of Planet Residents
    index(req, res) {
        getPlanets(req, `${swapiURL}planets`)
            .then(planets => {
                let promises = [];
                let responseEntity = {};
                for (let planet of planets) {
                    if (planet)
                        promises.push(getResidents(planet).then(residents => {
                            responseEntity[planet.name] = residents;
                        }))
                }
                Promise.all(promises)
                    .then(results => {
                        return res.status(200).json(responseEntity);
                    })
                    .catch(res.status(500).send);
            })
    }
}

const getPlanets = (req, url, planets) => {
    console.log(`URL ${url}`);
    let options = {
        method: "GET",
        url: url
    }
    return request(options)
        .then(JSON.parse)
        .then(response => {
            planets = response.results.concat(planets);
            if (response.next) {
                return getPlanets(req, response.next, planets)
            }
            else {
                return planets;
            }
        })
}

const getResidents = (planet) => {
    let promises = [];

    for (let url of planet.residents) {
        promises.push(request(url)
            .then(JSON.parse));
    }
    return Promise.all(promises)
        .then(results => {
            if (!results.length)
                return [];
            let residents = [];
            for (let resident of results) {
                console.log(`resident`,resident);
                residents.push(resident.name);
            }
            console.log(`residents for ${planet.name}`, residents.length);
            return residents;
        })
}


module.exports = controller;