import componentInformation from '../../../data/component-information.json'

export default function handler(req, res) {
    const {query} = req;
    if (componentInformation[query.componentName]) {
        res.status(200).json(componentInformation[query.componentName])
    } else {
        res.status(404).json({})
    }
}
