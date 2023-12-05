import { Text, type TextProps } from './Themed'

type LightOrRegular = 'Light' | 'Regular'
type RegularOrMediumOrBold = 'Regular' | 'Medium' | 'Bold'

interface RobotoProps {
  lightOrRegular: LightOrRegular
  textProps: TextProps
  children: React.ReactNode
}

export function Roboto (props: RobotoProps): React.ReactNode {
  return (
    <Text {...props.textProps} style={[props.textProps.style, { fontFamily: 'Roboto' + (props.lightOrRegular) }]}>
      {props.children}
    </Text>
  )
}

interface RobotoCondensedProps {
  regularOrMediumOrBold: RegularOrMediumOrBold
  textProps: TextProps
  children: React.ReactNode
}

export function RobotoCondensed (props: RobotoCondensedProps): React.ReactNode {
  return (
    <Text {...props.textProps} style={[props.textProps.style, { fontFamily: 'RobotoCondensed' + (props.regularOrMediumOrBold) }]}>
      {props.children}
    </Text>
  )
}

export function Heading1 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoCondensedBold', fontSize: 24 }]} />
}

export function Heading2 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoCondensedBold', fontSize: 20 }]} />
}

export function Heading3 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoCondensedBold', fontSize: 18 }]} />
}

export function Title1 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoCondensedMedium', fontSize: 16 }]} />
}

export function Title2 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoCondensedRegular', fontSize: 14 }]} />
}

export function Body1 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoRegular', fontSize: 16 }]} />
}

export function Body2 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoLight', fontSize: 16 }]} />
}

export function Body3 (props: TextProps): React.ReactNode {
  return <Text {...props} style={[props.style, { fontFamily: 'RobotoLight', fontSize: 14 }]} />
}
