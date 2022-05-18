console.log('client side server is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // to prevent the browser to refresh after submiting

    const location = search.value;   // to get field value

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';     // to clear the paragraph

    fetch('/weather?address=' + location).then((response) => {
        console.log(response, 'response check');
        response.json().then((data) => {
            console.log(data, 'data check')
            if (data.err) {
                console.log(data.err);
                messageOne.textContent = data.err;
            } else{
                messageOne.textContent = data.location; // this helps to show data on the screen(UI) using document.queryselector (id=message-1)
                messageTwo.textContent = data.forecast;
                console.log(data.location, 'location check');
                console.log(data.forecast, 'forecast check');
            }
        })
    })
    })
