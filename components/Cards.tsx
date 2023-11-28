import React, { useEffect } from 'react'
import { View, Text, FlatList, Image, Dimensions, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { type LaunchData } from '../types/api-type'
import usePagination from '../hooks/usePagination'
import Animated, { FadeInLeft } from 'react-native-reanimated'

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

function formatDate (dateStr: string): string {
  const options: DateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', options)
}

const Card = ({ title, date, imageUri, id, index }: CardType & { imageUri: string, index: number }): React.ReactElement => {
  const formattedDate = formatDate(date)

  const { width } = Dimensions.get('window')

  return (
    <Animated.View entering={FadeInLeft.delay(index * 100)}>
      <Link href={{
        pathname: '/launchdetail/[id]',
        params: { id }
      }} asChild>
        <Pressable
          style={{
            width: width * 0.90,
            height: 200,
            margin: 10,
            borderRadius: 20,
            overflow: 'hidden'
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}>
            <Image style={{
              width: width * 0.90,
              height: width - 20
            }} source={{ uri: imageUri }} resizeMode="cover"/>
            <View style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              zIndex: 5
            }}>
              <Text style={{
                color: 'white'
              }}>{formattedDate}</Text>
              <Text style={{}}>{title}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  )
}
interface CardsProps {
  data: LaunchData[]
}

const Cards = ({ data }: CardsProps): React.ReactNode => {
  const filteredData = data.filter((item) => item.links.flickr_images.length > 0)
  const pagination = usePagination(filteredData, 1, 10)

  useEffect(() => {
    pagination.updateData(filteredData)
  }, [filteredData.map((item) => item.flight_number).join(',')])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList<LaunchData>
          data={pagination.totalDataShown}
          renderItem={({ item, index }) => Card({ title: item.mission_name, date: item.launch_date_utc, imageUri: item.links.flickr_images[0], id: item.flight_number.toString(), index })}
          keyExtractor={card => card.flight_number.toString()}
          onEndReached={() => { pagination.next() }}
        />
    </View>
  )
}

export default Cards
