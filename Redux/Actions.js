export const SET_FILE = 'SET_FILE';
export const SET_STATUS = 'SET_STATUS';
export const IS_LOADING ='IS_LOADING';
export const GET_SEARCH_DATA ='GET_SEARCH_DATA';

const API_URL_1 = 'http://api.rest7.com/v1/pdf_to_text.php?layout=0';



export const uploadFileAPI = fileToUpload => {
  try {
    return async dispatch => {
      const data = new FormData();
      //   console.log(fileToUpload.uri);
      data.append('file', fileToUpload);
      data.append('Content-Type', 'application/pdf');
      dispatch({
        type: IS_LOADING,
        payload: true,
      });
      const result = await fetch(API_URL_1, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      
      let responseJson = await result.json();
      console.log(responseJson);
      
      dispatch({
        type: IS_LOADING,
        payload: false,
      });

      if (responseJson.success==1) {
        dispatch({
          type: SET_FILE,
          payload: responseJson.file,
        });
        dispatch({
            type: SET_STATUS,
            payload: responseJson.success,
          });
    }else{
        dispatch({
          type: SET_STATUS,
          payload: responseJson.success,
        });
    }
    };
  } catch (error) {
    console.log(error);
  }
};

const API_URL_2 = 'http://api.rest7.com/v1/wikipedia_search.php?text=tiger';

export const getAllData = (userText,selectLang) => {
    try {
      const data = {text:userText, language:selectLang};

        return async dispatch => {
            const result = await fetch(`http://api.rest7.com/v1/wikipedia_search.php?text=${encodeURIComponent(data.text)}&language=${encodeURIComponent(data.language)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
            console.log(Object.keys(json))
            const urlArray=Object.keys(json);
            if (json) {
                dispatch({
                    type: GET_SEARCH_DATA,
                    payload: urlArray
                });
                // console.log(json)
            }

            else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
