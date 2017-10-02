class Requester {
    request(url, type, body, headers) {
        const promise = new Promise((resolve, reject) =>
            $.ajax({
                url,
                type,
                contentType: 'application/json',
                headers,
                data: body,
                success: resolve,
                error: reject
            })
        );

        return promise;
    }

    get(url, headers = {}) {
        return this.request(url, 'GET', '', headers);
    }

    post(url, body, headers = {}) {
        return this.request(url, 'POST', JSON.stringify(body), headers);
    }

    put(url, body, headers = {}) {
        return this.request(url, 'PUT', JSON.stringify(body), headers);
    }

}

let requester = new Requester();
export { requester };