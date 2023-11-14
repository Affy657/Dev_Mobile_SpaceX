import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';

interface CardProps {
    id: number;
    date: string;
    title: string;
    imageUri: ImageSourcePropType;
  }
  const Card: React.FC<CardProps> = ({ title, imageUri,date }) => {
    return (
      <View style={styles.card}>
        <ImageBackground style={styles.cardImage} source={imageUri} resizeMode="cover" >
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.titleText}>{title}</Text>
        </ImageBackground>
      </View>
    );
  };
  const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        padding: 10,
        margin: 10,
    },
    cardImage: {
      width: '100%',
      height: 200,
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      dateText: {
        fontSize: 16,
        color: 'white', 
      }
    
  });

  export default Card;
      