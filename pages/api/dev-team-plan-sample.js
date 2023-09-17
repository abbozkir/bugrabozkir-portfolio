import devTeamPlanSample from '../../data/dev-team-plan-sample.json'

export default function handler(req, res) {
    res.status(200).json(devTeamPlanSample)
}
