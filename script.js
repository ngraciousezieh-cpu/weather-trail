async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('result');
    
    // 1. Configuration
    const apiKey = 'be7b1f0fe3a5a9ddc90d74d8cb00fcfc'; // 👈 Put your real key here!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be7b1f0fe3a5a9ddc90d74d8cb00fcfc&units=metric`;

    // 2. Initial UI State
    if (!city) {
        resultDiv.innerHTML = "<p>Please enter a city name!</p>";
        return;
    }
    resultDiv.innerHTML = "<p>Fetching sky data...</p>";

    try {
        // 3. Fetching data using 'await' (Modern & Readable)
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found. Check spelling!");
        }

        const data = await response.json();

        // 4. Update UI with the modern classes from our CSS
        resultDiv.innerHTML = `
            <div class="city-name">${data.name}, ${data.sys.country}</div>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p style="text-transform: capitalize;">${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;

    } catch (error) {
        // 5. Error Handling
        resultDiv.innerHTML = `<p style="color: #ffcccc;">${error.message}</p>`;
    }
}

// Bonus: Allow pressing "Enter" key to search
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
