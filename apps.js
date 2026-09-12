let allClubs = [];

window.addEventListener('DOMContentLoaded', () => {
  Papa.parse('clubs.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      allClubs = results.data;
      renderClubs(allClubs);
    },
    error: function(err) {
      console.error("Could not load clubs.csv file.", err);
    }
  });
});

function renderClubs(clubList) {
  const grid = document.getElementById('club-grid');
  grid.innerHTML = '';
  clubList.forEach(club => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.onclick = () => card.classList.toggle('flipped');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <h3>${club['Club Name']}</h3>
          <p>${club['Description']}</p>
        </div>
        <div class="card-back">
          <p>"${club['Personal Message']}"</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
