module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM Test"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            console.log(result)
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                temp: result['recordset'][0]['t'] 
            });
        });
    },
};

