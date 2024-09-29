import { Image, Pressable, Text} from 'react-native'
import React from 'react'
const TextButton = ({style = {} , onPress , textStyle,text, isActive , activeTextStyle}:any) => {
  return (
    <Pressable style={style} onPress={onPress}>
       <Text style={isActive?activeTextStyle:textStyle}>{text}</Text>
    </Pressable>
  )
}

export default TextButton
