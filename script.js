
const defaultElementContainer = document.getElementById("element-container")

const insertText = (id, text) => {
    const e = document.getElementById(id)
    switch (id) {
        case 'location':
            e.textContent = text
            break
        case 'main-temperature':
            e.textContent = text
            break
        case "weather-main":
            e.textContent = text
            break
        case 'feels-like':
            e.textContent = text
            break 
        case 'humidity':
            e.textContent = `Feels Like: ${text}`
            break
        case 'wind':
            e.textContent = `Wind: ${text}`
            break
        case 'wind-gust':
            e.textContent = `Gusts: ${text}`
            break
        case 'weather-icon':
            e.setAttribute("src", text)
    } 
    
}

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

async function showWeather(city) {
    try {
        const data = await getWeather(city)
        const weatherData = normalizeData(data)

        const elems = document.querySelectorAll(".weather-output")

        elems.forEach((e)=> {
            const field = getElementFieldById(e.id)
            const value = weatherData[field] ? weatherData[field] : "N/A"
            insertText(e.id, value)
        })
        const container = document.getElementById("element-container")
        container.style.display = "block"
    } catch {
        alert("Something went wrong, please try again later")
    }
}

const normalizeData = (data) => {
    const weatherData = {}
    for (const [key, value] of Object.entries(data)) {
        if (key === "weather") {
            Object.assign(weatherData, value[0])
        } else if (key === "main" || key === "wind") {
            Object.assign(weatherData, value)
        } else {
            weatherData[key] = value
        }
    }
    return weatherData;
}

const getElementFieldById = (field) => {
    switch (field) {
        case "main-temperature":
            return "temp"
        case "feels-like":
            return "feels_like"
        case "humidity":
            return "humidity"
        case "wind":
            return "speed"
        case "wind-gust":
            return "gust"
        case "weather-main":
            return "main"
        case "location":
            return "name"
        case "weather-icon":
            return "icon"
        default:
            return null;
    }
}

const getWeatherBtn = document.getElementById("get-weather-btn");
getWeatherBtn.addEventListener("click", async (event) => {
    const city = document.getElementById("city").value
    if (city) {
        await showWeather(city);
    };
})