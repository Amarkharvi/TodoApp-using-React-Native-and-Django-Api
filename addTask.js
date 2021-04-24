
import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ToastAndroid } from "react-native";
import { TextInput} from "react-native-paper";
import BouncyCheckbox from 'react-native-bouncy-checkbox';

class TaskApp extends Component {
constructor(props){

    super(props);
  this.state = {
    modalVisible: false,
    title:'',
    desc:'',
    completed:false,
  };}
  handleText=(text)=>{
      this.setState({title:text});
  }
  handleDesc=(text)=>{
      this.setState({desc:text});
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  async onFetchLoginRecords(){
    try {
        let response = await fetch('https://reactdjangobyamar.herokuapp.com/api/todos/?format=json',{
        method:'post',
        mode:"no-cors",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            
            title:this.state.title,
            description:this.state.desc,
            completed:this.state.completed
        })
        
    });
    if (response.status>=200 && response.status<300){
      ToastAndroid.show("Posted Succesfully!!",ToastAndroid.SHORT);
        
    }
    else{
      alert("Error posting,Check Connectivity or fill the form fully!!!");
    }
    
  }
  catch(errors) {

    alert(errors);
   } 
}

onPressSubmitButton(){
  console.log('pressed');
    this.onFetchLoginRecords();
    
}
functionCombined (){
  const {modalVisible}=this.state;
  this.onPressSubmitButton();
  this.setModalVisible(!modalVisible);
}
 

  render() {
   
    const { modalVisible } = this.state;
    

    return (
        
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Task Details</Text>
              <View style={styles.inputView}>
                  <TextInput label="Title" placeholder="Enter the title" mode="outlined" style={styles.input} onChangeText={this.handleText}  />
                  <TextInput label="Description"  placeholder="Enter the Description" mode="outlined" style={styles.input} onChangeText={this.handleDesc} /></View>
                  <BouncyCheckbox 
                  size={35}
                  fillColor="red"
                  unfillColor="white"
                  text="Completed?"
                  iconStyle={{borderColor:"red"}}
                  onPress={()=> this.setState({completed:!(this.setState.completed)})}
                  />
             

              <Pressable
                style={[styles.closebutton, styles.buttonClose]}
                onPress={()=>this.functionCombined()}
              >
                <Text style={styles.textStyleclose}>Post</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add Task</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width:200,
    height:50,
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    backgroundColor:"#fff",
  borderColor:"#fff",
  shadowOffset:{
    height:1,
    width:1
  },
  shadowColor:"#000",
  shadowOpacity:0.9,
  margin:5,
  },
  closebutton: {
    width:100,
    height:50,
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    backgroundColor:"#fff",
  borderColor:"#fff",
  shadowOffset:{
    height:1,
    width:1
  },
  shadowColor:"#000",
  shadowOpacity:0.9,
  margin:5
  },
  buttonOpen: {
    backgroundColor: "#ffffff",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf:"center",
    marginTop:0,
    fontSize:20
  },
  textStyleclose: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf:"center",
    marginTop:0,
    fontSize:20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:20,
    fontWeight:"bold",
  },
  inputView:{
      flex:2,
      width:300,
  },
  input:{
      margin:10,
      padding:5
  }
});

export default TaskApp;