
angular.module('myApp', [])

    .controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    var refresh = function(){
        $scope.showAdd = true;
        $http.get('/departments').success(function(response){
            $scope.departments = response;
            $scope.department = "";
        });
    };
    refresh();
    $scope.addDepartment = function() {
        $http.post('/department', $scope.department).success(function(response){
            refresh();
        });
    };
    $scope.edit = function(id) {
        $scope.showAdd = false;
        $http.get('/department/' + id).success(function(response){
            $scope.department = response[0];
        });
    };
    $scope.update = function() {
        $scope.showAdd = true;
        $http.put('/departments', $scope.department).success(function(response){
            refresh();
        });
    };
    $scope.deselect = function(){
        $scope.showAdd = true;
        $scope.department = "";
    };
}]);