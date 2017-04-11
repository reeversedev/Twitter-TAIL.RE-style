angular.module('twitterApp.filter',[])
.filter('split', function(){
    return filterThis = function(input) {
        if(input) {
            if(input.length > 136) {
                var wordArray = input.split('');
                var tweetArray = new Array();
                var tweetLength = 0;
                var tweetString = "";
                wordArray.forEach(function (word) {
                    if (tweetString.length + word.length + 3 < 136) {
                        tweetString = tweetString + word + "";
                    }
                    else {
                        wordArray.push(tweetString);
                        tweetString = word;
                    }
                });
                wordArray.push(tweetString);
                console.log(wordArray);
                //return "splitting";
                return wordArray;
            }
            else {
                return input;
            }
        }
        else {
            return "";
        }
    };
});