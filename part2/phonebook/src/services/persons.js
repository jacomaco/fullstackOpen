import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newEntrie => {
    const request = axios.post(baseUrl, newEntrie);
    return request.then(response => response.data);
}

const deleteEntrie = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

export default { getAll, create, deleteEntrie, update}