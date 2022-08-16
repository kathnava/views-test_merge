const res = (JSON.parse('<%- JSON.stringify(reservation) %>'));
const queryDepart = (JSON.parse('<%- JSON.stringify(dateDepart) %>'));
const queryRetour = (JSON.parse('<%- JSON.stringify(dateRetour) %>'));
const voiture = (JSON.parse('<%- JSON.stringify(voiture) %>'))


const departInput = document.getElementById('dateDepart');
const retourInput = document.getElementById('dateRetour');
const dateSelect = document.getElementById('selectDate');

const price = document.getElementById('price');
const forfait = document.getElementById('forfait');
const inputPrice = document.getElementById('inputPrice');
const inputForfait = document.getElementById('inputForfait');

departInput.addEventListener('change', () => checkDate())
retourInput.addEventListener('change', () => checkDate())

var departTimeStamp = new Date(departInput.value).getTime() / 1000;
var retourTimeStamp = new Date(retourInput.value).getTime() / 1000;

var dayoftheweekdepart = new Date(departInput.value).getDay();
var dayoftheweekretour = new Date(retourInput.value).getDay();

var dayRange = Math.floor((retourTimeStamp - departTimeStamp) / 86400);

if (res.length >= 1){
    res.map(function(e){
        if( (queryDepart >= e.dateDepart && queryDepart <= e.dateRetour) || (queryRetour >= e.dateDepart && queryRetour <= e.dateRetour) || queryDepart <= e.dateDepart && queryRetour >= e.dateRetour){
            var message = document.createElement('div')
            message.className = ('ui red message')
            message.id = ('selectErrorMessage')
            dateSelect.appendChild(message)
            var messageText = document.createTextNode("Malheureusement cette voiture n'est pas disponible pour vos dates")
            message.appendChild(messageText)
        } else {    
            return true
        }
    })
}

if (price.innerHTML === NaN){
    price.innerHTML = "-"
}

if (dayoftheweekdepart === 6 && dayoftheweekretour === 0 && dayRange <= 7){
    price.innerHTML = voiture.pxWE + "€"
    forfait.innerHTML = "Forfait week-end"
    inputPrice.value = voiture.pxWE
    inputForfait.value = "Forfait week-end"
} else if (dayoftheweekdepart === 1 && dayoftheweekretour === 5 && dayRange <= 7){
    price.innerHTML = voiture.pxLV + "€"
    forfait.innerHTML = "Forfait semaine"
    inputPrice.value = voiture.pxLV
    inputForfait.value = "Forfait semaine"
} else if (dayoftheweekdepart === 1 && dayoftheweekretour === 0 && dayRange <= 7){
    price.innerHTML = voiture.pxWK + "€"
    forfait.innerHTML = "Forfait semaine + week-end"
    inputPrice.value = voiture.pxWK
    inputForfait.value = "Forfait semaine + week-end"
} else if (dayoftheweekdepart === dayoftheweekretour && dayRange === 1){
    price.innerHTML = voiture.pxDD + "€"
    forfait.innerHTML = "Forfait journée"
    inputPrice.value = voiture.pxDD
    inputForfait.value = "Forfait journée"
} else if (dayRange >= 1){
    price.innerHTML = dayRange * voiture.pxDD + "€"
    forfait.innerHTML = "Tarif " + dayRange + " jours" 
    inputPrice.value = dayRange * voiture.pxDD
    inputForfait.value = "Tarif " + dayRange + " jours"
} else if (dayRange === 0){
        price.innerHTML = voiture.pxDD + "€"
        forfait.innerHTML = "Tarif journée" 
        inputPrice.value = voiture.pxDD
        inputForfait.value = "Tarif journée"
} else if (dayRange < 0){
    price.innerHTML = "-"
    forfait.innerHTML = "" 
}

