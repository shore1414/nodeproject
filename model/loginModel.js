
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;


const pool = new Pool({connectionString: connectionString});
function checkDBuser(params, callback) {
 const sql = "SELECT id, fname, lname FROM people where fname = $1";
 const data = [params];
 pool.query(sql, data, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
    }

    // Log this to the console for debugging purposes.
    console.log("Found result: " + JSON.stringify(result.rows));


    // When someone else called this function, they supplied the function
    // they wanted called when we were all done. Call that function now
    // and pass it the results.

    // (The first parameter is the error variable, so we will pass null.)
    callback(null, result.rows);
})
};

module.exports = {
    checkDBuser: checkDBuser
}