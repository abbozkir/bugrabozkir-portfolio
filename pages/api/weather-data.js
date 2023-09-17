import weatherData from '../../data/weather-data.json'

export default function handler(req, res) {
    res.status(200).json(weatherData)
}