function checkDate(){
    const selectError = document.getElementById('selectErrorMessage');
    const dateError = document.getElementById('dateErrorMessage');

    var dateNow = Math.floor(Date.now() / 1000)

    var departTimeStamp = new Date(departInput.value).getTime() / 1000;
    var retourTimeStamp = new Date(retourInput.value).getTime() / 1000;

    var dayoftheweekdepart = new Date(departInput.value).getDay();
    var dayoftheweekretour = new Date(retourInput.value).getDay();

    var dayRange = Math.floor((retourTimeStamp - departTimeStamp) / 86400);
    console.log(dayRange)

    if (selectError){
        dateSelect.removeChild(selectError)
    }

    if (dateError){
        dateSelect.removeChild(dateError)
    }

    if (res.length >= 1){
        res.map(function(e){
            if( (departTimeStamp >= e.dateDepart && departTimeStamp <= e.dateRetour) || (retourTimeStamp >= e.dateDepart && retourTimeStamp <= e.dateRetour) || departTimeStamp <= e.dateDepart && retourTimeStamp >= e.dateRetour){
                var message = document.createElement('div')
                message.className = ('ui red message')
                message.id = ('selectErrorMessage')
                dateSelect.appendChild(message)
                var messageText = document.createTextNode("Malheureusement cette voiture n'est pas disponible")
                message.appendChild(messageText)
                return false
            } else {        
                return true
            }
        })
    }

    function dateControl(){
        if (document.getElementById('selectErrorMessage')){
            return false
        } else {
            var message = document.createElement('div')
            message.className = ('ui red message')
            message.id = ('selectErrorMessage')
            dateSelect.appendChild(message)
            var messageText = document.createTextNode("Malheureusement cette voiture n'est pas disponible pour vos dates")
            message.appendChild(messageText)
        }
    }

    if (departTimeStamp > retourTimeStamp){
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('dateErrorMessage')
        dateSelect.appendChild(message)
        var messageText = document.createTextNode("La date retour doit être supérieure à la date départ")
        message.appendChild(messageText)  
    } else if (departTimeStamp < dateNow || retourTimeStamp < dateNow){
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('dateErrorMessage')
        dateSelect.appendChild(message)
        var messageText = document.createTextNode("La date doit être supérieure à la date d'aujourd'hui")
        message.appendChild(messageText)
    }

    if (dayoftheweekdepart === 6 && dayoftheweekretour === 0 && dayRange <= 7){
        price.innerHTML = voiture.pxWE + "€"
        forfait.innerHTML = "Forfait week-end"
        inputPrice.value = voiture.pxWE
        inputForfait.value = "Forfait week-end"
    } else if (dayoftheweekdepart === 1 && dayoftheweekretour === 5 && dayRange <= 7){
        price.innerHTML = voiture.pxLV + "€"
        forfait.innerHTML = "Forfait semaine"
        inputPrice.value = voiture.pxLV
        inputForfait.value = "Forfait semaine"
    } else if (dayoftheweekdepart === 1 && dayoftheweekretour === 0 && dayRange <= 7){
        price.innerHTML = voiture.pxWK + "€"
        forfait.innerHTML = "Forfait semaine + week-end"
        inputPrice.value = voiture.pxWK
        inputForfait.value = "Forfait semaine + week-end"
    } else if (dayoftheweekdepart === dayoftheweekretour && dayRange === 1){
        price.innerHTML = voiture.pxDD + "€"
        forfait.innerHTML = "Forfait journée"
        inputPrice.value = voiture.pxDD
        inputForfait.value = "Forfait journée"
    } else if (dayRange >= 1){
        price.innerHTML = dayRange * voiture.pxDD + "€"
        forfait.innerHTML = "Tarif " + dayRange + " jours" 
        inputPrice.value = dayRange * voiture.pxDD
        inputForfait.value = "Tarif " + dayRange + " jours" 
    } else if (dayRange === 0){
        price.innerHTML = voiture.pxDD + "€"
        forfait.innerHTML = "Tarif journée" 
        inputPrice.value = voiture.pxDD
        inputForfait.value = "Tarif journée"
    } else if (dayRange < 0){
        price.innerHTML = "-"
        forfait.innerHTML = "" 
    }
}

$(document).on('submit', "form", async function(e) {
    const selectError = document.getElementById('selectErrorMessage');
    const dateError = document.getElementById('dateErrorMessage');

    if(dateError){
        e.preventDefault()
    } else if (selectError){
        e.preventDefault()
    } 
    // else if (referer !== "http://localhost:8000/homeSearchCar?id=${voiture.id}") {
    //     e.preventDefault()
    // }
})