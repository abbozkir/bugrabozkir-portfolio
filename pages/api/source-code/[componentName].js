import sourceCodeData from '../../../data/source-code-data.json'

export default function handler(req, res) {
  const { query } = req;
  if (sourceCodeData[query.componentName]) {
    res.status(200).json(sourceCodeData[query.componentName])
  } else {
    res.status(404).json({})
  }
}
