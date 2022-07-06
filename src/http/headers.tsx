export let myHeaders = new Headers({
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "apikey": "abcdef",
})

export let myHeadersGet = new Headers({
    "apikey": "abcdef",
})

export let requestOptionGet = {
    method: "GET",
    headers: myHeadersGet,
}