<<<<<<< Updated upstream
const bdd = require("./database.js")

async function getUserById(id){
    sql = "SELECT * FROM utilisateur WHERE id = ? ";
    return new Promise((resolve,reject)=>{
        bdd.query(sql,id, (err, results)=>{
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    }
    )
};

module.exports = { getUserById};
=======
async function checklogin (login) {
    sql = "SELECT * FORM utilisateur";
    return new Promise((resolve, reject)) => {
        resolve(true);
    });
}
>>>>>>> Stashed changes