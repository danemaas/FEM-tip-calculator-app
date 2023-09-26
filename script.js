const list = document.querySelectorAll('.tip-item');
const billValue = document.getElementById('billValue');
const peopleCount = document.getElementById('peopleCount');
const resetBtn = document.getElementById('resetBtn');
const customTip = document.getElementById('customTip');
let totalTip = 0, tipPerPerson = 0;

list.forEach((item) => {
    item.addEventListener('click', () => {
        list.forEach((li) => {
            li.classList.add('tip-item');
            li.classList.remove('active');
        });
        item.classList.add('active');
        item.classList.remove('tip-item');
        customTip.value = ''; // Clear the custom tip input

        if(billValue.value == "") {
            document.getElementById('errorMsg1').classList.remove('d-none');
        }
        if(peopleCount.value =="") {
            document.getElementById('errorMsg2').classList.remove('d-none');
        }
        if (billValue.value != "" && peopleCount.value != "") {
            document.getElementById('errorMsg1').classList.add('d-none');
            document.getElementById('errorMsg2').classList.add('d-none');
            calculateTip();
        }
    });
});

resetBtn.addEventListener('click', () => {
    location.reload();
});

// Add an event listener to the custom tip input
customTip.addEventListener('input', () => {
    list.forEach((item) => {
      item.classList.remove('active');
      item.classList.add('tip-item');
    });
    calculateTip();
  });

// Function to calculate and update the tip amount
function calculateTip() {
    // Get the bill amount
    const billAmount = parseFloat(billValue.value);
    const numberOfPeople = parseInt(peopleCount.value);

    // Check if a predefined tip percentage is selected
    let customTipPercentage = 0;
    list.forEach((tip) => {
      if (tip.classList.contains('active')) {
        customTipPercentage = parseFloat(tip.textContent.split('%')[0]);
      }
    });
  
    // If a custom tip is entered, use that value instead
    if (customTip.value !== '') {
      customTipPercentage = parseFloat(customTip.value);
    }

    const totalTip = (billAmount * customTipPercentage / 100);
    const tipPerPerson = (totalTip / numberOfPeople);

    const totalBillWithTip = (billAmount / numberOfPeople) + tipPerPerson;
  
    document.getElementById('tipAmt').innerHTML = Math.floor(tipPerPerson * 100) / 100;
    document.getElementById('totalAmt').innerHTML = totalBillWithTip.toFixed(2);
}
