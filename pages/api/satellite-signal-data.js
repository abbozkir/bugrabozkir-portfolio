import satelliteSignalData from '../../data/satellite-signal-data.json'

export default function handler(req, res) {
    res.status(200).json(satelliteSignalData)
}
