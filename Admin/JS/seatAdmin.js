let updateID =null;

const handlecinema = async() => {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    let print = `<option value="0">-- Select Cinema --</option>`

    data.map ((v) => {
       
        print += `<option value="${v.id}">${v.cinemaname}</option>`
    })

    document.getElementById("cinema").innerHTML = print
}

const handleMovie = async(cid='', mid=null) => {
    const response = await fetch ("http://localhost:3000/movie");
    const data = await response.json();

    const cinema_id= document.getElementById("cinema").value;


    const Fdata = data.filter((v)=> v.cinema === cinema_id);
    

    let print = `<option value ="0">-- Select Movie --</option>`

    Fdata.map((v1) => {
        print += `<option value= ${v1.id}>${v1.moviename}</option>`
    })

    document.getElementById("movie").innerHTML = print;

    if (mid) {
        document.getElementById("movie").value = mid
    }
}

const handleTime = async(mid='',tid='') => {
    const response = await fetch("http://localhost:3000/time");
    const data = await response.json();

    const movie = document.getElementById("movie").value;
    console.log(movie);
    const Fdata  = data.filter((v) => v.movie_id === movie);
    console.log(Fdata);
     
    let print = `<option value="0">-- Select Time --</option>`

     Fdata.map((v) => {
         v.alltime.map((v1) => {
            print += `<option value=${v1}>${v1}</option>`
         })
     })

     document.getElementById("time").innerHTML = print;

     if (tid) {
        document.getElementById("time").value = tid
    }
}

const handleSubmit = async() => {

     event.preventDefault();

    const cinema= document.getElementById("cinema").value;
    const movie= document.getElementById("movie").value;
    const time= document.getElementById("time").value;
    const seat= document.getElementById("total_seat").value;
    const price= document.getElementById("price").value;

    const arr = Array.from({
        length : seat 
    } , ()=> 0)

    let obj = {
        cinema_id : cinema,
        movie_id :  movie,
        time,
        seat: arr,
        price : price

    }   

    if (updateID) {
        try {
            await fetch("http://localhost:3000/seat/" + updateID, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...obj, id:updateID})
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        } catch (error) {
            
        }
    } else {
        try {
            await fetch("http://localhost:3000/seat", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        } catch (error) {
            
        }
    
    }
    

    
    display();
}

const display = async() => {
    const response = await fetch("http://localhost:3000/seat");
    const data = await response.json();

    const cinemaRes = await fetch("http://localhost:3000/cinema");
    const Cinemadata = await cinemaRes.json();

    const movieRes = await fetch ("http://localhost:3000/movie")
    const Moviedata = await movieRes.json();

    let print = `<table border="1">
    <tr>
        <th>Cinema</th>
        <th>Movie</th>
        <th>Time</th>
        <th>Seat</th>
        <th>price</th>
        <th colspan="2">Action</th>
    </tr>`

    data.map((v) => {
       const Cinemaname= Cinemadata.find((v1) => v1.id ===  v.cinema_id)
    const Moviename = Moviedata.find((v2) => v2.id === v.movie_id);

       
       print +=  `<tr>
        <td>${Cinemaname?.cinemaname}</td>
        <td>${Moviename?.moviename}</td>
        <td>${v.time}</td>
        <td>${v.seat.length}</td>
        <td>${v.price}</td>
        <td><button onclick ="handleDelete('${v.id}')">X</button></td>
        <td><button onclick ="handleEdit('${v.id}')">E</button></td>
    </tr>`
    })

    print +=  `</table>`

    document.getElementById("disp").innerHTML = print;
}

const handleEdit = async(id) => {
    const response = await fetch("http://localhost:3000/seat");
    const data = await response.json();


    const obj = data.find((v) => v.id === id);
    console.log(obj);

    document.getElementById("cinema").value=obj.cinema_id;
document.getElementById("price").value=obj.price;
document.getElementById("total_seat").value= obj.seat.length;

updateID =  obj.id;
handleMovie(obj.cinema_i ,obj.movie_id);
handleTime(obj.movie_id,obj.time);
    
}

const handleDelete = async(id) => {
    try {
        await fetch("http://localhost:3000/seat/" + id , {
            method:"DELETE"
        })
        .then((response) =>display())
        .catch((error) => console.log(error))
    } catch (error) {
        
    }
}



display();

const cinema = document.getElementById("cinema");
cinema.addEventListener("change",handleMovie)

const movie = document.getElementById("movie");
movie.addEventListener("change",handleTime)

const seatForm = document.getElementById("seatForm");
seatForm.addEventListener("submit",handleSubmit)

window.onload = handlecinema