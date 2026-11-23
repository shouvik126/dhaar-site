/* ==========================================================================
   Dhaar - Interactive Scripting & Dynamic Financial Calculator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile nav when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Loan Calculator Engine
  const calcAmount = document.getElementById('calc-amount');
  const calcRate = document.getElementById('calc-rate');
  const calcTenure = document.getElementById('calc-tenure');
  const calcType = document.getElementById('calc-type');
  const calcFreq = document.getElementById('calc-frequency');

  const resultEmi = document.getElementById('res-emi');
  const resultInterest = document.getElementById('res-interest');
  const resultTotal = document.getElementById('res-total');
  const resultFee = document.getElementById('res-fee');

  function calculateLoan() {
    if (!calcAmount || !calcRate || !calcTenure || !calcType) return;

    const principal = parseFloat(calcAmount.value) || 0;
    const annualRate = parseFloat(calcRate.value) || 0;
    const tenureMonths = parseInt(calcTenure.value, 10) || 1;
    const method = calcType.value; // 'reducing' or 'flat'
    const frequency = calcFreq ? calcFreq.value : 'monthly'; // 'monthly', 'weekly', 'daily'

    let periodsPerYear = 12;
    let totalPeriods = tenureMonths;

    if (frequency === 'weekly') {
      periodsPerYear = 52;
      totalPeriods = Math.round(tenureMonths * 4.333);
    } else if (frequency === 'daily') {
      periodsPerYear = 365;
      totalPeriods = Math.round(tenureMonths * 30);
    }

    let installmentAmount = 0;
    let totalInterest = 0;
    let totalPayable = 0;

    if (principal > 0 && totalPeriods > 0) {
      if (method === 'flat') {
        // Flat rate calculation
        const years = totalPeriods / periodsPerYear;
        totalInterest = principal * (annualRate / 100) * years;
        totalPayable = principal + totalInterest;
        installmentAmount = totalPayable / totalPeriods;
      } else {
        // Reducing balance EMI calculation
        const periodicRate = (annualRate / 100) / periodsPerYear;
        if (periodicRate === 0) {
          installmentAmount = principal / totalPeriods;
          totalInterest = 0;
          totalPayable = principal;
        } else {
          const factor = Math.pow(1 + periodicRate, totalPeriods);
          installmentAmount = (principal * periodicRate * factor) / (factor - 1);
          totalPayable = installmentAmount * totalPeriods;
          totalInterest = totalPayable - principal;
        }
      }
    }

    // Assumed processing fee 1.5%
    const processingFee = principal * 0.015;

    // Currency Formatter
    const formatCurrency = (val) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(Math.round(val));
    };

    if (resultEmi) resultEmi.textContent = formatCurrency(installmentAmount);
    if (resultInterest) resultInterest.textContent = formatCurrency(totalInterest);
    if (resultTotal) resultTotal.textContent = formatCurrency(totalPayable);
    if (resultFee) resultFee.textContent = formatCurrency(processingFee);
  }

  // Attach event listeners to calculator inputs
  const calcInputs = [calcAmount, calcRate, calcTenure, calcType, calcFreq];
  calcInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateLoan);
      input.addEventListener('change', calculateLoan);
    }
  });

  // Initial calculation
  calculateLoan();
});
