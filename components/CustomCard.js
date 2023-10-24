const CustomCard = ({title, subTitle, icon, content}) => {

    return (
        <div className="card">
            <div className="flex justify-content-between mb-12">
                <h5>{title}</h5>
                <div className="flex align-items-center justify-content-center">
                    <i className={`${icon} text-xl text-primary`}></i>
                </div>
            </div>
            <span className="text-500">{subTitle}</span>
            {content && (
                <div className="mt-3">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

export default CustomCard;
