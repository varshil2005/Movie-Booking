const SelectSeat = [];
const SeatArry = [];

const displaySeat = async() => {
    const cinema_id = localStorage.getItem("cinema_id");
    const movie_id =  localStorage.getItem("movie_id");
    const time = localStorage.getItem("time");

    const timeRes = await fetch("http://localhost:3000/seat");
    const Timedata = await timeRes.json();

    const Cinema_fileter = Timedata.filter((v) => v.cinema_id === cinema_id && v.movie_id === movie_id && v.time === time);
    

    console.log(Cinema_fileter);

    let print  = `<a href ="" class="d-flex text-decoration-none flex-wrap = wrap" >`
    Cinema_fileter.map((v) => {
        v.seat.map((v1 , i) => {
            if (v.seat[i] === 1) {
                print += 

            `<button id = 'seat-${i+1}' class="border p-4 m-2" disabled = true onclick=handleseat('${i+1}','${v.price}','${v.id}')><h1 class="fs-6" >${i+1}</h4></button>
                    
                    `
            SeatArry.push(v1);
            } else {
                print += 

            `<button id = 'seat-${i+1}' class="border p-4 m-2"  onclick=handleseat('${i+1}','${v.price}','${v.id}')><h1 class="fs-6" >${i+1}</h4></button>
                    
                    `
                SeatArry.push(v1);
            }
        })



        
    })

    print += `</a>`

    document.getElementById("current-seat").innerHTML = print

}

const handleseat = async(index,price,id) => {
    event.preventDefault();
  
    const button = document.getElementById(`seat-${index}`);
    if (SelectSeat.includes(index)) {
        SelectSeat.splice(SelectSeat.indexOf(index),1);
        button.style.backgroundColor =""
        console.log(SelectSeat);
    } else{
        SelectSeat.push(index);                
        console.log(SelectSeat);
        button.style.backgroundColor ="green"
    }

    for (let i=0; i<=SeatArry.length; i++) {
        if ((index-1) === i) {
            if (SeatArry[i] === 1) {
                const button = document.getElementById(`seat-${index}`);
                button.style.backgroundColor =""
                SeatArry[i] =0;
                console.log(SeatArry);
            } else {
                
                SeatArry[i] =1;
                console.log(SeatArry);
            }
        } else {
          
        }
    }
    
    let disp ='<div id="display">'

    let total_seat = SelectSeat.length;
    console.log(total_seat * price);


  

    disp += `<span>Total _seat :</span>`
    disp += `<span>${total_seat}</span><br><br><hr>`
    disp += `<span>price :</span>`
    disp += `<span>${price}</span><br><br><hr>`
    disp += `<span>Total_Bill : </span>`
    disp+=`<span>${total_seat*price}</span><br><br><hr>`
    disp += `<button onclick = handlesubmit('${id}','${price}')>Submit</button>`
    disp += `</div>`
    document.getElementById("disp").innerHTML = disp
   
    
}

const handlesubmit = async(id,price) => {
   
    SeatArry.forEach((seat, i) => {
        if (seat === 1) {
            const button = document.getElementById(`seat-${i+1}`);
            button.disabled= true;
        }
    });

    const cinema_id = localStorage.getItem("cinema_id");
    const movie_id =  localStorage.getItem("movie_id");
    const time = localStorage.getItem("time");



    let obj = {
        id : id,
        cinema_id,
        movie_id,
        time,
        price
        
        
    }
 
        
    try {
        await fetch ("http://localhost:3000/seat/"+id,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...obj,seat:SeatArry})
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error) {
        
    }
 
    
     
      window.location.href = "http://127.0.0.1:5500/users/thankyou.html"
    
}



window.onload = () => {
    displaySeat();
};
