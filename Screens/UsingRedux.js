import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import {uploadFileAPI} from '../Redux/Actions';

const RdxConverter = () => {
  const [singleFile, setSingleFile] = useState(null);
  const {file, success,isloading} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [gettxtData, setgettxtData] = useState('');

  const uploadFile = () => {
    if (singleFile != null) {
    const fileToUpload = singleFile;
    dispatch(uploadFileAPI(fileToUpload));
    
    // console.log('msg:',success);
    
    } else {
      alert('Please Select File first');
    }
  };
  
  if(isloading==false)
    {
      if(success==1)
      {
        alert('Success'); 
      }else{
        alert('failed!');
      }
      // alert('Please Select File first'); 
    }

  const getTextFileData = async () => {
    try {
      console.log(file);
      console.log(success);
      const f2 = file.split('/');
      const fileName = f2[f2.length - 1];
      console.log('File name: ' + fileName);
      const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      console.log('LocalFile: ' + localFile);
      const options = {
        fromUrl: file,
        toFile: localFile,
      };

      RNFS.downloadFile(options).promise.then(async () => {
        const gettxt = await RNFS.readFile(localFile);
        setgettxtData(gettxt);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      //   console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.mainBody}>
        {/*Showing the data of selected Single file*/}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text style={styles.buttonTextStyle}>Select File</Text>
        </TouchableOpacity>
        {singleFile != null ? (
          <Text style={styles.textStyle}>
            File Name: {singleFile.name ? singleFile.name : ''}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={uploadFile}>
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={getTextFileData}>
          <Text style={styles.buttonTextStyle}>Display</Text>
        </TouchableOpacity>
        <View style={styles.result}>
          <ScrollView>
            <Text>{gettxtData}</Text>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
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
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  result: {
    margin: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 400,
    height: 500,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default RdxConverter;
