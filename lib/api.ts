import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { LaunchData } from '../types/api-type'


//appele api pour avoir la liste des lancements
export function useLaunches() {
  return useQuery<LaunchData[]>({
    queryKey: ['Launches'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.spacexdata.com/v3/launches?limit=10&offset=15',
      )
      return data
    },
  })
}

//fait un appelle a lapi pour un seule lancement 
const getLauncheById = async (LauncheId: string) => {
    const { data } = await axios.get(
      `https://api.spacexdata.com/v3/launches/${LauncheId}`,
    )
    return data
  }

  //appel la fonction getLaunchesById 
export function useLaunche(LauncheId: string) {
    return useQuery({
      queryKey: ['Launches', LauncheId],
      queryFn: () => getLauncheById(LauncheId),
      enabled: !!LauncheId,
    })
  }
  