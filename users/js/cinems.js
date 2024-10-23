const displaycinema = async() => {
    const movie_name = localStorage.getItem("movie_name")
   
    const cinemaRes = await fetch("http://localhost:3000/cinema");
    const cinemadata = await cinemaRes.json();

    const movieRes = await fetch("http://localhost:3000/movie");
    const moviedata = await movieRes.json();
    

let cinemaArray =[] ;
    moviedata.map((v) => {
        if (v.moviename === movie_name) {
            let cinemafilter = cinemadata.filter((v1) => v1.id === v.cinema);
            cinemaArray.push(cinemafilter);
        }
        
    })

    console.log(cinemaArray)

    let cinemaprint =  `<a>`

    cinemaArray.map((v) => {
        v.map((v1) => {

      
         cinemaprint += `
                <div id="current-cinema">
                <div id="cm-img-box" onclick="handlecinema('${v1.id}')"><h1>${v1.cinemaname}</h1><br>
                <p>${v1.cinemaaddress}</p>
                </div>
                
                </div>`
            
    })

    cinemaprint += `</a>`

    document.getElementById("current-cinemas").innerHTML = cinemaprint
})
}

const handlecinema = (id) => {
    const movie_id = localStorage.getItem("movie_id");
    console.log(movie_id);
    localStorage.setItem("movie_id",movie_id);
    localStorage.setItem("cinema_id",id);
    window.location.href= "http://127.0.0.1:5500/users/timeuser.html"
}





window.onload = displaycinema