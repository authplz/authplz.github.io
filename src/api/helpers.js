import 'whatwg-fetch';

import { REACT_APP_API_SERVER } from '../const';

const UNKOWN_ERROR = 'UNKNOWN_ERROR';

export const baseUrl = REACT_APP_API_SERVER || '';
export const credentials = 'include';

export const getJson = (path, params) => {
    const queryParams = (new URLSearchParams(params)).toString();
    const queryString = `${baseUrl}${path}?${queryParams}`

    return fetch(queryString, {
            method: 'get',
            credentials: credentials,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return res
                .json()
                .then(res => {
                    throw res.code || UNKOWN_ERROR;
                });
        });
}

export const getApi = (path, params) => {
    const queryParams = (new URLSearchParams(params)).toString();
    const queryString = `${baseUrl}${path}?${queryParams}`
    return fetch(queryString, {
            method: 'get',
            credentials: credentials,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return res
                .json()
                .then(json => {
                    throw json.code || UNKOWN_ERROR;
                });
        })
}

export const postForm = (path, data) => {
        const formData = new FormData();
        console.log(data);
        Object.keys(data).forEach((i) => {
            formData.append(i, data[i]);
        });

        return fetch(`${baseUrl}${path}`, {
            method: 'post',
            credentials: credentials,
            body: formData,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return res.json().then(res => {
                throw res.code || UNKOWN_ERROR;
            })
        });
    }

export const postJson = (path, data) => {
    return fetch(`${baseUrl}${path}`, {
            method: 'post',
            credentials: credentials,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then((response) => {
            if (response.ok) {
                return response.message;
            }
            return response
                .json()
                .then(({ code }) => {
                    throw code || UNKOWN_ERROR;
                });
        });
}
