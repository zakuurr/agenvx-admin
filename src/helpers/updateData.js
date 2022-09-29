// const updateData = ({ body }) => {
//   try {
//     const url = process.env.REACT_APP_BASEURL + endpoint
//     const res = await fetch(url, {
//       method: 'PUT',
//       mode: 'cors',
//       credentials: 'same-origin',
//       body
//     })

//     if (res.ok && res.status >= 200 && res.status < 300) {
//       return await res.json()
//     }
//     throw Error('Trouble fetch data...')
//   } catch (e) {
//     return Error(e)
//   }
// }

// export default updateData