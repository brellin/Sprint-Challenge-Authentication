import axios from 'axios'

export default function () {
    return axios.create({
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}
