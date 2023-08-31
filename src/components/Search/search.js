import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '38368934-291effe9d25e1bec757593010'

function getApi (content) {
    axios.get(API_URL, {
        params: {
            key: API_KEY,
            'q': `${content}`,
            image_type: 'photo',
            page: 1,
            per_page: 12
        }
    })
        .then(function (response) {

            console.log(response.data.hits)
        })    
}

getApi('red')

