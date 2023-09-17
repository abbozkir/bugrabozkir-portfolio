import satelliteInformation from '../../data/satellite-information.json'

export default function handler(req, res) {
    res.status(200).json(satelliteInformation)
}
