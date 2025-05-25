A tool that accurately tracks how much of a lecture video a user has really watched.

**How to run**:

_Server_:

`cd server` \
` npm i` \
` Setup environment variables : DATABASE_URL (mongoDB)` \
`npm run dev`

_Client_:

`cd client` \
` npm i` \
` Setup environment variables : VITE_BACKEND_URL` \
`npm run dev`

**How it works**:

Q1. How it tracks watched intervals? \
_The video length is divided into 5 seconds of intervals and then at every 2 seconds it saves the current interval based on the current position of video player. So by storing the nth interval we can formulate that user has watched the 5 seconds of video corresponding to that nth interval. \
For Eg: \
Suppose the current position of user is 54 in seconds. So the interval will be 54/5 = 10 th interval so it will store 10 in the interval array. \
So my interval array will be like [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], where each element for eg: 0 represents [0,5] interval similarly, 3 represents [15, 20] interval and so on._

Q2. How it measures user progress? \
_It calculates users progress based on the interval array size i.e. \
Progress = (interval array size) / (total size) \* 100, where total size is (video duration) / (interval length). And at every 5 seconds it will calculate the user progress and updates in frontend._

Q3. How it calculates unique progress? \
_Suppose my interval array look like this : [0, 1, 2, 3, 4, 5] which means user has watched all intervals from 0 to 5 i.e [0, 30]. Now suppose user again watches already watched part and the current position of user is at 16 seconds. So the interval would be 16/5 = 3. Now 3 is already present in the interval array, that means it is already watched, so no need to insert this again in interval array and it will not contribute in the progress. \
And If a user jumps ahead the new intervals will be counted in the progress. But user needs to complete the skipped part for 100% progress._

Q4. How it stores the watched intervals? \
_At every 5 seconds it stores the interval array in local storage of browser. And at every 20 seconds it saves the interval array to the database. When user completes the video and progress is 100%, it deletes the local storage data and saves the final data to the database._

Q5. How it restores the user last viewed position? \
_First it will try to get data from local storage, if it's not present, then it will check the database. From that data it will use the stored interval array. Supoose my interval array look like this [0,1,2,3,10,11,20,21]. So here user first skips 4,5,6,7,8,9th intervals that means [20, 50] part of video. And then user skips 12,13,14,15,16,17,18,19 intervals that means [60, 120] part of video. \
So when a user returns it should be at the first part where it left. To find the first missing interval,sort the interval array (nlogn), then using binary search (logn), calculate the minimum index where interval array element is not equal to index. So this will be the first skipped interval, and video will resume from here. If a user watches without skipping, it will simply return the last interval of array._

**Note: All intervals length can be changed to make the tool more accurate .**
