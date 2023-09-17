import devTeamData from '../../data/dev-team-data.json'

export default function handler(req, res) {
    res.status(200).json(devTeamData)
}
