/*
*check data from input is passed the length limite
*@param {number} num Input length limited number
*@param {array} data Input data need to check
*/
const lengthLimit = (num, data) => {
    let isValide = true
    data.forEach(info => {
        if(info.length > num){
           isValide = false 
        }
    })
    return isValide
}
/*
*check data from input is vide or note
*
*@param {array} data Input data need to check
*/
const checkVide = (data) => {
    let isValide = true
    data.forEach(info => {
        if(info.trim().length === 0){
           isValide = false 
        } 
    })
    return isValide
}

export {lengthLimit, checkVide}