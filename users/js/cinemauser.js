const displaycinema = async() => {
    const cinemares = await fetch("http://localhost:3000/cinema");
    const cinemadata = await cinemares.json();

    let print = `<a>`

    cinemadata.map((v) => {
        print += `
                <div id="current-cinema">
                <div id="cm-img-box" onclick="handlecinema('${v.id}')"><h1>${v.cinemaname}</h1><br>
                <p>${v.cinemaaddress}</p>
                </div>
                
                </div>`
    })

    print += `</a>`

    document.getElementById("current-cinemas").innerHTML = print
}

const uniqArray = [];

const displaymovie = async() => {
    const movieres = await fetch("http://localhost:3000/movie");
    const movie_data = await movieres.json();
    
    movie_data.forEach((movie) => {
         let isUnique = true;
 
         // Checking if the movie name already exists in uniqArray
         uniqArray.forEach((uniqueMovie) => {
             if (uniqueMovie.moviename === movie.moviename) {
                 isUnique = false;
             }
         });
 
         // If the movie is unique, add it to the uniqArray
         if (isUnique) {
             uniqArray.push({ moviename: movie.moviename, movieposter: movie.movie_poster ,moviedesc : movie.moviedesc,movieid:movie.id});
         }
    });
    
    let print = `<a>`
   uniqArray.map((v) => {

        print += `
        <div id="current-movie">
        <div id="cm-img-box">
            <img src="../image/${v.movieposter}"><br>
            
        </div>
        <div id="booking">
        <h3>${v.moviename}</h3><br>
            <p>${v.moviedesc}</p><br>
            <button onclick="handlesubmit('${v.moviename}','${v.movieid}')">Book Ticket</button>
        </div>
        </div>`
   })

   print += `</a>`

   document.getElementById("current-movies").innerHTML = print
 }
 
const handlecinema = async(id) => {

    localStorage.setItem("cinema_id",id)
    window.location.href= "http://127.0.0.1:5500/users/movieuser.html"
}

const handlesubmit = async(moviename,id) =>{
    localStorage.setItem("movie_name",moviename);
    localStorage.setItem("movie_id",id);
    window.location.href= "http://127.0.0.1:5500/users/cinema.html"
}


window.onload = function () {
    displaycinema()
    displaymovie()
}
