document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animalTables"); 

    const categories = ["Big Cats", "Dogs", "Big Fish"];
    const baseUrl = "http://localhost:3000/";

    Promise.all(categories.map(category => 
      fetch(baseUrl + encodeURIComponent(category)) 
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => ({ category, data })) 
    ))
    .then(results => {
      results.forEach(({ category, data }, index) => {
        if (!data || data.length === 0) return; 
  
        let tableHTML = `
          <div class="category-header">Table ${index + 1}: ${category}</div>
          <table class="table">
            <tbody>
        `;
  
        data.forEach((animal, i) => {
          if (i % 2 === 0) tableHTML += `<tr>`; 
  
          tableHTML += `
            <td>
              <div class="animal-card">
                <p><strong>Species:</strong> ${animal.Species || "Unknown"}</p>
                <p><strong>Name:</strong> ${animal.Name || "Unknown"}</p>
                <p><strong>Size:</strong> ${animal.Size || "Unknown"}</p>
                <p><strong>Location:</strong> ${animal.Location || "Unknown"}</p>
                <img src="${animal.img || ""}" alt="${animal.Name || "Animal"}">
              </div>
            </td>
          `;
  
          if (i % 2 === 1 || i === data.length - 1) tableHTML += `</tr>`; 
        });
  
        tableHTML += `
            </tbody>
          </table>
        `;
  
        container.innerHTML += tableHTML;
      });
    })
    .catch(error => console.error("Error fetching data:", error));
  });
  