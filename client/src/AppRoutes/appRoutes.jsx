// import  {Route,Routes,Outlet,Navigate} from 'react-router-dom';
// import React,{Suspense} from 'react';


// import ProtectedRoute from './ProtectedRoutes'

// const DailyFeed = React.lazy(()  => import('../features/Daily_Mode/DailyFeed'));
// const Login = React.lazy(()=> import('../pages/Login'));
// const Register = React.lazy(()=> import('../pages/Register')); 
// const Lobby = React.lazy(() => import('../lobby/Lobby'));
// // const StoryMode = React.lazy(() => import('../features/StoryMode/StoryMode'));
// const BattleScreen = React.lazy(() => import('../features/StoryMode/Battlescreen.jsx'));
// const RoundSelector = React.lazy(() => import('../features/StoryMode/RoundSelector.jsx'));
// const RoundResult = React.lazy(() => import('../features/StoryMode/RoundResult.jsx'));
// const ChapterComplete = React.lazy(() => import('../features/StoryMode/ChapterComplete.jsx'));
// const StoryProfile = React.lazy(() => import('../features/StoryMode/StoryProfile.jsx'));
// const StoryMode = React.lazy(() => import('../features/StoryMode/StoryMode'));
// const Achievements = React.lazy(() => import('../pages/Achievements'));

// export default function AppRoutes(){
//         return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//                     <Route element={<ProtectedRoute/>}>
//                         <Route path='/dailyFeed' element={<DailyFeed/>}></Route>
//                 <Route path="/" element={<Lobby />}></Route>
//                 <Route path="/lobby" element={<Lobby />}></Route>
//                 <Route path="/story" element={<Suspense fallback={<div>Loading Story Mode...</div>}><StoryMode /></Suspense>} />
//                 <Route path="/story/profile" element={<Suspense fallback={<div>Loading Profile...</div>}><StoryProfile /></Suspense>} />
//                 <Route path="/story/chapter/:chapterId" element={<Suspense fallback={<div>Loading Rounds...</div>}><RoundSelector /></Suspense>} />
//                 <Route path="/story/chapter/:chapterId/complete" element={<Suspense fallback={<div>Loading...</div>}><ChapterComplete /></Suspense>} />
//                 <Route path="/story/round-result" element={<Suspense fallback={<div>Loading Result...</div>}><RoundResult /></Suspense>} />
//                 <Route path="/story/battle/:id" element={<Suspense fallback={<div>Loading Battle...</div>}><BattleScreen /></Suspense>} />
//                     </Route>
//                     <Route path='/story' element={<StoryMode/>}></Route>
//                 <Route path='/achievements' element={<Achievements/>}></Route>
                
                    
//                     <Route path='/login' element={<Login/>}></Route>
//                     <Route path='/register'  element={<Register/>}></Route>
//                 </Routes>
// </Suspense>
//     )
// }

import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

// Achievement Popup
import AchievementPopup from "../features/Achievements/AchievementPopup";
import { ACHIEVEMENTS } from "../features/Achievements/AchievementData";

import ProtectedRoute from './ProtectedRoutes';

const DailyFeed = React.lazy(() => import('../features/Daily_Mode/DailyFeed'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Lobby = React.lazy(() => import('../lobby/Lobby'));

const StoryMode = React.lazy(() => import('../features/StoryMode/StoryMode'));
const BattleScreen = React.lazy(() => import('../features/StoryMode/Battlescreen.jsx'));
const RoundSelector = React.lazy(() => import('../features/StoryMode/RoundSelector.jsx'));
const RoundResult = React.lazy(() => import('../features/StoryMode/RoundResult.jsx'));
const ChapterComplete = React.lazy(() => import('../features/StoryMode/ChapterComplete.jsx'));
const StoryProfile = React.lazy(() => import('../features/StoryMode/StoryProfile.jsx'));

const Achievements = React.lazy(() => import('../pages/Achievements'));

export default function AppRoutes() {
    // ===========================================
// Achievement Popup State
// ===========================================

const [popupAchievement, setPopupAchievement] = useState(null);
// ===============================================
  // LISTEN FOR ACHIEVEMENT EVENTS
  // ===============================================

  useEffect(() => {

    function handleAchievement(event) {

      const achievement = ACHIEVEMENTS.find(

        (item) => item.id === event.detail

      );

      if (!achievement) return;

      setPopupAchievement(achievement);

      setTimeout(() => {

        setPopupAchievement(null);

      }, 3500);

      // cleanup handled by state timeout
    }


    window.addEventListener(
      "achievementUnlocked",
      handleAchievement
    );

    return () => {

      window.removeEventListener(
        "achievementUnlocked",
        handleAchievement
      );

    };

  }, []);

  return (
    <>
    
      <Routes>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Lobby />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/dailyFeed" element={<DailyFeed />} />

          <Route
            path="/story"
            element={
              <Suspense fallback={<div>Loading Story Mode...</div>}>
                <StoryMode />
              </Suspense>
            }
          />

          <Route
            path="/story/profile"
            element={   
              <Suspense fallback={<div>Loading Profile...</div>}>
                <StoryProfile />
              </Suspense>
            }
          />

          <Route
            path="/story/chapter/:chapterId"
            element={
              <Suspense fallback={<div>Loading Rounds...</div>}>
                <RoundSelector />
              </Suspense>
            }
          />

          <Route
            path="/story/chapter/:chapterId/complete"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ChapterComplete />
              </Suspense>
            }
          />

          <Route
            path="/story/round-result"
            element={
              <Suspense fallback={<div>Loading Result...</div>}>
                <RoundResult />
              </Suspense>
            }
          />

          <Route
            path="/story/battle/:id"
            element={
              <Suspense fallback={<div>Loading Battle...</div>}>
                <BattleScreen />
              </Suspense>
            }
          />

          <Route path="/achievements" element={<Achievements />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
       {/* ==========================================
          ACHIEVEMENT POPUP
      ========================================== */}

      <AchievementPopup
        achievement={popupAchievement}
      />
      
    </>
  );
}