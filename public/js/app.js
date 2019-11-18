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
