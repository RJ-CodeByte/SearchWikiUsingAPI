import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {getAllData} from '../Redux/Actions';
import {WebView} from 'react-native-webview';

const GetParamsApi = () => {
  const language = ['English', 'French'];
  const {search} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [usrValue, setUsrValue] = useState('');
  const [selectLang, setselectLang] = useState('');
  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Enter Your Text"
        style={styles.input}
        value={usrValue}
        onChangeText={value => setUsrValue(value)}
      />
      <Text style={styles.text}>Please Select Language:</Text>
      <SelectDropdown
        data={language}
        onSelect={(selectedItem, index) => {
          setselectLang(selectedItem);
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => {
          dispatch(getAllData(usrValue, selectLang));
          Keyboard.dismiss();
        }}>
        <Text style={styles.buttonTextStyle}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <WebView source={{uri: search[0]}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    width: 300,
    height: 60,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
  },
  text: {
    fontSize: 10,
    margin: 20,
  },
  result: {
    margin: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
  container: {
    width: '100%',
    height: 400,
    margin: 20,
  },
});

export default GetParamsApi;
