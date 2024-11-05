import { StyleSheet } from 'react-native';

export const stylescalc = StyleSheet.create({
  container: {
    margin:20
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c7a7b',
  },
  field: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   
    margin:20,
  },
  espaco:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-around'
  }
});


