document.addEventListener('DOMContentLoaded', function () {
  var incomeInput = document.getElementById('income');
  var statusSelect = document.getElementById('status');
  var calculateBtn = document.getElementById('calculateBtn');
  var resultSection = document.getElementById('result');
  var taxAmountEl = document.getElementById('taxAmount');
  var effectiveRateEl = document.getElementById('effectiveRate');
  var errorMsgEl = document.getElementById('errorMsg');

  calculateBtn.addEventListener('click', function () {
    var income = parseFloat(incomeInput.value);
    var status = statusSelect.value;

    if (isNaN(income) || income < 0) {
      resultSection.hidden = true;
      errorMsgEl.hidden = false;
      return;
    }

    errorMsgEl.hidden = true;

    var tax = calculateTax(income, status);
    var rate = calculateEffectiveRate(income, status);

    taxAmountEl.textContent = '$' + tax.toFixed(2);
    effectiveRateEl.textContent = rate + '%';
    resultSection.hidden = false;
  });
});
