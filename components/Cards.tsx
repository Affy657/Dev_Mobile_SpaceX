import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Link } from 'expo-router'
import { useLaunches } from '../lib/api'
import { type LaunchData } from '../types/api-type'

interface CardType {
  title: string
  date: string
  imageUri: string
}
interface DateOptions {
  month: 'long'
  day: 'numeric'
  year: 'numeric'
}

function formatDate (dateStr: string): string {
  const options: DateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', options)
}

const Card = ({ title, date, imageUri }: CardType & { imageUri: string }): React.ReactElement => {
  const href = {
    pathname: '/(tabs)/LaunchDetail/[id]'
    // params: { id: id },
  }
  const formattedDate = formatDate(date)

  console.log(imageUri)
  return (
    <View style={styles.card}>
      <Link
        // @ts-expect-error cannot find name 'href'
        href={href}
      >
      <Image style={styles.cardImage} source={{ uri: imageUri }} resizeMode="cover" onError={console.log}/>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Link>
    </View>
  )
}

const Cards = (): React.ReactNode => {
  const { status, data, error } = useLaunches()
  // console.log(status, data, error, isFetching)

  console.log(error)

  if (error !== null) {
    return <Text>Error: {error.message}</Text>
  }

  if (status === 'pending') {
    return <Text>Loading...</Text>
  }

  return (
        <FlatList<LaunchData> style={styles.scrollView}
          data={data?.filter((item) => item.links.flickr_images.length > 0)}
          renderItem={({ item }) => Card({ title: item.mission_name, date: item.launch_date_utc, imageUri: item.links.flickr_images[0] })}
          keyExtractor={card => card.flight_number.toString()}
        />
  )
}

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
    marginHorizontal: 20
  },
  cardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderRadius: 20
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
    // font: 'Roboto Condensed',
  },
  dateText: {
    fontSize: 16,
    color: '#60BCF0'
    // font: 'Roboto Condensed',
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
    right: 0
  }
})

export default Cards
