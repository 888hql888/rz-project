
const formatDate = (value) => {
    return value && new Date(value).toLocaleDateString()
}
export { formatDate }