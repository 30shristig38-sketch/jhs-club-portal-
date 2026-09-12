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

  if (!clubList || clubList.length === 0) {
    grid.innerHTML = '<p>No matching clubs found.</p>';
    return;
  }

  clubList.forEach(club => {
    const name = club['Club Name'] || 'Unnamed Club';
    const type = club['Club Type'] || 'General';
    const category = club['Category'] || 'General';
    const day = club['Meeting Day'] || 'TBD';
    const time = club['Meeting Time'] || 'TBD';
    const sponsor = club['Sponsor Name'] || 'N/A';
    const email = club['Contact Email'] || 'N/A';
    const desc = club['Description'] || 'No description provided.';
    const message = club['Personal Message'] || 'No officer message added yet.';

    const card = document.createElement('div');
    card.className = 'card-container';
    card.onclick = () => card.classList.toggle('flipped');

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div>
            <div>
              <span class="badge badge-red">${type}</span>
              <span class="badge">${category}</span>
              <span class="badge">${day}</span>
            </div>
            <h3>${name}</h3>
            <p><small><strong>Sponsor:</strong> ${sponsor} (${email})</small></p>
            <p><small><strong>Time:</strong> ${time}</small></p>
            <p>${desc}</p>
          </div>
          <small style="color:#888;">Click to flip</small>
        </div>
        <div class="card-back">
          <div>
            <h3>${name}</h3>
            <p><strong>Officer Message:</strong></p>
            <p><em>"${message}"</em></p>
          </div>
          <small style="color:#888;">Click to flip back</small>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterClubs() {
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const selectedType = document.getElementById('type-filter').value;
  const selectedDay = document.getElementById('day-filter').value;

  const filtered = allClubs.filter(club => {
    const name = (club['Club Name'] || '').toLowerCase();
    const desc = (club['Description'] || '').toLowerCase();
    const type = club['Club Type'] || '';
    const day = club['Meeting Day'] || '';

    const matchesSearch = name.includes(searchText) || desc.includes(searchText);
    const matchesType = selectedType === 'All' || type === selectedType;
    const matchesDay = selectedDay === 'All' || day === selectedDay;

    return matchesSearch && matchesType && matchesDay;
  });

  renderClubs(filtered);
}