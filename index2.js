// console.log("hello")
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInputEl = document.querySelector("#tweet-field");
// const tweetBtnEl = document.querySelector(".tweet-btn");
const feedEl = document.querySelector(".feed-container");

// tweetBtnEl.addEventListener("click", addTweetToFeed);
document.addEventListener("click", function(event) {
    if(event.target.dataset.likes) {
      handleLikes(event.target.dataset.likes);
    }
    if(event.target.dataset.retweets) {
      handleRetweets(event.target.dataset.retweets);
    }
    if(event.target.dataset.replies) {
      handleReplies(event.target.dataset.replies);
    }
    if(event.target === document.querySelector(".tweet-btn")) {
      addTweetToFeed(tweetInputEl.value);
    }
});

function addTweetToFeed(tweetValue) {
  console.log(tweetValue);
  const newTweetObj = {
    handle: `@arav`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: `${tweetValue}`,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: `${uuidv4()}`,
  };
  tweetsData.unshift(newTweetObj);
  // console.log(tweetsData);
  render();
}

function handleReplies(tweetID) {
  const tweetObject = tweetsData.filter(function(tweet) {
    return tweet.uuid === tweetID;
  })[0];
  console.log(tweetObject);
  document.getElementById(`replies-${tweetObject.uuid}`).classList.toggle("hidden-element");
}


function handleLikes(tweetID) {
  const tweetObject = tweetsData.filter(function(tweet) {
    return tweet.uuid === tweetID;
  })[0];
  // console.log(tweetObject);
  if(tweetObject.isLiked) {
    tweetObject.likes--;
  }
  else {
    tweetObject.likes++;  
  }
  tweetObject.isLiked = !tweetObject.isLiked;
  // console.log(tweetObject);
  render();
}

function handleRetweets(tweetID) {
  const tweetObject = tweetsData.filter(function(tweet) {
    return tweet.uuid === tweetID;
  })[0];
  // console.log(tweetObject);
  if(tweetObject.isRetweeted) {
    tweetObject.retweets--;
  }
  else {
    tweetObject.retweets++;
  }
  tweetObject.isRetweeted = !tweetObject.isRetweeted;
  render();
}

function render() {
  let htmlFeedString = "";

  tweetsData.forEach(function (tweet) {
    let addLikedClass = '';
    let addRetweetedClass = '';
    let repliesHtmlEl = '';
    if(tweet.replies.length) {
      // console.log(tweet.replies);
      for(let replyTweet of tweet.replies) {
        repliesHtmlEl += `
        <div>
          <img src="${replyTweet.profilePic}">
          <div>
              <p class="handle">${replyTweet.handle}</p>
              <p class="tweet-text">${replyTweet.tweetText}</p>
          </div>
        </div>
        `;
      }
    }


    if(tweet.isLiked) {
      addLikedClass='like-color';
    }
    if(tweet.isRetweeted) {
      addRetweetedClass='retweet-color';
    }
    
    // console.log(tweet.isLiked, "line 59")
    htmlFeedString += `
<div class="each-tweet">
  <div class="feed-tweet-container">
    <div>
      <img src="${tweet.profilePic}" alt="User Profile pic" />
    </div>
    <div class="feed-tweet-info-wrapper">
      <p>${tweet.handle}</p>
      <p>${tweet.tweetText}</p>
      <div>
        <span><i data-replies="${tweet.uuid}" id="${tweet.uuid}" class="fa-solid fa-comment"></i> ${tweet.replies.length}</span>
        <span><i data-likes="${tweet.uuid}" id="${tweet.uuid}" class="fa-solid fa-heart ${addLikedClass}"></i> ${tweet.likes}</span>
        <span><i data-retweets="${tweet.uuid}" id="${tweet.uuid}" class="fa-solid fa-retweet ${addRetweetedClass}"></i> ${tweet.retweets}</span>
      </div>
    </div>
  </div>
  <div class="tweet-replies hidden-element" id="replies-${tweet.uuid}">
    <!--here would go the tweet replies-->
    ${repliesHtmlEl}
  </div>
</div>
        `;
  });
  // console.log(htmlFeedString); 
  feedEl.innerHTML = htmlFeedString;
  // console.log(tweetsData)
}
render();
