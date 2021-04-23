import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View ,RefreshControl,Dimensions,ToastAndroid} from 'react-native';
import {Card,Button,Title,Paragraph, Modal,Pressable} from 'react-native-paper';
import TaskApp from './addTask';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



export default App = () => {
  
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);

  console.log(data);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
    useEffect(() => {
      fetch('https://reactdjangobyamar.herokuapp.com/api/todos/?format=json')
        .then((response) => response.json())
        .then((json) => setData(json))
        
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  

 
  return (

    <SafeAreaView style={styles.parent}>
      <StatusBar backgroundColor="green"
      barStyle="light-content"
      />
      <View style={styles.child}> 
      

      <Text style={{color:"white",fontSize:45,fontWeight:"bold",alignSelf:"center",marginTop:25}}>Todo App</Text>
      <Text style={styles.textbox}>Note:            Pull to referesh
      </Text>
      <TaskApp />
     
      </View>
      

    <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <Text>Loading...</Text> : 
     ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
         <Text style={{ fontSize: 30, color: 'green', textAlign: 'center', paddingBottom: 10}}>Tasks</Text>
         <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
         
         style={{backgroundColor:"#fff"}}
           data={data}
           keyExtractor={({ id }, index) => id}
           renderItem={({ item }) => (
             <Card style={styles.card}>
               <Card.Content>
                 <Title>{item.title}</Title>
                 <Paragraph>{item.description}</Paragraph>
               </Card.Content>
               <Card.Actions>
                 <Button>Edit</Button>
                 <Button>Delete</Button>
               </Card.Actions>
               
             </Card>
           )}
         />
       </View>
     )}   
      </View>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  parent:{
    flex:3,
    backgroundColor:"#fff",
  },
child:{
  flex:1,
  backgroundColor:"green",
  borderBottomStartRadius:30,
  borderBottomEndRadius:30,
  elevation:10,
  borderColor:"#fff",
  shadowOffset:{
    height:1,
    width:1
  },
  shadowColor:"#000",
  shadowOpacity:0.9,
  flexDirection:"column",
  alignItems:"center"
},
card:{
  padding:10,
  elevation:10,
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
add:{
  marginTop:60,
  width:140,
  height:50,
  backgroundColor:"#fff",
  color:"white",
  alignSelf:"center",
  borderRadius:30,elevation:10,
  backgroundColor:"#fff",
  borderColor:"#fff",
  shadowOffset:{
    height:1,
    width:1
  },
  shadowColor:"#000",
  shadowOpacity:0.9,
  flexDirection:"row",
  alignItems:"center",
  padding:10
},
textbox:{
  borderWidth:2,
  borderColor:"white",
  padding:20,
  width:300,
  marginTop:20,
  height:70,
  color:"white",
  fontSize:15,
  fontWeight:"bold",
  flexDirection:"column",
  alignItems:"center",
  elevation:2,
  shadowOffset:{
    height:1,
    width:1
  },
  shadowColor:"#000",
  shadowOpacity:0.9,
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
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
  elevation: 5
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}

});


