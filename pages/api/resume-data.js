import resumeData from '../../data/resume-data.json'

export default function handler(req, res) {
    res.status(200).json(resumeData)
}
