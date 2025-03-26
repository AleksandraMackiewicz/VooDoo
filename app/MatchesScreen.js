// screens/MatchesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./config/firebase";

const MatchesScreen = ({ user }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const matchedUsers = userData.filter(u => user.matches.includes(u.id));
    setMatches(matchedUsers);
  };

  return (
    <View>
      <Text>Your Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default MatchesScreen;
