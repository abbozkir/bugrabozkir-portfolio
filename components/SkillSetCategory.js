import {Chip} from 'primereact/chip';

const SkillSetCategory = (props) => {
    const {title, skills} = props;

    return (
        <div className="card mb-3">
            <h5>{title}</h5>
            {skills.map((skill) => (
                <Chip
                    className='my-1 mr-1 bg-primary text-primary text-lg'
                    label={skill}
                />
            ))}
        </div>
    );
};

export default SkillSetCategory;
