// Create the button
var button = document.createElement("button");
button.textContent = "Extract Data";
button.style.position = "fixed";
button.style.top = "20px";
button.style.right = "20px";
button.style.padding = "10px";
button.style.backgroundColor = "#4169E1";
button.style.color = "#fff";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.zIndex = "111000";

document.body.appendChild(button);

button.addEventListener("click", function () {
  var currentUrl = window.location.href;

  fetch("http://localhost:5000/api/scrapper/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: currentUrl }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch CSV");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `taobao_product_data_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error("Error fetching or downloading CSV:", error);
    });
});
