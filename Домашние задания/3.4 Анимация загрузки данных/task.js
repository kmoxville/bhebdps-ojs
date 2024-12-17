(() => {

    const LOCAL_KEY = 'valute_data';
    const CURRENCIES_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
  
    const loader = document.getElementById('loader');
    const items = document.getElementById('items');
  
    function loadCurrencies(currencies) {
      items.innerHTML = Object.keys(currencies).map(key => {
        const currency = currencies[key];
        const value = currency.Value / (currency.Nominal == 0 ? 1 : currency.Nominal);

        return `
        <div class="item">
          <div class="item__code">${currency.CharCode}</div>
          <div class="item__value">${value.toFixed(4)}</div>
          <div class="item__currency">руб.</div>
        </div>
      `}).join('');
    }
  
    fetch(CURRENCIES_URL)
      .then(response => {
        if (!response.ok)
          throw new Error(response.statusText);
        
        return response.json();
      })
      .then(data => {
        loadCurrencies(data.response.Valute);
        loader.classList.remove('loader_active');
      });
  
  })();