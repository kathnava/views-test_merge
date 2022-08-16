const departInput = document.getElementById('dateDepart');
const retourInput = document.getElementById('dateRetour');
const dateForm = document.getElementById('searchForm');

departInput.addEventListener('change', () => checkDate())
retourInput.addEventListener('change', () => checkDate())

function checkDate(){
    const dateError = document.getElementById('dateErrorMessage');
    var dateNow = Math.floor(Date.now() / 1000)
    var departTimeStamp = new Date(departInput.value).getTime() / 1000;
    var retourTimeStamp = new Date(retourInput.value).getTime() / 1000;

    if (dateError){
        dateForm.removeChild(dateError)
    }

    if (departTimeStamp < dateNow || retourTimeStamp < dateNow || departTimeStamp > retourTimeStamp){
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('dateErrorMessage')
        dateForm.appendChild(message)
        var messageText = document.createTextNode("Un problème est survenu dans vos dates")
        message.appendChild(messageText)
    }
}

$(document).on('submit', "form", async function(e) {
    const dateError = document.getElementById('dateErrorMessage');

    if(dateError){
        e.preventDefault()
    }
})