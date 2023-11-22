import { Text, type TextProps } from './Themed'

export function MonoText (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
}
