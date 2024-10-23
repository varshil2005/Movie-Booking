    let updateId = null;
    const handlecinema = async () => {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        let print = '<option value="0">-- Select Cinema --</option>'

        data.map((v) => {
            print += `<option value="${v.id}">${v.cinemaname}</option>`
        })

        document.getElementById("cinema").innerHTML = print

    }

    const handlesubmit = async () => {
        event.preventDefault();
        const cinema = document.getElementById("cinema").value;
        const moviename = document.getElementById("movie_name").value;
        const moviedesc = document.getElementById("movie_desc").value;
        let movie_poster = '';
        // const movie_poster = document.getElementById("movie_poster").files[0].name;

        if (document.getElementById("movie_poster").files[0]) {
            movie_poster =document.getElementById("movie_poster").files[0].name
        } else {
            let path = document.getElementById("poster_img").src;
          
            let arr = path.split("/");

            let imagename = arr[arr.length -1];

            movie_poster = imagename;

           
        }
        const obj = {
            cinema: cinema,
            moviename,
            moviedesc,
            movie_poster

        }

        if (updateId) {
            try {
                await fetch("http://localhost:3000/movie/" +updateId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...obj ,id:updateId})

                })
                    .then((response) => display())
                    .catch((error) => console.log(error))
            } catch (error) {

            }
        } else {
            try {
                await fetch("http://localhost:3000/movie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)

                })
                    .then((response) => display())
                    .catch((error) => console.log(error))
            } catch (error) {

            }
        }

        display();
    }

    const display = async (event) => {

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        const cdata = await fetch("http://localhost:3000/cinema");
        const cResp = await cdata.json(); 
        
        let print =
            `<table border="1">
                <tr>
                    <th>Cinema Name</th>
                    <th>Movie Name</th>
                    <th>Movie Desc</th>
                    <th>Movie Poster</th>
                    <th colspan="2">Action</th>
                </tr>
            `

        data.map((v) => {
           const Cinema_Name =  cResp.find((v1) => v1.id === v.cinema);
            print +=
                `<tr>
                    <td>${Cinema_Name?.cinemaname}</td>
                    <td>${v.moviename}</td>
                    <td>${v.moviedesc}</td>
                    <td> <img src= ../image/${v.movie_poster} witdh="20px" height="150px"></td>
                    <td><button onclick="handledelete('${v.id}')">X</button></td>
                    <td><button onclick=handleEdit('${v.id}')>E</button></td>           
                </tr>`
        })

        print += `</table>`

        document.getElementById("moviedisp").innerHTML = print;
    }

    const handledelete = async (id) => {


        try {
            await fetch("http://localhost:3000/movie/" + id, {
                method: "DELETE",

            })
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        } catch (error) {

        }
    }

    const handleEdit = async(id) => {
       
       

        try {

        const response = await fetch("http://localhost:3000/movie/");
        const data = await response.json();

        const obj = data.find((v) => v.id === id);

        document.getElementById("cinema").value = obj.cinema;
        document.getElementById("movie_name").value =obj.moviename;
        document.getElementById("movie_desc").value =obj.moviedesc;
        document.getElementById("poster_img").src = '../image/' +obj.movie_poster
      

        updateId = obj.id;
            
        } catch (error) {
            console.log(error);
        }
        


    }

const handleImage = () => {
    const movie_poster = document.getElementById("movie_poster").files[0].name;

    document.getElementById("poster_img").src =  '../image/' +movie_poster
}

display();
    window.onload = handlecinema

    const movieAdmin = document.getElementById("admin");
    movieAdmin.addEventListener("submit", handlesubmit)