import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType, FlatList, TouchableOpacity } from 'react-native';
import { Link, type LinkProps } from 'expo-router';

const image1 = require('../assets/images/icon.png');

const DATA = [
  {
    id :1,
    date:'2021-01-01',
    title:"Card Title api" ,
    imageUri: image1
  },
  {
    id :2,
    date:'2021-01-01',
    title:"Card Title api" ,
    imageUri: image1
  },
  {
    id :3,
    date:'2021-01-01',
    title:"Card Title api" ,
    imageUri: image1
  },
  {
    id :4,
    date:'2021-01-01',
    title:"Card Title api" ,
    imageUri: image1
  },
]



type CardType = {
  title: string,
  date: string,
  imageUri: string,
};


const Card = ({title, date, imageUri}:CardType & { imageUri: ImageSourcePropType }) => {
  const href = {
    pathname: "/(tabs)/LaunchDetail/[id]",
    //params: { id: id },
  }

  return (
    <View style={styles.card}>
      <Link
        // @ts-ignore
        href={href}
      >
      <ImageBackground style={styles.cardImage} source={imageUri} resizeMode="cover">
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </ImageBackground>
    </Link>
    </View>
  );
};


  const Cards = () => {
    return (
        <FlatList style={styles.scrollView}
          data={DATA}
          renderItem={({ item }) => Card({title: item.title, date: item.date, imageUri: item.imageUri})}
          keyExtractor={card => card.id.toString()}
        />
    );
  };

  const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    cardImage: {
      width: '100%',
      height: 200,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 25,
      borderRadius: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        //font: 'Roboto Condensed',
      },
    dateText: {
        fontSize: 16,
        color: '#60BCF0', 
        //font: 'Roboto Condensed',
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 25,
      width: '100%'
    },
    
  });

  export default Cards;
      