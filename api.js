// Access HTML
document.addEventListener('DOMContentLoaded', function() {

  // Storing using input after clicking submit
  document.getElementById("submit").addEventListener('click', function() {
      
      var input = document.getElementById("input").value;
      console.log(input)

      days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const API_KEY = 'f5795e01c3854f0886691ec5e3ce8fa1'
      let URL = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${API_KEY}&language=fr&pretty=1`

    fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
    // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
    .then(response => { 
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

      fetch(url)
      .then(response => { 
        if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
            return response.json()  // ne pas oublier le return du callback
        }else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
      })
      .then(data => {
        console.log(data)
        // Take cloud % / weather of the day / day of the week
        const birthday = new Date();
        const day = birthday.getDay();
        console.log(day)
        currentWeather = data.current.weather[0].main
        clouds = data.current.clouds

        for (let i = day; i < days.length; i++) {
          let p = document.createElement('p')
          p.innerHTML = days[i]
          let empty = document.getElementById("empty")
          empty.appendChild(p)

          let img = document.createElement('img').setAttribute("id", "image")
          document.getElementById("image").src = "./icons/sun.svg"
          empty.appendChild(img)
          
         // if(currentWeather == 'Clear') {
          
          // document.getElementById("weatherPic").src = './icons/sun.svg'
        //  }else if(currentWeather == 'Snow') {
        //   document.getElementById("weatherPic").src = './icons/snow.svg'
        //  }else if(currentWeather == 'Clouds' && clouds >= 0) {
        //   document.getElementById("weatherPic").src = './icons/cloudy.svg' 
        //  }else if(currentWeather == 'Clouds' && clouds < 50) {
        //   document.getElementById("weatherPic").src = './icons/clouds.svg'
        //  }else 
        //   document.getElementById("weatherPic").src = './icons/rain.svg'
         
         

          // Conditions for picture
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

    
  
  
  
  






    // API
    // var api_key = 'f5795e01c3854f0886691ec5e3ce8fa1';

    // var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    // var request_url = api_url
    // + '?'
    // + 'key=' + api_key
    // + '&q=' + encodeURIComponent(input)
    // + '&pretty=1'
    // + '&no_annotations=1';

    //     fetch(request_url)
    //     .then((response) => {
    //       return response.json()})
    //     .then((data) => {
    //         if (data.ok) {
    //             console.log(data)
                // let data = JSON.parse(request.responseText);
                // let lat = data.results[0].geometry.lat; // store lattitude
                // let lon = data.results[0].geometry.lng; // store longitude
                // console.log(`${lat} ${lon}`);
            // }
          //   throw new Error('Something went wrong');
          // })
          // .then((data) => {
          //   console.log(data)
          // })
          // .catch((error) => {
          //   console.log(error)
          // });

        // key_api = 'd0af24aa55087a237520c27ee51f1503'
        
        // fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={key_api}').then((response) => {
        //     if (response.ok) {
        //       return response.json();
        //     }
        //     throw new Error('Something went wrong');
        //   })
        //   .then((responseJson) => {
        //     console.log(responseJson)
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   });


    // });