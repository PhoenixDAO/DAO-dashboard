import { UPDATE_DAOATTRIBUTES } from "./ActionTypes";
import axios from "axios";
import { URL, Admin } from "../const";

export const getDAOAttributes = (body) => {
  return async (dispatch) => {
    const res = await axios.get(`${URL}${Admin}`, {
      headers: {
        Authorization: `Bearer ${body}`,
      },
    });
    if (res.data.responseCode == 200) {
      console.log("I GOT",res.data.result);
      // let temp=false
      // if(body.i==0){
      //   temp=true
      // }
      await dispatch({
        type: "getDAOAttributes",
        payload: {res:res.data.result,rerender:false},
      });
    }
    return res.data.result;
  };
};

export const updateDAOAttributes = (body,id,DAOAttributes) =>{
  return async (dispatch) => {
    console.log("_id is",id)
    console.log("token is",body)
    const res = await axios.put(`${URL}${Admin}${id}`, DAOAttributes , {
      headers: {
        Authorization: `Bearer ${body}`,
      },
    });
    if (res.data.responseCode == 200) {
      console.log(res.data.result);
      await dispatch({
        type: "updateDAOAttributes",
        payload: {res:res.data.result,rerender:true},
      });
    }
    return res.data.result;
  }
}


//   export const updateDAOAttributes=(body) => async(dispatch)=>{

//         let res = await axios.post(
//           "http://localhost:4000/auth/numio",
//           body
//         );
//         if(res.data.responseCode !=200){
//           await dispatch({
//             type: GET_LOGINWITHNUMIO_ERROR,
//             payload: res.data.result.message})
//           }
// if (res.data.responseCode==200){
//   console.log(res.data.result);
//   await dispatch({
//     type: USER_LOGINWITHNUMIO,
//     payload: res.data.result})
//   }
//   return res.data.result;
//         }
