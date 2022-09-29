const fetchData = async endpoint => {
  try {
    const url = process.env.REACT_APP_BASEURL + endpoint
    const res = await fetch(url)

    if (res.ok && res.status >= 200 && res.status < 300) {
      return await res.json()
    }
    throw 'Trouble fetch data...'
  } catch (e) {
    return Error(e)
  }
}

export default fetchData
