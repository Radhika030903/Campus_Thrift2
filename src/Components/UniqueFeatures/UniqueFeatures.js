import React from 'react';
import uniqueFeaturesImage from '../../assets/images/unique-features.jpg';
import './UniqueFeatures.css';

function UniqueFeatures() {
    return (
        <div className="uniqueFeatures">
            <h2>What makes us unique</h2>
            <p className="subtitle">Student, student and ONLY student. We are dedicated to give that effortless platform where only student RULES.</p>

            <img src={uniqueFeaturesImage} alt="Unique Features" className="uniqueFeaturesImage" />

            <div className="features">
                <div className="feature">
                    <div className="icon campus"></div>
                    <h3>Make deals within your campus</h3>
                    <p>You don't need to go far from your college campus. Ab Campus Me Bikega</p>
                </div>

                <div className="feature">
                    <div className="icon trust"></div>
                    <h3>Trusted Purchase</h3>
                    <p>Awesome! You are dealing with your college mate or any other near you.</p>
                </div>

                <div className="feature">
                    <div className="icon products"></div>
                    <h3>Multiple Products in a Single Ad.</h3>
                    <p>You have books, notes, stationery, bikes to sell. Don't worry you can add these all items in a Single Ad.</p>
                </div>
            </div>
        </div>
    );
}

export default UniqueFeatures;