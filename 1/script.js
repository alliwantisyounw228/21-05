function calculateSIP() {
  let investment = parseInt(document.getElementById('investment').value);
  let tenure = parseInt(document.getElementById('tenure').value);
  let rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
  let months = tenure * 12;
  let maturity = investment * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
  document.getElementById('maturityAmount').innerText = maturity.toFixed(2);
}

function resetCalculator() {
  document.getElementById('investment').value = 5000;
  document.getElementById('tenure').value = 10;
  document.getElementById('rate').value = 12;

  document.getElementById('investmentValue').innerText = '5000';
  document.getElementById('tenureValue').innerText= '10';
  document.getElementById('rateValue').innerText = '12';
  document.getElementById('maturityAmount').innerText = '0';
}

document.querySelectorAll("input[type='range']").forEach(input => {
    input.addEventListener('input', function(){
        document.getElementById(this.id + 'Value').innerText = this.value;
    });
});