// Access HTML
document.addEventListener('DOMContentLoaded', function() {

  // Storing using input after clicking submit
  document.getElementById("submit").addEventListener('click', function() {
      
    var input = document.getElementById("input").value;
    console.log(input)

    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']

    const API_KEY = 'f5795e01c3854f0886691ec5e3ce8fa1'
    let URL = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${API_KEY}&language=fr&pretty=1`

    fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
    .then(response => { // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
      if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
          return response.json()  // ne pas oublier le return du callback
      }
      else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then(data => {
      // Store longitude and latitude in variables
      lat = data.results[0].geometry.lat
      lon = data.results[0].geometry.lng
      // Concatenation of the url 
      const KEY_API = 'd0af24aa55087a237520c27ee51f1503'
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY_API}`

        fetch(url)// on utilise la methode fetch à nouveau
        .then(response => { 
          if (response.status == 200) { // on vérifie que l'appel à l'API a fonctionné
              return response.json()  // ne pas oublier le return du callback
          }else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
          .then(data => {
            console.log(data)
            // Take cloud % / weather of the day / day of the week
            const birthday = new Date();
            const today = birthday.getDay();
            console.log(today)
            currentWeather = data.current.weather[0].main
            clouds = data.current.clouds

              for (let i = today; i < days.length; i++) {
                
                let content = document.createElement('div')
                let p = document.createElement('p')
                p.innerHTML = days[i]
                content.appendChild(p)
                img = document.createElement('img')          
                
                if(currentWeather == 'Clear') {
                  img.src = "./icons/sun.svg"
                }
                else if(currentWeather == 'Snow') {
                  img.src = "./icons/sun.svg"
                }
                else if(currentWeather == 'Clouds' && clouds >= 0) {
                  img.src = "./icons/sun.svg" 
                }
                else if(currentWeather == 'Clouds' && clouds < 50) {
                  img.src = "./icons/sun.svg"
                }else 
                img.src = "./icons/sun.svg" 
                
                content.appendChild(img)
                let empty = document.getElementById("empty")
                empty.appendChild(content)
              }
          })
        .catch(err => {
          console.log(err)
        });
    })
    .catch(err => { 
      console.log(err)
    });
  });
});