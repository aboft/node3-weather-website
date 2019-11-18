//const geocode = require('../src/geocode.js')




const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const address = document.querySelector('input').value

  document.getElementById('location').innerHTML = 'Loading...'
  document.getElementById('forecast').innerHTML = ''

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById('location').innerHTML = data.error
      } else {
        document.getElementById('location').innerHTML = data.location
        document.getElementById('forecast').innerHTML = data.forecast
      }
    })
  })

})


// fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
//   if (error){
//     callback('Unable to connect to location services.', undefined)
//   }else if (body.features.length === 0) {
//     callback(`Unable to find ${body.query[0]}. Try another search.`, undefined)
//   }else{
//     callback(undefined, {
//       latitude: body.features[0].center[1],
//       longitude: body.features[0].center[0],
//       location: body.features[0].place_name,
//     })
//   }
// })
