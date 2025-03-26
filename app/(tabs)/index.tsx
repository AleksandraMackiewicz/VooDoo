// import React, { useEffect, useState } from "react";
// import { View, Text, Button } from "react-native";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "../config/firebase";
// import { useRouter } from "expo-router";
// import ProfileCard from "../profileCard";

// const SwipeScreen = () => {
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();
//   const user = { id: "currentUserId", name: "John Doe", MatchesScreen: [] }; // Simulated user

//   useEffect(() => {
//     console.log("📡 SwipeScreen mounted");
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     try {
//       console.log("📡 Fetching profiles from Firestore...");
  
//       const querySnapshot = await getDocs(collection(db, "Users"));
//       const profilesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
//       console.log("✅ Profiles fetched:", profilesData); // Debugging log
  
//       if (profilesData.length === 0) {
//         console.warn("⚠️ No profiles found in Firestore!");
//       }
  
//       setProfiles(profilesData);
//     } catch (error) {
//       console.error("❌ Error fetching profiles:", error);
//     }
//   };

//   const handleLike = async (likedUser: any) => {
//     try {
//       console.log(`👍 Liked user: ${likedUser.id}`);
//       await updateDoc(doc(db, "Users", likedUser.id), {
//         likes: [...(likedUser.likes || []), user.id],
//       });
//       checkMatch(likedUser);
//       setCurrentIndex(currentIndex + 1);
//     } catch (error) {
//       console.error("❌ Error updating likes:", error);
//     }
//   };

//   const handleSkip = () => {
//     setCurrentIndex(currentIndex + 1);
//   };

//   const checkMatch = async (likedUser: any) => {
//     try {
//       console.log(`🤝 Checking match with user: ${likedUser.id}`);
//       if (likedUser.likes?.includes(user.id)) {
//         await updateDoc(doc(db, "Users", user.id), {
//           MatchesScreen: [...(user.MatchesScreen || []), likedUser.id],
//         });
//         await updateDoc(doc(db, "Users", likedUser.id), {
//           MatchesScreen: [...(likedUser.MatchesScreen || []), user.id],
//         });
//         console.log(`✅ Match found between ${user.id} and ${likedUser.id}`);
//       }
//     } catch (error) {
//       console.error("❌ Error checking match:", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {profiles.length > 0 && currentIndex < profiles.length ? (
//         <ProfileCard user={profiles[currentIndex]} onLike={handleLike} onSkip={handleSkip} />
//       ) : (
//         <Text>No more profiles</Text>
//       )}
//       <Button title="View Matches" onPress={() => router.push("/MatchesScreen")} />
//     </View>
//   );
// };

// export default SwipeScreen;
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useRouter } from "expo-router";
import ProfileCard from "../profileCard";

const SwipeScreen = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Simulated user (Replace with actual auth user later)
  const user = { id: "currentUserId", name: "John Doe", matches: [] };

  useEffect(() => {
    console.log("📡 SwipeScreen mounted");
    fetchProfiles();
  }, []);

  // Fetch profiles from Firestore
  const fetchProfiles = async () => {
    try {
      console.log("📡 Fetching profiles from Firestore...");
      const querySnapshot = await getDocs(collection(db, "Users"));
      const profilesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log("✅ Profiles fetched:", profilesData);

      if (profilesData.length === 0) {
        console.warn("⚠️ No profiles found in Firestore!");
      }

      setProfiles(profilesData);
    } catch (error) {
      console.error("❌ Error fetching profiles:", error);
    }
  };

  // Handle Like button press
  const handleLike = async (likedUser: any) => {
    try {
      console.log(`👍 Liked user: ${likedUser.id}`);

      // Update liked user's likes list
      await updateDoc(doc(db, "Users", likedUser.id), {
        likes: [...(likedUser.likes || []), user.id],
      });

      // Check if it's a mutual match
      checkMatch(likedUser);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error("❌ Error updating likes:", error);
    }
  };

  // Handle Skip button press
  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1);
  };

  // Check if it's a mutual match
  const checkMatch = async (likedUser: any) => {
    try {
      console.log(`🤝 Checking match with user: ${likedUser.id}`);

      // Fetch updated liked user data
      const likedUserRef = doc(db, "Users", likedUser.id);
      const likedUserSnap = await getDoc(likedUserRef);
      const updatedLikedUser = likedUserSnap.data();

      if (updatedLikedUser?.likes?.includes(user.id)) {
        console.log(`✅ Match found between ${user.id} and ${likedUser.id}`);

        // Update both users' match lists
        await updateDoc(doc(db, "Users", user.id), {
          matches: [...(user.matches || []), likedUser.id],
        });

        await updateDoc(doc(db, "Users", likedUser.id), {
          matches: [...(updatedLikedUser.matches || []), user.id],
        });
      }
    } catch (error) {
      console.error("❌ Error checking match:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profiles.length > 0 && currentIndex < profiles.length ? (
        <ProfileCard user={profiles[currentIndex]} onLike={handleLike} onSkip={handleSkip} />
      ) : (
        <Text>No more profiles</Text>
      )}
      <Button title="View Matches" onPress={() => router.push("/MatchesScreen")} />
    </View>
  );
};

export default SwipeScreen;
