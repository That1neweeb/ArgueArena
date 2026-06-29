import "./AchievementPopup.css";

export default function AchievementPopup({ achievement }) {

    if (!achievement) return null;

    return (

        <div className="achievement-popup">

            <div className="popup-icon">
                {achievement.icon}
            </div>

            <div>

                <div className="popup-title">
                    Achievement Unlocked!
                </div>

                <div className="popup-name">
                    {achievement.title}
                </div>

                <div className="popup-xp">

                    +{achievement.xp} XP

                </div>

            </div>

        </div>

    );

}