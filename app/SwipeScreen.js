// // screens/SwipeScreen.js
// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import { collection, getDocs, updateDoc, doc } from "../config/firebase";
// import { db } from "../config/firebase";
// import ProfileCard from "../profileCard";

// const SwipeScreen = ({ user }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     setProfiles(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };

//   const handleLike = async (likedUser) => {
//     await updateDoc(doc(db, "users", likedUser.id), {
//       likes: [...(likedUser.likes || []), user.id],
//     });
//     checkMatch(likedUser);
//     setCurrentIndex(currentIndex + 1);
//   };

//   const handleSkip = () => {
//     setCurrentIndex(currentIndex + 1);
//   };

//   const checkMatch = async (likedUser) => {
//     if (likedUser.likes?.includes(user.id)) {
//       await updateDoc(doc(db, "users", user.id), {
//         MatchesScreen: [...(user.MatchesScreen || []), likedUser.id],
//       });
//       await updateDoc(doc(db, "users", likedUser.id), {
//         MatchesScreen: [...(likedUser.MatchesScreen || []), user.id],
//       });
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {profiles.length > 0 && currentIndex < profiles.length ? (
//         <ProfileCard user={profiles[currentIndex]} onLike={handleLike} onSkip={handleSkip} />
//       ) : (
//         <Text>No more profiles</Text>
        
//       )
//       }
      
//     </View>
//   );
// };

// export default SwipeScreen;
// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "./config/firebase";
// import ProfileCard from "../app/profileCard";

// const SwipeScreen = ({ user }) => {
//   console.log("🟢 SwipeScreen Mounted"); // ✅ Check if component is rendering

//   const [profiles, setProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     console.log("📡 Calling fetchProfiles...");
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     try {
//       console.log("📡 Fetching profiles from Firestore...");
//       const querySnapshot = await getDocs(collection(db, "users"));

//       const profilesData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       console.log("✅ Profiles fetched:", profilesData);

//       if (profilesData.length === 0) {
//         console.warn("⚠️ No profiles found in Firestore!");
//       }

//       setProfiles(profilesData);
//     } catch (error) {
//       console.error("❌ Error fetching profiles:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>🔥 Swipe Screen Loaded</Text>
//       {profiles.length > 0 && currentIndex < profiles.length ? (
//         <ProfileCard user={profiles[currentIndex]} onLike={() => {}} onSkip={() => setCurrentIndex(currentIndex + 1)} />
//       ) : (
//         <Text>No more profiles</Text>
//       )}
//     </View>
//   );
// };

// export default SwipeScreen;
