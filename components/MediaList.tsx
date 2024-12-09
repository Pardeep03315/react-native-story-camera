import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../utils/images';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {_findIndex, deviceHeight} from '../utils';

type MediaItem = {
  id: string;
  selected: boolean;
  // add other relevant properties
};

const MediaList = (props: any) => {
  const { 
    onSubmit,
    mediaPerPage,
    mediaSelectIcon,
    mediaSelectIconStyle,
    submitButtonIcon,
    submitButtonIconStyle,
    submitButtonStyle,
    submitButtonTextStyle,
  } = props;
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [nextCursor, setNextCursor] = useState('0');
  const [hasNextPage, setHasNextPage] = useState(false);
  useEffect(() => {
    // timer = 0;
    loadMedia('');
  }, []);

  const loadMedia = async (nextCursor: string) => {
    try {
      const {edges, page_info} = await CameraRoll.getPhotos({
        first:mediaPerPage?mediaPerPage:10,
        after: nextCursor,
        assetType: 'All',
        include: ['playableDuration'],
      });

      const newMedia = edges.map((edge, index) => {
        let obj = edge.node;
        obj.selected = false;
        return obj;
      }); //edges.map(edge => edge.node);
      setMedia(prev => [...prev, ...newMedia]);
      setNextCursor(page_info.end_cursor ?? '');
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        style={styles.itemView}
        onPress={() => onPressItem(item, index)}
        onLongPress={() => onLongPress(item, index)}>
        {item.type === 'video/mp4' && (
          <Image source={images.video_icon} style={styles.videoIcon} />
        )}
        {item.selected && (
          <Image 
           source={mediaSelectIcon?mediaSelectIcon:images.check} 
           style={[styles.checkIcon,mediaSelectIconStyle]} 
           resizeMode='contain'/>
        )}
        <Image source={{uri: item.image.uri}} style={{flex: 1}} />
      </Pressable>
    );
  };

  const onPressItem = (item: MediaItem, index: number) => {
    const mediaArr = [...media];
    const selectedMediaArr = [...selectedMedia];
    if (selectedMediaArr.length > 0) 
    {
      const findIndex = selectedMediaArr.findIndex(mediaItem => mediaItem.id === item.id);
      if (findIndex !== -1) 
      {
        selectedMediaArr.splice(findIndex, 1);
        item.selected = false;
      } else 
      {
        selectedMediaArr.push(item);
        item.selected = true;
      }
      mediaArr[index] = { ...item }; // ensure immutability
      setMedia(mediaArr);
      setSelectedMedia(selectedMediaArr);
      
    } else 
    {
      let arr = []
      arr.push(item)
      onSubmit(arr)
    }
  };

  const onLongPress = (item: MediaItem, index: number) => 
  {
    const mediaArr = [...media];
    const selectedMediaArr = [...selectedMedia];
    if (selectedMediaArr.length === 0) 
    {  
      item.selected = true;
      selectedMediaArr.push(item);
      mediaArr[index] = { ...item }; // Ensure immutability
      setMedia(mediaArr);
      setSelectedMedia(selectedMediaArr);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      loadMedia(nextCursor);
    }
  };



  return (
    <View>
      {selectedMedia.length > 0 && (
        <Pressable style={[styles.absoluteView,submitButtonStyle]} onPress={()=>onSubmit(selectedMedia)}> 
            <Image source={submitButtonIcon?submitButtonIcon:images.tick} 
             style={[styles.selectedCircleIcon,submitButtonIconStyle]} />
            <Text style={[styles.countText,submitButtonTextStyle]}>{selectedMedia.length}</Text>
        </Pressable>
      )}
      <FlatList
        horizontal={true}
        data={media}
        keyExtractor={(x, i) => i.toString()}
        key="{item}"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  itemView: {
    height: 65,
    width: 65,
    position: 'relative',
    marginTop: 10,
    marginRight: 5,
    backgroundColor: '#2E2D2C',
  },

  videoIcon: {
    position: 'absolute',
    height: 15,
    width: 15,
    tintColor: 'white',
    top: 0,
    zIndex: 999,
    right: 5,
  },

  checkIcon: {
    position: 'absolute',
    height: 15,
    width: 15,
    tintColor: 'white',
    top: 2,
    zIndex: 999,
    left: 5,
  },


  absoluteView:
  {
      height: 50, 
      width:50,
      backgroundColor:"green",
      zIndex:999,
      borderRadius:50/2,
      alignSelf:"flex-end",
      marginTop:-50,
      marginRight:15,
      justifyContent:"center",
      alignItems:"center"
  },

  selectedCircleIcon: {
    height:"50%",
    width:"50%",
    borderRadius:50/2,
    tintColor:"white"
  },

  countText:
  {
      fontSize:12,
      color:"white",
      position:"absolute",
      bottom:8,
      right:10
  }
});
