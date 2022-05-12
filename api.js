// Access HTML
document.addEventListener('DOMContentLoaded', function() {

function fetchWeather(position) {
  
  // Get number of days from user
  var nbrDays = parseInt(document.getElementById("nbrDays").value);
 // Concatenation of the url 
 const KEY_API = 'd0af24aa55087a237520c27ee51f1503'
 let urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lng}&appid=${KEY_API}`

   fetch(urlWeather)// on utilise la methode fetch à nouveau
   .then(response => { 
     if (response.status == 200) { // on vérifie que l'appel à l'API a fonctionné
         return response.json()  // ne pas oublier le return du callback
     }else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
   }) 
     .then(data => {
       console.log(data);
       // Obtain current day from 0 to 6 -> Sunday to Saturday
       const birthday = new Date();
       const today = birthday.getDay();
      console.log(today);
      let endToday = today + nbrDays
         // Create day and list them
         for (let i = today; i < endToday; i++) {
           
           let empty = document.getElementById("empty")
           let p = document.createElement('p')
           p.innerHTML = days[i]
           empty.appendChild(p)
         }

         // Create pictures with corresponding weather
         for(let j = 0; j < nbrDays; j++) {
           
           let clouds = data.daily[j].clouds
           let currentWeather = data.daily[j].weather[0].main
           let empty2 = document.getElementById("empty2")
           let img = document.createElement('img')          
           
           // Filtering with conditions to match picture with weather
           if(currentWeather == 'Clear') {
             img.src = "./icons/sun.svg"
           }
           else if(currentWeather == 'Snow') {
             img.src = "./icons/snow.svg"
           }
           else if(currentWeather == 'Clouds' && clouds >= 50) {
             img.src = "./icons/clouds.svg" 
           }
           else if(currentWeather == 'Clouds' && clouds < 50) {
             img.src = "./icons/cloudy.svg"
           }else 
           img.src = "./icons/rain.svg" 
           
           empty2.appendChild(img)
         }
     })
   .catch(err => {
     console.log(err)
   });

}

function fetchPositionAndWeather() {
  // Get location and number of days from user
  var input = document.getElementById("input").value;

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  // Concatenation of the url 
  const API_KEY = 'f5795e01c3854f0886691ec5e3ce8fa1'
  let urlGeo = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${API_KEY}&language=fr&pretty=1`

  fetch(urlGeo) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
  .then(response => { // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
    if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
        return response.json()  // ne pas oublier le return du callback
    }
    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
  })
  .then(data => {
    console.log(data)
    return data.results[0].geometry
  })
  .then(data => {
    fetchWeather(data);
  })
  .catch(err => { 
    console.log(err)
  });
}
  // Storing using input after clicking submit
  document.getElementById("submit").addEventListener('click', function() {
    fetchPositionAndWeather();
  });
});