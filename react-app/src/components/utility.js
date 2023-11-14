
export function rowCreator(fields) {
    const RowArray = [];

    for (let letter of "ABCDEFGHI") {
        RowArray.push({ fields: [], id: letter })
    }

    Object.values(fields).map(field => {
        for (let row of RowArray) {
            if (row.id === field.row_id) {
                row.fields.push(field)
            }
        }
    })

    return RowArray;
}

export const sortFields = (fields) => {
    const sortedFields = {};
    let sortedFieldsArr;

    for (let field of fields) {
        sortedFields[field.id] = field
    }

    sortedFieldsArr = Object.values(sortedFields)

    return sortedFieldsArr
}

