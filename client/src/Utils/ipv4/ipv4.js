export const ipv4 = async() => {
  try {
    // get guest/user current IP Address
    const res = await fetch('https://api.ipify.org?format=json')
    const json = await res.json()
    let currentUserIP = json.ip

    return currentUserIP
  } catch (error) {
    console.log(error)
  }
}