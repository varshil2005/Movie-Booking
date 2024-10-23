let updateId = null;

const handlesubmit = async () => {
    event.preventDefault()
    const cinemaname = document.getElementById("cinemaname").value;
    const cinemadesc = document.getElementById("cinemadesc").value;
    const cinemaaddress = document.getElementById("cinemaaddress").value
    const mobilenumber = document.getElementById("mobilenumber").value
    const email = document.getElementById("email").value

    const obj = {
        cinemaname: cinemaname,
        cinemadesc,
        cinemaaddress,
        mobilenumber,
        email
    }

    if (updateId) {
        try {
            await fetch("http://localhost:3000/cinema/" + updateId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...obj, id: updateId })
            })

                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error.message);
        }
    } else {
        try {


            await fetch("http://localhost:3000/cinema", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })

                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error.message);
        }
    }


    display();
}

const display = async () => {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    let print =
        ` <table border="1">
        <tr>
            <th>Cinema Name</th>
            <th>Cinema Desc</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Email</th>
            <th colspan ="2">Action</th>
        </tr>`

    data.map((v) => {
        print +=
            `<tr>
                        <td>${v.cinemaname}</td>
                        <td>${v.cinemadesc}</td>
                        <td>${v.cinemaaddress}</td>
                        <td>${v.mobilenumber}</td>
                        <td>${v.email}</td>
                        <td><button onclick=handleEdit('${v.id}')>E</button></td>  
                        <td><button onclick="handledelete('${v.id}')">X</button></td>
                    </tr>`
    })

    print += `</table>`

    document.getElementById("displaycinema").innerHTML = print;

}

const handledelete = async (id) => {
    try {
        await fetch("http://localhost:3000/cinema/" + id, {
            method: "DELETE"

        })

            .then((response) => display())
            .catch((error) => console.log(error))
    } catch (error) {

    }
}

const handleEdit = async (id) => {

    try {
        const response = await fetch("http://localhost:3000/cinema/");
        const data = await response.json();

        const obj = data.find((v) => v.id === id);

        document.getElementById("cinemaname").value = obj.cinemaname;
        document.getElementById("cinemadesc").value = obj.cinemadesc;
        document.getElementById("cinemaaddress").value = obj.cinemaaddress
        document.getElementById("mobilenumber").value = obj.mobilenumber
        document.getElementById("email").value = obj.email

        updateId = obj.id;
    } catch (error) {
        console.log(error);
    }


}

const handleclick = (evt, Adminmenu) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Adminmenu).style.display = "block";
    // evt.currentTarget.className += " active";
}





display();
const cinemaform = document.getElementById("cinemaform");
cinemaform.addEventListener("submit", handlesubmit);