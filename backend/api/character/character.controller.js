'use strict';
const request = require("request-promise");
const { swapiURL } = require("../../conf");
const _ = require("lodash");

// Number of results to be returned in a given request to /characters
const numResults = 50;

// Number of results given back from swapi
const swapiLimit = 10;

// Total number of pages we will need to request
// NOTE: The requirements state to return any 50 characters, so this will work. In a production environment this would have to be more complex
const totalPages = numResults / swapiLimit;

const controller = {
    // Gets a list of Characters
    index(req, res) {
        let query = {};
        let current = 0;

        if (req.query.offset) {
            current = req.query.offset;
        }

        let promises = [];
        for (let i = 1; i <= totalPages; i++) {
            promises.push(getPage(req, i))
        }

        // Process the results once they are all complete
        Promise.all(promises)
            .then(results => {
                let characters = [];
                for (let promise of results) {
                    characters = promise.results.concat(characters);
                }

                if (req.query.sort) {
                    characters = sort(req.query.sort, characters);
                }
                return characters;
            })
            .then(respondWithResult(res))
            .catch(handleError(res));


    },

    // Gets a single character
    show(req, res) {
        // I chose to do handle the fetching of individual resources with express's router params
        return res.status(200).render('character',req.character);
    }
}

const handleError = (res) => {
    return (err) => {
        console.log(`ERROR`, err);
        return res.status(500).send(err);
    };
}

const respondWithResult = (res) => {
    return (result) => {
        return res.status(200).send(result);
    };
}

const getPage = (req, page) => {
    let query = req.query;
    query.page = page;

    let options = {
        qs: query,
        method: "GET",
        url: `${swapiURL}people`
    }
    return request(options)
        .then(JSON.parse)
}

const sort = (key, array) => {
    return _.orderBy(array, (o) => {
        let value = o[key];
        // Handle unknown values (they throw off numerical ordering)
        if (value == 'unknown')
            return -1;

        // Swapi saves all the values as strings even if they should be ints.
        if (parseInt(value)) {
            return parseInt(value);
        }

        return value;
    });
}

module.exports = controller;