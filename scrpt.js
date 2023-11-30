data = [];

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://10.16.14.104/~savannah/data-service/data-service.php");
xhr.responseType = "json";
xhr.onload = function() {
    if (xhr.status === 200) {
        data = this.response;
        
        addEl();
    } else {
        print("File Cannot Be Found");
    }


};
xhr.send();

/**
data2 = [];
let xhr2 = new XMLHttpRequest();
xhr2.open("GET", "http://10.16.14.104/~savannah/cp4/index.php");
xhr2.responseType = "json";
xhr2.onload = function() {
    if (xhr2.status === 200) {
        data2 = this.response;
        
    } else {
        print("File Cannot Be Found");
    }


};
xhr2.send();
*/

function addEl() {
    let spot = document.querySelectorAll('#tb1 td');
    let i = 0;

    //fill in all elements until the lanthanoids
    for (let j = 0 ; j < 56 ;  i++ ) {  // always move i to next spot, but j is conditionally incremented in the if
        if (!spot[i].classList.contains("gap")) {
            spot[i].innerHTML = "<div class='tb1div'><p id='tbchman'>" + data[j].atomic_number + "</p><p id='tbchmsym'>" + data[j].symbol + "</p><p id='tbchmname'>" + data[j].name + "</p><p id='tbchmamu'>" + data[j].atomic_mass + "</p></div>";
            j++;
        }
    }

    //change i to add the lanthanoids
    i = 93
    for (let k = 56 ; k < 71 ;  i++ ) {  // always move i to next spot, but j is conditionally incremented in the if
        if (!spot[i].classList.contains("gap")) {
            spot[i].innerHTML = "<div class='tb1div'><p id='tbchman'>" + data[k].atomic_number + "</p><p id='tbchmsym'>" + data[k].symbol + "</p><p id='tbchmname'>" + data[k].name + "</p><p id='tbchmamu'>" + data[k].atomic_mass + "</p></div>";
            k++;
        }
    }
    
    //change i to add elements after lanthanoids & before the actinoids
    i = 60
    for (let l = 71 ; l < 88 ;  i++ ) {  // always move i to next spot, but j is conditionally incremented in the if
        if (!spot[i].classList.contains("gap")) {
            spot[i].innerHTML = "<div class='tb1div'><p id='tbchman'>" + data[l].atomic_number + "</p><p id='tbchmsym'>" + data[l].symbol + "</p><p id='tbchmname'>" + data[l].name + "</p><p id='tbchmamu'>" + data[l].atomic_mass + "</p></div>";
            l++;
        }
    }
    
    //change i to add the actinoids
    i = 110
    for (let m = 88 ; m < 103 ;  i++ ) {  // always move i to next spot, but j is conditionally incremented in the if
        if (!spot[i].classList.contains("gap")) {
            spot[i].innerHTML = "<div class='tb1div'><p id='tbchman'>" + data[m].atomic_number + "</p><p id='tbchmsym'>" + data[m].symbol + "</p><p id='tbchmname'>" + data[m].name + "</p><p id='tbchmamu'>" + data[m].atomic_mass + "</p></div>";
            m++;
        }
    }
    
    //change i to add whats after the actinoids
    i = 77
    for (let n = 103 ; n < 118 ;  i++ ) {  // always move i to next spot, but j is conditionally incremented in the if
        if (!spot[i].classList.contains("gap")) {
            spot[i].innerHTML = "<div class='tb1div'><p id='tbchman'>" + data[n].atomic_number + "</p><p id='tbchmsym'>" + data[n].symbol + "</p><p id='tbchmname'>" + data[n].name + "</p><p id='tbchmamu'>" + data[n].atomic_mass + "</p></div>";
            n++;
        }
    }
    
    addClicks();
}

function addClicks() {
    // Add click event listeners to elements with the class "tb1div"
    let tb1divs = document.querySelectorAll('.tb1div');
    for (let i = 0; i < tb1divs.length; i++) {
        tb1divs[i].addEventListener("click", tableClickHandler);
    }   

    /*
    // Add click event listeners to the selector buttons 
    // doesn't do anything yet
    let buttons = document.querySelectorAll("button");
    for (let j = 0 ; j < buttons.length ; j++) {
        buttons[j].addEventListener("click", selectorClickHandler);
    }
    */
}

function tableClickHandler() {
    // highlight the element on the table that is clicked, until the next one is clicked
    let tb1divs = document.querySelectorAll('.tb1div');
    for (let d = 0 ; d < tb1divs.length ; d++) {
        tb1divs[d].classList.remove('active-td');
        tb1divs[d].classList.add("td");
    }
    this.classList.add("active-td");
    this.classList.remove("td");

    //adds things to the information table
    let spot = document.querySelectorAll('#tb2 td');
    let atnum = this.querySelector('#tbchman').textContent;
    let datapos = atnum - 1;
    addButtonClick(datapos);

    spot[0].innerHTML = "<td>" + atnum + "</td>";
    spot[1].innerHTML = "<td>" + data[datapos].atomic_mass + "</td>";
    spot[2].innerHTML = "<td>" + data[datapos].phase + "</td>";
    spot[3].innerHTML = "<td>" + data[datapos].electronegativity_pauling + "</td>";
    spot[4].innerHTML = "<td>" + data[datapos].melting_point + "</td>";
    spot[5].innerHTML = "<td>" + data[datapos].boiling_point + "</td>";
    
    // changes the symbol to what was clicked on
    let spot2 = document.querySelector('.symbol');
    
    spot2.innerHTML = "<div class='symbol'><p id='chman'>" + atnum +"</p> <p id='chmsym'>" + data[datapos].symbol + "</p> <p id='chmname'>" + data[datapos].name + "</p> <p id='chmamu'>" + data[datapos].atomic_mass + "</p></div>";


    // Make a GET request to your PHP script
    fetch('http://10.16.14.104/~savannah/cp4/index.php?mode=get&element=' + data[datapos].symbol)
        .then(function (response) { 
                if(!response.ok) {
                    throw new Error("no response");
                } 
                return response.json() }) // Parse the JSON response
        .then(data => {
            // Access the 'Notes' property from the JSON data
            const notes = data.Notes;

            // Update the content of the text box
            let tbp = document.querySelector('#text');
            tbp.value = notes.join("\n");
        })
        .catch((error) => {
            console.log(error);
            let tbp = document.querySelector('#text');
            tbp.value = "";
            //let tbp = document.querySelectorAll('#tblist');
            //tbp[0].innerHTML = "";
        })    ;      
}

function addButtonClick(datapos) {

    let newNote = document.getElementById('text');
    document.getElementById("post").onclick = function() {
        fetch('http://10.16.14.104/~savannah/cp4/index.php?mode=set&element=' + data[datapos].symbol,
        {
            method : "POST",
            body : newNote.value
        })
    };
    newNote.value = "";   //clear the input text box once posted
}