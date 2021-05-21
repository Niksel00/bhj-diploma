/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    const f = function () {},
        {
            url = '',
            method = 'GET',
            callback = f,
            responseType = '',
            async = true,
            data = {}
        } = options,
        xhr = new XMLHttpRequest;

    const formData = new FormData;
    let params = '';

    if (method === 'GET') {
        for (param in data) {
            params += param + '=' + data[param] + '&';
        }
        params = '/?' + params.slice(0, -1);
    } else {
        for (param in data) {
            formData.append(param, data[param]);
        }
    }

    try {
        xhr.open(method, url + params);
        xhr.responseType = responseType;
        xhr.withCredentials = true;
        xhr.send(formData);
    } catch (err) {
        callback(err);
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {

            if (!xhr.response.success) {
                callback(xhr.response.error, xhr.response);
            } else {
                callback(null, xhr.response);
            }

        }
    });

};