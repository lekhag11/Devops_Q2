/**
 * @param { 'DD/MM/YYYY' } date1 
 * @param { 'DD/MM/YYYY' } date2 
 * @param { string } category
 * @param { string } type 
 */
const getParams = (date1, date2, category, type) => {

    if (date1 && category && type) {
        return {
            date1,
            category,
            type,
        }
    }
    else if (date1 && date2 && category && type) {
        return {
            date1,
            date2,
            category,
            type,
        }
    }
    else {
        throw Error('Required : Date1, Category, Type')
    }
}

export { getParams }