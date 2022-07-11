export let myHeaders = new Headers({
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "apikey": "defaultApikeyProtection",
})

export let myHeadersGet = new Headers({
    "apikey": "defaultApikeyProtection",
})

export let requestOptionGet = {
    method: "GET",
    headers: myHeadersGet,
}