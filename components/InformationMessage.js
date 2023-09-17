import React from 'react';

const InformationMessage = () => {
    return (
        <div className="p-message-wrapper flex align-items-start w-full">
            <div className="mr-3">
                <span className="p-message-icon pi pi-info-circle"></span>
            </div>
            <div>
                <div className="mb-3">
                    <span className="p-message-summary font-bold mr-1">Info:</span>
                    <span className="p-message-detail">Message Content Message Content Mes</span>
                </div>
                <div className="mb-3">
                    <span className="p-message-summary font-bold mr-1">Info:</span>
                    <span className="p-message-detail">Message Content</span>
                </div>
                <div className="mb-3">
                    <span className="p-message-summary font-bold mr-1">Info:</span>
                    <span className="p-message-detail">Message Content</span>
                </div>
            </div>
        </div>
    );
};

export default InformationMessage;
