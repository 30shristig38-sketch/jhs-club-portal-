let allClubs = [];

window.addEventListener('DOMContentLoaded', function() {
  Papa.parse('clubs.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      allClubs = results.data;
      renderClubs(allClubs);
    },
    error: function(err) {
      console.error('Could not load clubs.csv file.', err);
    }
  });
});

function renderClubs(clubList) {
  const grid = document.getElementById('club-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!clubList || clubList.length === 0) {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.style.padding = '2rem';
    p.textContent = 'No matching clubs found.';
    grid.appendChild(p);
    return;
  }

  clubList.forEach(function(club) {
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
    card.onclick = function() {
      card.classList.toggle('flipped');
    };

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    // Front of Card
    const front = document.createElement('div');
    front.className = 'card-front';

    const frontContent = document.createElement('div');
    
    const badgesDiv = document.createElement('div');
    badgesDiv.style.marginBottom = '6px';
    
    const typeBadge = document.createElement('span');
    typeBadge.className = 'badge badge-red';
    typeBadge.textContent = type;
    
    const catBadge = document.createElement('span');
    catBadge.className = 'badge';
    catBadge.textContent = category;
    
    const dayBadge = document.createElement('span');
    dayBadge.className = 'badge';
    dayBadge.textContent = day;

    badgesDiv.appendChild(typeBadge);
    badgesDiv.appendChild(catBadge);
    badgesDiv.appendChild(dayBadge);

    const h3Front = document.createElement('h3');
    h3Front.style.margin = '0 0 8px 0';
    h3Front.style.color = '#070505';
    h3Front.textContent = name;

    const sponsorP = document.createElement('p');
    sponsorP.style.fontSize = '0.85rem';
    sponsorP.style.color = '#555';
    sponsorP.style.margin = '4px 0';
    sponsorP.innerHTML = '<strong>Sponsor:</strong> ' + sponsor + ' (' + email + ')';

    const timeP = document.createElement('p');
    timeP.style.fontSize = '0.85rem';
    timeP.style.color = '#555';
    timeP.style.margin = '4px 0';
    timeP.innerHTML = '<strong>Time:</strong> ' + time;

    const descP = document.createElement('p');
    descP.style.fontSize = '0.9rem';
    descP.style.marginTop = '10px';
    descP.style.color = '#333';
    descP.style.lineHeight = '1.3';
    descP.textContent = desc;

    frontContent.appendChild(badgesDiv);
    frontContent.appendChild(h3Front);
    frontContent.appendChild(sponsorP);
    frontContent.appendChild(timeP);
    frontContent.appendChild(descP);

    const smallFront = document.createElement('small');
    smallFront.style.color = '#888';
    smallFront.style.display = 'block';
    smallFront.style.textAlign = 'right';
    smallFront.style.marginTop = '10px';
    smallFront.textContent = 'Click to flip';

    front.appendChild(frontContent);
    front.appendChild(smallFront);

    // Back of Card
    const back = document.createElement('div');
    back.className = 'card-back';

    const backContent = document.createElement('div');

    const h3Back = document.createElement('h3');
    h3Back.style.margin = '0 0 10px 0';
    h3Back.style.color = '#d4af37';
    h3Back.textContent = name;

    const msgTitle = document.createElement('p');
    msgTitle.style.fontWeight = 'bold';
    msgTitle.style.fontSize = '0.85rem';
    msgTitle.style.marginBottom = '6px';
    msgTitle.textContent = 'Club Message:';

    const msgP = document.createElement('p');
    msgP.style.fontStyle = 'italic';
    msgP.style.color = '#333';
    msgP.style.borderLeft = '3px solid #d4af37';
    msgP.style.paddingLeft = '10px';
    msgP.style.margin = '0';
    msgP.style.fontSize = '0.9rem';
    msgP.textContent = '"' + message + '"';

    backContent.appendChild(h3Back);
    backContent.appendChild(msgTitle);
    backContent.appendChild(msgP);

    const smallBack = document.createElement('small');
    smallBack.style.color = '#888';
    smallBack.style.display = 'block';
    smallBack.style.textAlign = 'right';
    smallBack.style.marginTop = '10px';
    smallBack.textContent = 'Click to flip back';

    back.appendChild(backContent);
    back.appendChild(smallBack);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    grid.appendChild(card);
  });
}

function filterClubs() {
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');
  const dayFilter = document.getElementById('day-filter');

  const searchText = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedType = typeFilter ? typeFilter.value : 'All';
  const selectedDay = dayFilter ? dayFilter.value : 'All';

  const filtered = allClubs.filter(function(club) {
    const name = (club['Club Name'] || '').toLowerCase();
    const desc = (club['Description'] || '').toLowerCase();
    const type = club['Club Type'] || '';
    const category = club['Category'] || '';
    const day = club['Meeting Day'] || '';

    const matchesSearch = !searchText || name.includes(searchText) || desc.includes(searchText);
    const matchesType = selectedType === 'All' || type === selectedType || category === selectedType;
    const matchesDay = selectedDay === 'All' || day === selectedDay;

    return matchesSearch && matchesType && matchesDay;
  });

  renderClubs(filtered);
}