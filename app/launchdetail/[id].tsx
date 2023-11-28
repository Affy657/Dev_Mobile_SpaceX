import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'
import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
import { formatDate } from '../../components/Cards'
import { useLocalSearchParams } from 'expo-router'
import { useLaunche } from '../../lib/api'

interface DataLunchType {
  details: string
  date: string
  missionName: string
  youtubeId: string
}

function LaunchDetail ({ details, date, missionName, youtubeId }: Readonly<DataLunchType>): React.ReactNode {
  const formattedDate = formatDate(date)

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={false}
        videoId={youtubeId}
      />
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.titleText}>{missionName}</Text>
        <Text style={styles.detailsText}>{details}</Text>
      </View>
    </View>
  )
}

export default function LaunchDetailData (): React.ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { status, data, error } = useLaunche(id)
  // console.log(status, data, error, isFetching)

  console.log(error)

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
    justifyContent: 'flex-start'
  }
})
