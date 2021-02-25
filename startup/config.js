
module.exports = function($env){
    if(!$env.SECRET_KEY){
        throw new Error('FATAL ERROR: jwt secrey key is not defined.')
    }
}