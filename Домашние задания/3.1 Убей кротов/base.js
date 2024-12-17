document.querySelectorAll('.hole').forEach(hole => {
  hole.addEventListener('click', function() {
      let deadElement = document.getElementById('dead');
      let lostElement = document.getElementById('lost');
      if (this.classList.contains('hole_has-mole')) {
          if (deadElement) {
              deadElement.textContent = (parseInt(deadElement.textContent) + 1).toString();
          }
          if (parseInt(deadElement.textContent) === 10) {
              alert('You win');
              deadElement.textContent = '0';
              lostElement.textContent = '0';
          }
      } else {
          if (lostElement) {
              lostElement.textContent = (parseInt(lostElement.textContent) + 1).toString();
          }
          if (parseInt(lostElement.textContent) === 5) {
              alert('You lost');
              deadElement.textContent = '0';
              lostElement.textContent = '0';
          }
      }
  });
});