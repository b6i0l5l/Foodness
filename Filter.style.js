import { StyleSheet, Dimensions, Platform } from 'react-native';
import React from 'react';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    grid:{
        marginTop:100,
    },
    grid_row:{
        borderColor:'#808080',
        borderBottomWidth:2,
        flexDirection:'column'
    },
    text:{
        color:'#808080',
        marginTop:10,
        marginLeft:10
    },
    awesomebutton:{
        marginTop:10,
        marginLeft:10,
    }
})