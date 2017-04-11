angular.module('twitterApp.services', [])
.factory('twitterService', function($q){
    var authorizationResult = false;

    return {
        initialize: function() {
            OAuth.initialize('#Oauth.io key', {cache: true});
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return(authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache: true}, function(error, result){
               if(!error){
                   authorizationResult = result;
               }
                else{
                    //Do Something else if there's an error
                }
                return deferred.promise;
            });
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        postTweet(text) {
            var status = text;
            var deferred = $q.defer();
            var promise = authorizationResult.post('/1.1/statuses/update.json?status=' + status).done(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }
});