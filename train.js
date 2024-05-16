
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trainForm");
  const trainNameInput = document.getElementById("trainName");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const trainName = trainNameInput.value.trim();
    if (!trainName) {
      errorDiv.textContent = "Please enter a train name.";
      return;
    }

    const url = "https://trains.p.rapidapi.com/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a73a0e366fmsh1f8dd8ce0d2becap14dcbcjsn11699d1d3a41",
        "X-RapidAPI-Host": "trains.p.rapidapi.com",
      },
      body: JSON.stringify({ search: trainName }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      console.log(data); // Log the response to see its structure

      if (Array.isArray(data) && data.length > 0) {
        const newTab = window.open("", "_blank");

        let htmlContent = `<div style="padding: 10px; color: #333;">`;

        data.forEach((train) => {
          // Ensure data object exists and has necessary properties
          if (train && train.data) {
            htmlContent += `<div style="background-color: #fff; padding: 10px; margin-bottom: 20px;">
              <p style="color: blue;">Train Number: ${train.train_num}</p>
              <p style="color: blue;">Name: ${train.name}</p>
              <p style="color: blue;">From: ${train.train_from}</p>
              <p style="color: blue;">To: ${train.train_to}</p>
              <p style="color: blue;">Departure Time: ${train.data.departTime}</p>
              <p style="color: blue;">Arrival Time: ${train.data.arriveTime}</p>
            </div>`;
          } else {
            console.warn("Unexpected train data structure", train);
          }
        });

        htmlContent += "</div>";

        newTab.document.open();
        newTab.document.write(htmlContent);
        newTab.document.close();
      } else {
        errorDiv.textContent = "Train not found.";
      }
      errorDiv.textContent = "";
    } catch (error) {
      errorDiv.textContent = "Error fetching train information.";
      console.error(error);
    }
  });
});







     





