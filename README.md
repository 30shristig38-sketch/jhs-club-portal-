# jhs-club-portal-

> This is the Jordan High School Club Portal! In this website, you can access all the clubs that are located in JHS. Search for a club, or select one of the dropdowns t explore new clubs that are located on the campus. Contact information, meeting times, and descriptions for each club are place inside each club card. If the selected club chose to, you may click on the card and an officer message will be displayed that provides further insight into the club. Good Luck!

> **For Admin:** To change or update the website with new clubs, simply change the clubs.csv file and the website will automatically update!

> **For History:** This repository is the finalized version of the club portal. The initial stages of development, design, and experimentation were conducted within a separate private development environment. This public repository was established to host the polished codebase and manage the deployment securely.

> ---

## Why I Built This

At my school, finding up-to-date information about club meeting times, sponsors, and descriptions was surprisingly frustrating. Most details were scattered across paper flyers in hallways, buried in old emails, or hidden inside massive spreadsheets. 

I created this interactive directory to solve that problem—giving students a clean, single place to browse clubs, filter by meeting days or categories, and view officer notes in real time.

---

## Features

* **Instant Search:** Dynamic keyword filtering across club names and descriptions.
* **Category & Schedule Filters:** Sort clubs by type (i.e.: Academic, Service) or meeting days.
* **Interactive Flip Cards:** The front of the card displays key meeting logistics and clicking the card flips it over to show a personal message or announcement from club leaders.
* **CSV Data Integration:** Dynamically loads club data directly from a `.csv` file without requiring a manually coded database.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Libraries:** [PapaParse](https://www.papaparse.com/) for fast, browser-side CSV parsing

---

## What I Learned & Challenges Overcame

* **Asynchronous Data Handling:** Working with PapaParse helped me understand asynchronous execution in JavaScript—ensuring data is fully loaded and parsed before triggering UI renders.
* **DOM Manipulation:** Building components dynamically using vanilla JS DOM methods rather than relying on external frameworks like React.
* **UX/UI Design:** Designing intuitive card flip interactions using modern CSS transform rules while ensuring fallback defaults for missing CSV fields.

---

## How to Run Locally

1. Clone this repository:
   ```bash
   git clone [https://github.com/your-username/club-directory.git](https://github.com/your-username/club-directory.git)
