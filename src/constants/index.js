export const reorderData = (data, index, item) => {
    const newData = [...data]
    newData.splice(index, 1, item)

    return newData
}