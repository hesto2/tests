// This file is used in the individual routes to leverage Express's route parameter functionality
const { swapiURL } = require("./conf");
const request = require("request-promise");

module.exports = (router) => {
    router.param('character', function (req, res, next, name) {
        let options = {
            method: "GET",
            url: `${swapiURL}people`,
            qs: { search: name }
        }

        request(options)
            .then(JSON.parse)
            .then(response => {
                if (!response.results) {
                    return res.status(404).send();
                }
                // Could do something more elegant here if we wanted to be able to include first/last name etc.
                // Would probably require moving the name into a query string so we could include spaces, that way if there were 2 Lukes we could include the last name as well
                req.character = response.results[0];

                return next();
            })
            .catch(res.status(500).send);
    })
}



// I saw sequelize listed as one of the bonus techs to be familiar with, 
// if we were using a database for this app I'd do something like this using Sequelize:
/*
    sqldb.Character.findOne({
            where:
            { _id: id },
            include: [{
                model: sqldb.User //or whatever other table you want joined in
            }]
        })
            .then((character) => {
                if (!character) {
                    //Handle character not found
                    return res.status(404).send();
                }
                req.character = character;
                return next();
            })
            .catch((err) => {
                console.log("ERR", err);
                res.status(500).json({ message: err })
            })
    });
*/