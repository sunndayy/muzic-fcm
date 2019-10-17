# muzic-fcm

## Push notification
``` javascript
POST /notification
{
    "title" : "title",
    "message" : "message",
    "data" : [
        {
            "videoId" : "",
            "title" : "",
            "duration : "",
            "channel" : "",
            "linkThumbnail" : ""
        },
        {
            "videoId" : "",
            "title" : "",
            "duration : "",
            "channel" : "",
            "linkThumbnail" : ""
        }
    ]
}
```
## Token
```javascript 
POST /token
{
    "token" : "token"
}