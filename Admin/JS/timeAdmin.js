let updateID= null;

const handlecinema = async () => {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    let print = '<option value="0">-- Select Cinema --</option>'

    data.map((v) => {
        print += `<option value="${v.id}">${v.cinemaname}</option>`
    })

    document.getElementById("cinema").innerHTML = print

}



const handlemovie = async(cid='', mid='') => {
   const cinema_id = document.getElementById("cinema").value;


   const response = await fetch("http://localhost:3000/movie");
   const data = await response.json();


   const Fdata = data.filter((v) => v.cinema === cinema_id);
   
   let print = '<option value="0">-- Select Cinema --</option>'

   Fdata.map((v) => {
        print += `<option value="${v.id}">${v.moviename}</option>`
    })

    document.getElementById("movie").innerHTML = print

    if (mid) {
        document.getElementById("movie").value = mid
    }

}



const handleIncre = (event, val='') => {

    event.preventDefault();
    const mainDiv = document.getElementById("all-time")

    const rn = Math.floor(Math.random()*1000);
   

    const div1 = document.createElement("div");
    div1.setAttribute("id",`row-${rn}`);

    const input1= document.createElement("input");
    input1.setAttribute("type",'time');
    input1.setAttribute("name", "m_time");
    input1.setAttribute("value", val);

    div1.appendChild(input1);

    const btn1 = document.createElement("button")
    btn1.setAttribute("onclick",`handleIncre(event)`);
    const btn1text = document.createTextNode("+")

    btn1.appendChild(btn1text)

    div1.appendChild(btn1)


    if (mainDiv.childNodes.length >= 1) {
        const btn2 = document.createElement("button")
        btn2.setAttribute("onclick",`handledrce(${rn})`);
        const btn2text = document.createTextNode("-");
    
        btn2.appendChild(btn2text);
        div1.appendChild(btn2);
    }

    

    
    mainDiv.append(div1);
    

}

const handledrce = (rn) => {
     const deletelem = `row-${rn}`
     const divelement = document.getElementById(deletelem)
    const elem= document.getElementById("all-time");
    elem.removeChild(divelement);
} 

const handleSubmit = async() => {
    const cinema_id = document.getElementById("cinema").value;
    const movie_id = document.getElementById("movie").value;

    const alltime = [];
    const m_time = document.getElementsByName("m_time");

    for (let i=0; i<m_time.length; i++) {
        alltime.push(m_time[i].value)
    }

    console.log(alltime);

    let obj = {
        cinema_id : cinema_id,
        movie_id,
        alltime
    }

    if (updateID) {
        try {
            await fetch("http://localhost:3000/time/" +updateID, {
                method : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...obj , id : updateID})
            })
            .then((response) => display())
            .catch((error) => console.log(error))
        } catch (error) {
            
        }
    } else {
        try {
            await fetch("http://localhost:3000/time", {
                method : "POST",
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

const display = async(obj) => {
    const response = await fetch("http://localhost:3000/time");
    const data = await response.json();

    const m_Resp = await fetch("http://localhost:3000/movie");
    const m_data = await m_Resp.json();

    const cdata = await fetch("http://localhost:3000/cinema");
    const cResp = await cdata.json(); 

    let print = `
    <table border="1">
    <tr>
        <th>Cinema</th>
        <th>Movie</th>
        <th>Time</th>
        <th colspan="2">Action</th>
    </tr>
    `

    data.map ((v) => {

        const m_name =m_data.find((v1) => v1.id === v.movie_id)
        const Cinema_Name =  cResp.find((v2) => v2.id === v.cinema_id);

        print += 

         `
         <tr>
            <td>${Cinema_Name?.cinemaname}</td>
            <td>${m_name?.moviename}</td>
             <td>${v.alltime}</td>
            <td><button onclick="handleDelete('${v.id}')">X</button></td>
            <td><button onclick="handleEdit(event, '${v.id}')">E</button></td>
         </tr>
         `
    })

    print += `</table>`

    document.getElementById("disp").innerHTML=print;
}

const handleDelete = async(id) => {
    try {
        await fetch("http://localhost:3000/time/" + id, {
            method:"DELETE",
           
        })
        .then((response)=>console.log(response))
        .catch((error) => console.log(error))
    } catch (error) {
        
    }

   
}

const handleEdit = async(event, id) => {
  const response = await fetch("http://localhost:3000/time");
    const data = await response.json();

        const obj = data.find((v) => v.id === id);
    
    
    document.getElementById("cinema").value= obj.cinema_id;
    updateID =  obj.id;

    handlemovie(obj.cinema_i ,obj.movie_id);

    console.log(obj.alltime);

    document.getElementById("all-time").innerHTML=""

    for (let i=0; i<obj.alltime.length; i++) {
            handleIncre(event, obj.alltime[i]);
    }
    
    
    

}

display();

const cinema = document.getElementById("cinema");
cinema.addEventListener("change",handlemovie)


const timeForm = document.getElementById("timeForm")
timeForm.addEventListener("submit", handleSubmit)

window.onload = handlecinema
