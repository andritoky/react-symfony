export let getData = async () => {
    let reponse = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    let data = await reponse.json()
    return data
}
