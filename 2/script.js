(() => {
  const baseCostEl = document.getElementById('baseCost');
  const quantityEl = document.getElementById('quantity');
  const taxRateEl = document.getElementById('taxRate');
  const discountTypeEl = document.getElementById('discountType');
  const discountValueEl = document.getElementById('discountValue');
  const discountValueContainer = document.getElementById('discountValueContainer');
  const shippingEl = document.getElementById('shipping');
  const totalCostEl = document.getElementById('totalCost');
  const breakdownEl = document.getElementById('breakdown');
  const toggleBreakdownEl = document.getElementById('toggleBreakdown');
  const baseTotalEl = document.getElementById('baseTotal');
  const discountAmountEl = document.getElementById('discountAmount');
  const taxAmountEl = document.getElementById('taxAmount');
  const shippingCostEl = document.getElementById('shippingCost');

  // Format numbers as currency
  const formatCurrency = val => val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  // Calculate costs and update UI
  function calculate() {
    const baseCost = Math.max(0, parseFloat(baseCostEl.value) || 0);
    const quantity = Math.max(1, parseInt(quantityEl.value) || 1);
    const taxRate = Math.min(100, Math.max(0, parseFloat(taxRateEl.value) || 0));
    const discountType = discountTypeEl.value;
    const discountValue = Math.max(0, parseFloat(discountValueEl.value) || 0);
    const shipping = Math.max(0, parseFloat(shippingEl.value) || 0);

    const baseTotal = baseCost * quantity;

    // Calculate discount amount
    let discountAmount = 0;
    if(discountType === 'fixed'){
      discountAmount = Math.min(discountValue, baseTotal);
    } else if(discountType === 'percentage'){
      discountAmount = baseTotal * Math.min(discountValue, 100) / 100;
    }

    // Subtotal after discount
    const subtotal = baseTotal - discountAmount;

    // Tax amount (on subtotal)
    const taxAmount = subtotal * taxRate / 100;

    // Final total
    const total = subtotal + taxAmount + shipping;

    // Update UI
    baseTotalEl.textContent = baseTotal.toFixed(2);
    discountAmountEl.textContent = discountAmount.toFixed(2);
    taxAmountEl.textContent = taxAmount.toFixed(2);
    shippingCostEl.textContent = shipping.toFixed(2);
    totalCostEl.textContent = formatCurrency(total);
  }

  // Toggle discount input visibility
  discountTypeEl.addEventListener('change', e => {
    if(e.target.value === 'none'){
      discountValueContainer.style.display = 'none';
      discountValueEl.value = '0';
    } else {
      discountValueContainer.style.display = 'block';
      discountValueEl.min = '0';
      discountValueEl.value = '0';
      discountValueEl.step = e.target.value === 'percentage' ? '0.01' : '0.01';
      if(e.target.value === 'percentage'){
        discountValueEl.max = '100';
      } else {
        discountValueEl.removeAttribute('max');
      }
    }
    calculate();
  });

  // Toggle breakdown display
  toggleBreakdownEl.addEventListener('click', () => {
    if(breakdownEl.style.display === 'none' || breakdownEl.style.display === ''){
      breakdownEl.style.display = 'block';
      toggleBreakdownEl.textContent = 'Hide Cost Breakdown';
    } else {
      breakdownEl.style.display = 'none';
      toggleBreakdownEl.textContent = 'Show Cost Breakdown';
    }
  });

  // Attach inputs listeners
  [baseCostEl, quantityEl, taxRateEl, discountValueEl, shippingEl].forEach(el => {
    el.addEventListener('input', calculate);
  });

  // Initialize
  discountTypeEl.dispatchEvent(new Event('change'));
  calculate();
})();

    