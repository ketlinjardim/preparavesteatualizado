import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, ScrollView, Modal, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from '../../components/header';
import FooterComponent from '../../components/footer';

const examData = [
  {
    title: 'ENEM',
    data: [
      { year: 2023, provas: [{ type: 'DIA 1', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D1_CD1.pdf' }, { type: 'DIA 2', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D2_CD5.pdf' }] },
      { year: 2022, provas: [{ type: 'DIA 1', link: 'https://s1.static.brasilescola.uol.com.br/enem/2022/11/1-dia-caderno-1-azul-enem-2022.pdf' }, { type: 'DIA 2', link: 'https://s2.static.brasilescola.uol.com.br/enem/2022/11/2-dia-enem-2022-prova-amarela.pdf' }] },
      { year: 2021, provas: [{ type: 'DIA 1', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf' }, { type: 'DIA 2', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D2_CD5.pdf' }] },
      { year: 2020, provas: [{ type: 'DIA 1', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2020_PV_impresso_D1_CD1.pdf' }, { type: 'DIA 2', link: 'https://download.inep.gov.br/enem/provas_e_gabaritos/2020_PV_impresso_D2_CD5.pdf' }] },

    ],
  },
  {
    title: 'Fuvest (Usp)',
    data: [
      { year: 2023, provas: [{ type: 'Primeira Fase', link: 'https://acervo.fuvest.br/fuvest/2023/fuvest2023_primeira_fase_prova_V.pdf' },     { type: 'Segunda fase-DIA 1', link: 'https://acervo.fuvest.br/fuvest/2023/fuvest_2023_segunda_fase_dia_1.pdf' },{ type: 'Segunda fase-DIA 2', link: 'https://acervo.fuvest.br/fuvest/2023/fuvest_2023_segunda_fase_dia_2.pdf' }] },
      { year: 2022, provas: [{ type: 'Primeira Fase', link: 'https://www.fuvest.br/wp-content/uploads/fuvest_2022_primeira_fase_tipo_K.pdf' }, { type: 'Segunda fase-DIA 1', link: 'https://acervo.fuvest.br/fuvest/2022/fuvest_2022_segunda_fase_dia_1.pdf' },{ type: 'Segunda fase-DIA 2', link: 'https://acervo.fuvest.br/fuvest/2022/fuvest_2022_segunda_fase_dia_2.pdf' }] },
      { year: 2021, provas: [{ type: 'Primeira Fase', link: 'https://acervo.fuvest.br/fuvest/2021/fuvest_2021_primeira_fase.pdf' },            { type: 'Segunda fase-DIA 1', link: 'https://acervo.fuvest.br/fuvest/2021/fuv2021_2fase_dia_1.pdf' },           { type: 'Segunda fase-DIA 2', link: 'https://acervo.fuvest.br/fuvest/2021/fuv2021_2fase_dia_2.pdf' }] },
      { year: 2020, provas: [{ type: 'Primeira Fase', link: 'https://acervo.fuvest.br/fuvest/2020/fuvest_2020_primeira_fase_prova_V.pdf' },    { type: 'Segunda fase-DIA 1', link: 'https://acervo.fuvest.br/fuvest/2020/fuv2020_2fase_dia_1.pdf' },           { type: 'Segunda fase-DIA 2', link: 'https://acervo.fuvest.br/fuvest/2020/fuv2020_2fase_dia_2.pdf' }] },

    ],
  },
  {
    title: 'Comvest (Unicamp)',
    data: [
      { year: 2023, provas: [{ type: 'Primeira Fase', link: 'https://www.comvest.unicamp.br/vest2023/F1/f12023Q_Z.pdf' }]},
      { year: 2022, provas: [{ type: 'Primeira Fase', link: 'https://www.comvest.unicamp.br/vest2022/F1/f12022Q_X.pdf' }]}, 
      { year: 2021, provas: [{ type: 'Primeira Fase', link: 'https://www.comvest.unicamp.br/vest2021/F1/f12021Q_Z.pdf' }]}, 
      { year: 2020, provas: [{ type: 'Primeira Fase', link: 'https://www.comvest.unicamp.br/vest2020/F1/f12020Q_X.pdf' }]},

    ],
  },
  {
    title: 'Vunesp (Unesp)',
    data: [
      { year: 2023, provas: [{ type: 'Prova 1', link: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2023/11/prova-unesp-2023.pdf' }, { type: 'Prova 2', link: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2023/11/prova-segunda-fase-unesp-2023.pdf' }] },
      { year: 2022, provas: [{ type: 'Prova 1 versão 1', link: 'https://vestibular.unesp.br/Home/documentos/provafase1_biologicas' }, { type: 'Prova 1 versão 2', link: 'https://vestibular.unesp.br/Home/documentos/provafase1_exatashumanas.pdf' }] },
      { year: 2021, provas: [{ type: 'Prova 1', link: 'https://www.curso-objetivo.br/vestibular/resolucao-comentada/unesp/2021/1fase/1dia/UNESP2021_1fase_prova.pdf' }, { type: 'Prova 2', link: 'https://vestibular.unesp.br/Home/2021/caderno_2afase_unesp2021_versao_1.pdf' }] },
      { year: 2020, provas: [{ type: 'Prova 1', link: 'https://vestibular.unesp.br/Home/2020/unesp_caderno_de_questoes_prova_de_conhecimentos_gerais_15_nov_2019__v1.pdf' }, { type: 'Prova 2 versão 1', link: 'https://vestibular.unesp.br/Home/unesp-2a-fase-2020-caderno_ciencias_humanas.pdf' }, { type: 'Prova 2 versão 2', link: 'https://vestibular.unesp.br/Home/unesp-2a-fase-2020-caderno_ciencias_natur_matem.pdf' }, { type: 'Prova 2 versão 3', link: 'https://vestibular.unesp.br/Home/unesp-2a-fase-2020-caderno-linguagens.pdf' }] },

    ],
  },
];




const ExamListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvas, setSelectedProvas] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

   const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error opening link: ", err));
   };

  const openModal = (provas, year) => {
    setSelectedProvas(provas);
    setSelectedYear(year);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => openModal(item.provas, item.year)}>
      <View style={styles.itemContent}>
        <Icon name="picture-as-pdf" size={30} color="#FFF" />
        <View style={styles.textContainer}>
          <Text style={styles.yearText}>Prova {item.year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Cabecalho />
          <Text style={styles.title}>Provas de Vestibulares</Text>

          
          <View style={styles.row}>
          {examData.map((exam, index) => (
          <View key={index} style={styles.examContainer}>
            <SectionList
              sections={[exam]}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={(item, index) => `${item.year}-${index}`}
            />
          </View>
            ))}
          </View>

          
        </View>
        <FooterComponent />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha a prova de {selectedYear}</Text>
              {selectedProvas.map((prova, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(false);
                    openLink(prova.link);
                  }}
                >
                  <Text style={styles.buttonText}>{prova.type}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ExamListScreen;