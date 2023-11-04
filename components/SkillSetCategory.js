import {Chip} from 'primereact/chip';

const SkillSetCategory = ({title, skills}) => {

    return (
        <div className="card mb-3" >
            <h5>{title}</h5>
            {skills.map((skill, index) => {
                const skillLevelHighlight = skill.level === 'medium' ? 'opacity-60'
                    : skill.level === 'low' ? 'opacity-30' : '';
                return (
                    <Chip
                        key={index}
                        className={`my-1 mr-1 text-lg bg-primary ${skillLevelHighlight}`}
                        label={skill.title}
                    />
                );
            })}
        </div>
    );
};

export default SkillSetCategory;
