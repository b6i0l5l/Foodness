import { StyleSheet, Dimensions, Platform } from 'react-native';
import React from 'react';
const {height,width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',


  },
  info:{
    marginLeft:15,
  },
  background:{
    flex :1,
    backgroundColor: 'white',


  },
  avatar:{
    flex:1,
    alignItems:'center',
    marginTop:height*0.2,
  },
  header:{
    backgroundColor:'#DCDCDC',

  },
  row:{
    borderColor:'#DCDCDC',
    borderBottomWidth: 2,
  }

});
