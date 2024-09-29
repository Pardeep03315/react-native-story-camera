import { Image, Pressable, Text} from 'react-native'
import React from 'react'
const Icon = ({source = "" , style = {} , iconStyle = {} , onPress , type = "icon" , textStyle , text="" , isActive , activeTextStyle}:any) => {
  return (
    <Pressable style={style} onPress={onPress}>
      {type==="icon"?
      <Image
       source={source}
       style={iconStyle}
       resizeMode="contain"/>:
       <Text style={activeTextStyle?activeTextStyle:textStyle}>{text}</Text>
       }
  </Pressable>
  )
}

export default Icon
