app.controller('TwitterController', function($scope, $q, twitterService) {

    $scope.textModel = "";


    twitterService.initialize();

    $scope.$watch('textModel',function(newValue){
        var tweetArray = new Array();
        if (newValue && newValue.length >= 135){
            /*It's time to split*/
            var wordArray = newValue.split("");
            var tweetLength = 0;
            var stringTweet = "";

            wordArray.forEach(function (word) {
                console.log(stringTweet.length + word.length + 3);
                if(stringTweet.length + word.length + 3 < 135){
                    stringTweet += word;
                    console.log(stringTweet);
                    $scope.textHere = stringTweet + "(2/2)";
                }
                else {
                    tweetArray.push(stringTweet);
                    stringTweet = word + "";
                    $scope.textThere = tweetArray[0] + " (1/1)";

                }
            });
            tweetArray.push(stringTweet);
            return tweetArray;
        }
        else {
            $scope.textThere = newValue;
            return newValue;
        }
        $scope.textModel = tweetArray;
        console.log($scope.textModel);
    });


    $scope.postTweet = function () {

        twitterService.postTweet($scope.textThere)
        twitterService.postTweet($scope.textHere)
        console.log($scope.textThere);
        console.log($scope.textHere);
        $('#tweetBox').val('');
    }

    $scope.connectButton = function () {
        twitterService.connectTwitter().then(function () {
            if (twitterService.isReady()) {
                $('#connectTwitterButton').fadeOut(function () {
                    $('#signOutButton').fadeIn();
                });
            }
        });
    }

    $scope.signOutButton = function () {
        twitterService.clearCache();
    }

});