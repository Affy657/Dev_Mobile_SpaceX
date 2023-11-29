import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Text, View } from '../../components/Themed'
import React, { useState } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
import { formatDate } from '../../components/Cards'
import { useLocalSearchParams } from 'expo-router'
import { useLaunche } from '../../lib/api'
import { ScrollView } from 'react-native-gesture-handler'

interface DataLunchType {
  details: string
  date: string
  missionName: string
  youtubeId: string
}
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

function LaunchDetail ({ details, date, missionName, youtubeId }: Readonly<DataLunchType>): React.ReactNode {
  const formattedDate = formatDate(date)

  const [showDescription, setShowDescription] = useState(true)
  const [playVideo, setPlayVideo] = useState(false)

  const handlePress = (): void => {
    if (playVideo) {
      setPlayVideo(false)
      setShowDescription(true)
    } else {
      setPlayVideo(true)
      setShowDescription(false)
    }
  }

  const onVideoStateChange = (state: string): void => {
    if (state === 'paused') {
      setShowDescription(true)
      setPlayVideo(false)
    } else if (state === 'playing') {
      setShowDescription(false)
      setPlayVideo(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={height}
          width={width * 3.2}
          play={playVideo}
          videoId={youtubeId}
          onChangeState={onVideoStateChange}
          initialPlayerParams={{
            rel: false,
            modestbranding: false
          }}
          />
      </View>
      <ScrollView >
        <TouchableOpacity style={{ height: 500 }} onPress={handlePress} />
        {showDescription && (
        <View style={styles.textContainer}>
        <View style={styles.bitognio}></View>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.titleText}>{missionName}</Text>
        <Text style={styles.detailsText}>{details}</Text>
        </View>
        )}
      </ScrollView>
    </View>
  )
}

export default function LaunchDetailData (): React.ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { status, data, error } = useLaunche(id)

  if (error !== null) {
    return <Text>Error: {error.message}</Text>
  }

  if (status === 'pending') {
    return <Text>Loading...</Text>
  }

  return (
        <LaunchDetail
        details={data.details}
        date={data.launch_date_utc}
        missionName={data.mission_name}
        youtubeId={data.links.youtube_id}
        />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoContainer: {
    position: 'absolute',
    height: height * 0.9
  },
  textContainer: {
    width,
    backgroundColor: 'black',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 20
  },
  bitognio: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 80,
    height: 5,
    backgroundColor: '#FFFFFF33',
    borderRadius: 15,
    marginBottom: 20
  },
  dateText: {
    fontSize: 13,
    color: '#60BCF0',
    fontFamily: 'RobotoCondensed',
    paddingBottom: 4
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'RobotoCondensed'
  },
  detailsText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    paddingTop: 14,
    fontFamily: 'RobotoCondensed'
  }
})
