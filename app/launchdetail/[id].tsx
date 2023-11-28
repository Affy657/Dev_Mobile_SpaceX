import { StyleSheet, Dimensions } from 'react-native'
import { Text, View } from '../../components/Themed'
import React from 'react'
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

function LaunchDetail ({ details, date, missionName, youtubeId }: Readonly<DataLunchType>): React.ReactNode {
  const formattedDate = formatDate(date)
  const height = Dimensions.get('screen').height

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={height}
        width={width * 3.2}
        play={false}
        videoId={youtubeId}
        />
      <ScrollView style={styles.textContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.titleText}>{missionName}</Text>
        <Text style={styles.detailsText}>{details}</Text>
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
  video: {
    position: 'absolute'
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
  detailsText: {
    flex: 1,
    color: 'white'
  },
  textContainer: {
    width,
    borderRadius: 20,
    color: 'white',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 10,
    padding: 20,
    paddingTop: 50
  }
})
