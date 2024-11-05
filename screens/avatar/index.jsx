import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { AvatarContext } from '../../components/avatarcomp'; // Importe o contexto
import { profileStyles } from './style';
import { useNavigation } from "@react-navigation/native";

const avatarImages = [
  { id: 1, source: require('../../assets/avatares/1.png') },
  { id: 2, source: require('../../assets/avatares/2.png') },
  { id: 3, source: require('../../assets/avatares/3.png') },
  { id: 4, source: require('../../assets/avatares/4.png') },
  { id: 5, source: require('../../assets/avatares/5.png') },
  { id: 6, source: require('../../assets/avatares/6.png') },
  { id: 7, source: require('../../assets/avatares/7.png') },
  { id: 8, source: require('../../assets/avatares/8.png') },
  { id: 9, source: require('../../assets/avatares/9.png') },
  { id: 10, source: require('../../assets/avatares/10.png') },
  { id: 11, source: require('../../assets/avatares/12.png') },
  { id: 12, source: require('../../assets/avatares/13.png') },
  { id: 13, source: require('../../assets/avatares/14.png') },
  { id: 14, source: require('../../assets/avatares/15.png') },
  { id: 15, source: require('../../assets/avatares/16.png') },
];



const AvatarSelection = () => {
  const { setSelectedAvatar } = useContext(AvatarContext);
  const navigation = useNavigation(); 

  const handleAvatarSelect = (selectedAvatar) => {
    setSelectedAvatar(selectedAvatar.source); // Atualiza o avatar no contexto
    navigation.replace("Home"); // Volta para a tela anterior após selecionar o avatar
  };
  

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>Selecione um Avatar</Text>
      <FlatList
        data={avatarImages}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAvatarSelect(item)} style={profileStyles.avatarContainer}>
            <Image source={item.source} style={profileStyles.avatarImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={profileStyles.avatarList}
      />
    </View>
  );
};

export default AvatarSelection;