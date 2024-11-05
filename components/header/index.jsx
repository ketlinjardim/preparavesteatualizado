import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Modal, Pressable, Alert, TouchableOpacity, StatusBar } from "react-native";
import { style } from './style';
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { AvatarContext } from "../../components/avatarcomp";
import KollektifBold from "../../assets/fonts/Kollektif-Bold.ttf";
import Kollektif from "../../assets/fonts/Kollektif.ttf";
import AvatarSelection from "../../screens/avatar";
import Login from "../../screens/Login";

export default function Cabecalho() {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const { selectedAvatar } = useContext(AvatarContext);
  const defaultAvatar = require("../../assets/avatares/perfil-de-usuario.png");

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        KollektifBold: KollektifBold,
        Kollektif: Kollektif,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={style.cabecalho}>
        <Pressable onPress={toggleMenu} style={{ marginLeft: 15 }}>
          <Icon name="menu" type="material" color="#000" />
        </Pressable>

        <Image
          style={style.ImagemLogo}
          source={require("../../assets/LogoPreparaVest.png")}
        />

        {/* Ícone do avatar que abre o modal de perfil */}
        <Pressable onPress={openModal}>
          <Image source={selectedAvatar || defaultAvatar} style={style.avatarIcon} />
        </Pressable>

        {/* Modal de perfil */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Fechando modal de perfil");
            setModalVisible(false);
          }}
        >
          <TouchableOpacity style={style.perfilmodal} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={style.modal}>
              <Text style={style.titulomodal}>Perfil</Text>
              <Pressable onPress={() => setModalVisible1(true)}>
                <Image source={selectedAvatar || defaultAvatar} style={style.imagemavatar} />
              </Pressable>
              <Pressable onPress={() => setModalVisible1(true)} style={style.botal}>
                <Text>Alterar foto</Text>
              </Pressable>

              {/* Modal para alterar avatar */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
              >
                <TouchableOpacity style={style.avatarmodal} activeOpacity={1} onPressOut={() => setModalVisible1(false)}>
                  <View>
                    <AvatarSelection />
                    <Pressable onPress={() => setModalVisible1(false)}>
                      <Text style={style.titulomodal1}>Voltar à página anterior</Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              </Modal>

              <Pressable 
               onPress={() => navigation.navigate("Login")}
              style={style.botal}>
                <Text>Sair da conta</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={style.titulomodal1}>Voltar à página anterior</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Menu suspenso usando Modal */}
        {menuVisible && (
          <Modal
            animationType="none"
            transparent={true}
            visible={menuVisible}
            onRequestClose={closeMenu}
          >
            <TouchableOpacity style={style.menuOverlay} onPress={closeMenu}>
              <View style={[style.menu, { zIndex: 10, position: "absolute" }]}>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Home"); }}>
                  <Text style={style.menuItem}>Home</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Pagina Enem"); }}>
                  <Text style={style.menuItem}>Provas</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Informacoes"); }}>
                  <Text style={style.menuItem}>Informações gerais</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Conteudo relevante"); }}>
                  <Text style={style.menuItem}>Conteúdo relevante</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Dicas"); }}>
                  <Text style={style.menuItem}>Dicas de estudos</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate("Prepare-se"); }}>
                  <Text style={style.menuItem}>Estatísticas</Text>
                </Pressable>
                <Pressable onPress={() => { closeMenu(); navigation.navigate('Calculadora Enem'); }}>
                  <Text style={style.menuItem}>Calcule sua nota</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    </>
  );
}
