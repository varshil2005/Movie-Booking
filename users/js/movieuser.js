const displayMovie = async() => {
    const cinema_id = localStorage.getItem("cinema_id");

    const MovieRes = await fetch("http://localhost:3000/movie");
    const MovieData = await MovieRes.json();

    const CinemaRes = await fetch("http://localhost:3000/cinema");
    const CinemaData = await CinemaRes.json();



    const filter_movie = MovieData.filter((v1) => v1.cinema === cinema_id);
    console.log(filter_movie);
    
    const Cinema_fileter = CinemaData.find((v2) => v2.id === cinema_id)
    
    let print =  `<h1>${Cinema_fileter?.cinemaname}</h1><br> <a> `
   
    // print +=  `<h1>${Cinema_fileter?.cinemaname}</h1><br>`
    filter_movie.map((v) => {
        
      
        print +=

               `
                <div id="current-movie">
                <div id="cm-img-box">
                    <img src="../image/${v.movie_poster}"><br>
                    
                </div>
                <div id="booking">
                <h3>${v.moviename}</h3><br>
                    <p>${v.moviedesc}</p><br>
                    <button onclick="handlesubmit('${v.id}')">Book Ticket</button>
                </div>
                </div>`
   

       
    })

    print += `<a>`
  

    document.getElementById("current-movies").innerHTML = print


}

const handlesubmit = (id) => {
    localStorage.setItem("movie_id",id);
    window.location.href= "http://127.0.0.1:5500/users/timeuser.html"
}

window.onload = displayMovie