const serverUrl = "http://89.108.65.47:3000"

export default async function req(request){
    return fetch(serverUrl+request)
    //.then(res => res.json()).then((res) => {return res})
}