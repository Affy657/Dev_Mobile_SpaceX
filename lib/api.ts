import axios from 'axios'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type LaunchData } from '../types/api-type'

// appele api pour avoir la liste des lancements
export function useLaunches (): UseQueryResult<LaunchData[]> {
  return useQuery<LaunchData[]>({
    queryKey: ['Launches'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.spacexdata.com/v3/launches?offset'
      )
      return data.reverse()
    }
  })
}

// fait un appelle a lapi pour un seule lancement
const getLauncheById = async (LauncheId: string): Promise<LaunchData> => {
  const { data } = await axios.get(
      `https://api.spacexdata.com/v3/launches/${LauncheId}`
  )
  return data
}

// appel la fonction getLaunchesById
export function useLaunche (LauncheId: string): UseQueryResult<LaunchData> {
  return useQuery({
    queryKey: ['Launches', LauncheId],
    queryFn: async () => await getLauncheById(LauncheId)
    // enabled: !!LauncheId
  })
}

// fait un appelle a lapi pour plusieurs lancements en fonction dune liste de id
const getLaunchesByIds = async (ids: string[]): Promise<LaunchData[]> => {
  const launches = await Promise.all(ids.map(getLauncheById))
  return launches
}

// appel la fonction getLaunchesByIds
export function useLaunchesByIds (ids: string[]): UseQueryResult<LaunchData[]> {
  return useQuery({
    queryKey: ['Launches', ids],
    queryFn: async () => await getLaunchesByIds(ids)
  })
}
