import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Dimensions } from 'react-native';
export const deviceHeight = Dimensions.get('window').height
export const deviceWidth = Dimensions.get('window').width

export const getDeviceMedia = async(itemsPerPage,page_info)=>
{
  const response = await CameraRoll.getPhotos(
    {
      first: itemsPerPage, 
      assetType: 'All',
      // include:["playableDuration"]
    });
  return response;
}

 export const _findIndex = (data, id) => 
  {
      var index = data.findIndex(function (item) 
      {
         return item.id === id
      });
      return index
  }


  export const _formatTimer = timer => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  export const _formatResponse = (data,type) => 
  {
    return new Promise(async (resolve, reject) => 
    {
      let response = { status: "true", type : type,  data : data }

      if(type==="cameraroll")
        {
            let arr = []
            data.map((item)=>
            {
                let payload =
                {
                  "modificationDate": "",
                  "path": "",
                  "duration": null,
                  "mime": "",
                  "height": null,
                  "width": null,
                 }            
                payload.modificationDate = item.modificationTimestamp,
                payload.path = item.image.uri,
                payload.duration = item.type==="video/mp4"?item?.image?.playableDuration:null,
                payload.mime = item.type==="video/mp4"?"video/mp4":"image/jpeg"
                payload.height = item.image.height,
                payload.width = item.image.width,
                arr.push(payload)
            })    
            response.data = arr
            resolve(response)            
      }

      else if(type==="gallery")
        {
          resolve(response) 
        }
        else if(type==="capture")
        {
          let arr = []
          data.map((item)=>
          {
                const path = item.path;
                const hasMOV = path.includes(".mov");
                const hasMP4 = path.includes(".mp4");
                if(hasMOV || hasMP4)
                type="video/mp4"
                else
                type="image/jpeg"
    
              let payload =
              {
                "modificationDate": "",
                "path": "",
                "duration": null,
                "mime": "",
                "height": null,
                "width": null,
               }            
              payload.modificationDate = null,
              payload.path = item.path,
              payload.duration = type==="video/mp4"?item?.duration:null,
              payload.mime = type
              payload.height = item.height,
              payload.width = item.width,
              arr.push(payload)
          })    
          response.data = arr
          resolve(response)
        }
 
    });
  };

