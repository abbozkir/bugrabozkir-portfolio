import gameSample from '../../data/game-sample.json'

export default function handler(req, res) {
    res.status(200).json(gameSample)
}
