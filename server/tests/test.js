

// Example usage:
const hashtagsString = 'example graphql';
logHashtags(hashtagsString);

function logHashtags(hashtagsString) {
    hashtagsArray = hashtagsString.split(/\s+/);
    hashtagsArray.forEach(hashtag => console.log(hashtag));
}