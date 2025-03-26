// components/ProfileCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ProfileCard = ({ user, onLike, onSkip }) => {
  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Image source={{ uri: user.photoURL }} style={{ width: 200, height: 300, borderRadius: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>{user.name}, {user.age}</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity onPress={() => onSkip(user)} style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 18 }}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onLike(user)}>
          <Text style={{ fontSize: 18 }}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;