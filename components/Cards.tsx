import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Link, type LinkProps } from 'expo-router';
import { useLaunches } from '../lib/api'
import { LaunchData } from '../types/api-type'


type CardType = {
  title: string,
  date: string,
  imageUri: string,
};

const Card = ({title, date, imageUri}:CardType & { imageUri: string }) => {
  const href = {
    pathname: "/(tabs)/LaunchDetail/[id]",
    //params: { id: id },
  }
  
  console.log(imageUri)
  return (
    <View style={styles.card}>
      <Link
        // @ts-ignore
        href={href}
      >
      <Image style={styles.cardImage} source={{uri : imageUri}} resizeMode="cover" onError={console.log}/>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Link>
    </View>
  );
};


  const Cards = () => {
    const { status, data, error, isFetching } = useLaunches()
    //console.log(status, data, error, isFetching)

  console.log(error)

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  if (status === 'pending') {
    return <Text>Loading...</Text>
  }

    return (
        <FlatList<LaunchData> style={styles.scrollView}
          data={data?.filter((item) => item.links.flickr_images.length > 0)}
          renderItem={({ item }) => Card({title: item.mission_name, date: item.launch_date_utc, imageUri: item.links.flickr_images[0]})}
          keyExtractor={card => card.flight_number.toString()}
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
      backgroundColor: 'black',
      marginHorizontal: 25,
      width: '100%'
    },
    textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    },
  });

  export default Cards;
      