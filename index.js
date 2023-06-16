const
    request = require('request'),
    pantry = require('pantry-node'),
    pantryID = process.env.PANTRY_ID,
    pantryClient = new pantry(pantryID);


main()
async function main() {
    var results = await apiCall(); // make an initial call to the API
    var results_json = await showResults(results); // call the showResults function
    await putDataToPantry(results_json);
    //console.log("Pantry: " + pantry);
}

async function apiCall() {
    return new Promise((resolve) => {
        var options = {
            uri: 'https://zobjobs.com/api/jobs',
            method: 'GET'
        };

        try {
            request(options, function (error, response, body) { // Call the zobjobs API
                if (error) {
                    // There was an error. Display it and return from function
                    console.log('response', error)
                    resolve(false) // 
                }
                //console.log(body)
                resolve(body) // return results
            });
        } catch (error) {
            // There was an error so display it and return
            console.log('apiCall Error: ', e)
            resolve(false)
        }
    })
}

async function showResults(results) {
    if (!results) {
        return // Do not process this 
    }

    try {
        var json = JSON.parse(results) // parse the string from the API
    } catch (error) {
        console.log('JSON Error: ', error) // Show any errors
    }
    return json
}

async function putDataToPantry(results) {
    try {

        // Delete a basket
        await pantryClient.basket
            .delete('aiforemployment')
            .then((response) => console.log(response))

        // Create a basket with a new data
        await pantryClient.basket
            .create('aiforemployment', results)
            .then((response) => console.log(response))

    } catch (error) {
        // There was an error so display it and return
        console.log('Pantry Update Error: ', e)
    }
}
