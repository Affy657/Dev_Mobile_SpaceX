import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Dimensions, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'
import { type LaunchData } from '../types/api-type'
import usePagination from '../hooks/usePagination'
import { LinearGradient } from 'expo-linear-gradient'
import { Heading3, Title2 } from './StyledText'
import { blueColor } from '../constants/Colors'

interface CardType {
  title: string
  date: string
  imageUri: string
  id: string
}
interface DateOptions {
  month: 'long'
  day: 'numeric'
  year: 'numeric'
}

export function formatDate (dateStr: string): string {
  const options: DateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', options)
}

const Card = ({ title, date, imageUri, id, index }: CardType & { imageUri: string, index: number }): React.ReactElement => {
  const formattedDate = formatDate(date)

  const { width } = Dimensions.get('window')

  return (
    <Link href={{
      pathname: '/launchdetail/[id]',
      params: { id }
    }} asChild>
      <Pressable
        style={[styles.cardPressable, { width: width * 0.90 }]}
      >
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: imageUri }} resizeMode="cover"/>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.15)']}
          style={styles.gradient}>
          <View style={styles.textContainer}>
            <Title2 style={[styles.dateText, { color: blueColor }]}>{formattedDate}</Title2>
            <Heading3 style={styles.titleText}>{title}</Heading3>
          </View>
          </LinearGradient>
        </View>
      </Pressable>
    </Link>
  )
}
interface CardsProps {
  data: LaunchData[]
}

const Cards = ({ data }: CardsProps): React.ReactNode => {
  const filteredData = data.filter((item) => item.links.flickr_images.length > 0)
  const pagination = usePagination(filteredData, 1, 10)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    pagination.updateData(filteredData)
  }, [filteredData.map((item) => item.flight_number).join(',')])

  const loadMoreData = (): void => {
    setIsLoading(true)
    pagination.next()
    setIsLoading(false)
  }

  const renderFooter = (): React.JSX.Element | null => {
    if (!isLoading) return null
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1 }}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList<LaunchData>
          data={pagination.totalDataShown}
          renderItem={({ item, index }) => Card({ title: item.mission_name, date: item.launch_date_utc, imageUri: item.links.flickr_images[0], id: item.flight_number.toString(), index })}
          keyExtractor={card => card.flight_number.toString()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  cardPressable: {
    height: 200,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 0,
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderRadius: 20
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    fontFamily: 'RobotoCondensed'
  },
  dateText: {
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  },
  scrollView: {
    backgroundColor: 'black',
    marginHorizontal: 25,
    width: '100%'
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 0
  }
})

export default Cards
