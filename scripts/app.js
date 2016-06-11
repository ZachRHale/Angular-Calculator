'use strict';

var app = angular.module("calculator", [])
.controller("calcCtrl", function($scope) {
    $scope.total = 0;
    $scope.displayNumber = 0;
    $scope.draftHalf = 0;
    $scope.draftHalfDecimal = 0;
    $scope.operator = 'add'; // Tells the calculator what operation it should do next
    $scope.wholeOrDecimal = 'whole'; // Tells the calculator whether to be adding whole numbers or decimals

    $scope.wholeOrDecimalFunction = function (number) {
    	if ($scope.wholeOrDecimal == 'whole') {
    		//Add a number to the draftHalf variable
    		$scope.draftHalf = $scope.draftHalf * 10 + number;
    		$scope.displayNumber = $scope.draftHalf;

    	}

    	if ($scope.wholeOrDecimal == 'decimal') {

    		// Add a number as usual but instead to the draftHalfDecimal variable
    		$scope.draftHalfDecimal = $scope.draftHalfDecimal * 10 + number;

    		// Find the length of the decimal part
    		var length = $scope.draftHalfDecimal.toString().length; 

    		// Trunc the total then make the draftHalfDecimal variable a decimal and then add it to the whole half.
    		// This way we avoid round-off error which will throw everything off
    		$scope.draftHalf = Math.trunc($scope.draftHalf) + ($scope.draftHalfDecimal / Math.pow(10, length));
    		$scope.displayNumber = $scope.draftHalf;

    	};

    };

    $scope.reinit = function () {
    	$scope.total = 0;
	    $scope.displayNumber = 0;
	    $scope.draftHalf = 0;
	    $scope.draftHalfDecimal = 0;
	    $scope.operator = 'add'; 
	    $scope.wholeOrDecimal = 'whole';
    };

    $scope.operation = function() {

    	$scope.wholeOrDecimal = 'whole';

    	if ($scope.operator == 'add'){
    		$scope.total = $scope.total + $scope.draftHalf;
    		$scope.draftHalf = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

    	if ($scope.operator == 'subtract'){
    		$scope.total = $scope.total - $scope.draftHalf;
    		$scope.draftHalf = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

    	if ($scope.operator == 'divide'){
    		$scope.total = $scope.total / $scope.draftHalf;
    		$scope.draftHalf = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

    	if ($scope.operator == 'multiply'){
    		$scope.total = $scope.total * $scope.draftHalf;
    		$scope.draftHalf = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}
    };
});