const displayTime = async() => {
    const cinema_id = localStorage.getItem("cinema_id");
    const movie_id = localStorage.getItem("movie_id");

    const TimeRes = await fetch("http://localhost:3000/time");
    const Timedata = await TimeRes.json();

    const MovieRes = await fetch("http://localhost:3000/movie");
    const MovieData = await MovieRes.json();

    const CinemaRes = await fetch("http://localhost:3000/cinema");
    const CinemaData = await CinemaRes.json();

    const Time_fileter = Timedata.filter((v1) => v1.movie_id === movie_id);

    console.log(Time_fileter);

    const Cinema_fileter = CinemaData.find((v2) => v2.id === cinema_id)
    const Movie_fileter = MovieData.find((v2) => v2.id === movie_id)

    

    let print =  `<h1>${Cinema_fileter?.cinemaname}</h1><br><br>
    <h1>${Movie_fileter?.moviename} :  ${Movie_fileter?.moviedesc}</h1><br>
    <a>

    `


    Time_fileter.map((v) => {
        
        v.alltime.map((v1) => {
            print += `
                <button onclick = "handletime('${v1}')">${v1}</button>
            `
        
    })
    })

    print += `</a>`

    document.getElementById("current-time").innerHTML = print

}

const handletime = (time) => {
    console.log(time);
    event.preventDefault();
     localStorage.setItem("time",time);
    
    
   
   
    window.location.href= "http://127.0.0.1:5500/users/seatUser.html"
}

window.onload = displayTime();