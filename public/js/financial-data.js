
  const fromDateInput = document.querySelector('#fromDate');
  const toDateInput = document.querySelector('#toDate');

  let fromDate = fromDateInput.value;
  let toDate = toDateInput.value;
  let chart;
// let fromDate = '2013-09-01';
// let toDate = '2014-09-01';
// console.log(fromDate);
// console.log(toDate);
// console.log(fromDateInput);
// console.log(toDateInput);
let currency = 'USD';

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`;


let searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => { 
    chart.destroy()
    update()});


fromDateInput.addEventListener('change', (e) => {
    fromDate = e.target.value
})

toDateInput.addEventListener('change', (e) => {
    toDate = e.target.value
})


function printTheChart(stockData) {


  const stockDates = Object.keys(stockData.data.bpi);
  const stockPrices = Object.values(stockData.data.bpi);
 

  const ctx = document.getElementById('my-chart').getContext('2d');
   chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(64, 68, 165)',
          borderColor: 'rgba(0, 0, 0)',
          borderWidth: 1,
          data: stockPrices
        }
      ]
    }
  }); 
} 

function update() {
    
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`)
    .then(responseFromAPI => printTheChart(responseFromAPI))
    .catch(err => console.log('Error while getting the data: ', err));
 
    }

update()

