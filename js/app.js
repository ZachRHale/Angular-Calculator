'use strict';

var $ = require('jquery');
var angular = require('angular');

var app = angular.module("calculator", [])
.controller("calcCtrl", function($scope) {
    $scope.total = 0;
    $scope.displayNumber = 0;
    $scope.decimalPlace = 1;
    $scope.draftNumber = 0;
    $scope.finalNumber = 0;
    $scope.operator = 'add'; // Tells the calculator what operation it should do next
    $scope.wholeOrDecimal = 'whole'; // Tells the calculator whether to be adding whole numbers or decimals

    $scope.wholeOrDecimalFunction = function (number) {
    	if ($scope.wholeOrDecimal == 'whole') {
    		//Add a number to the draftNumber variable
    		$scope.draftNumber = $scope.draftNumber * 10 + number;
            $scope.finalNumber = $scope.draftNumber;
    		$scope.displayNumber = $scope.finalNumber;

    	}

    	if ($scope.wholeOrDecimal == 'decimal') {

    		// Add a number as usual 
    		$scope.draftNumber = $scope.draftNumber * 10 + number;


    		// Keep track of how far the decimal is
    		$scope.decimalPlace = $scope.decimalPlace + 1;

            // Do this conditional to show the 0 when it's immediately entered after a decimal
            if (number == 0 && $scope.decimalPlace == 1){
                $scope.finalNumber = $scope.draftNumber / (Math.pow(10, $scope.decimalPlace));
                $scope.displayNumber = $scope.finalNumber.toFixed(1);

            } else {
                // Take the draft number and divide it to move the decimal to the appropriate place
                $scope.finalNumber = $scope.draftNumber / (Math.pow(10, $scope.decimalPlace));
                console.log($scope.finalNumber);
                $scope.displayNumber = $scope.finalNumber;


            }

    		
    	};

    };

    $scope.reinit = function () {
    	$scope.total = 0;
	    $scope.displayNumber = 0;
	    $scope.draftNumber = 0;
	    $scope.decimalPlace = 0;
	    $scope.operator = 'add'; 
	    $scope.wholeOrDecimal = 'whole';
    };

    $scope.operation = function() {

    	if ($scope.operator == 'add'){
    		$scope.total = $scope.total + $scope.finalNumber;
    		$scope.displayNumber = $scope.total;
            $scope.draftNumber = 0;
            $scope.finalNumber = 0;
    		
    	}

    	if ($scope.operator == 'subtract'){
    		$scope.total = $scope.total - $scope.finalNumber;
    		$scope.draftNumber = 0;
            $scope.finalNumber = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

    	if ($scope.operator == 'divide'){
    		$scope.total = $scope.total / $scope.finalNumber;
    		$scope.draftNumber = 0;
            $scope.finalNumber = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

    	if ($scope.operator == 'multiply'){
    		$scope.total = $scope.total * $scope.finalNumber;
    		$scope.draftNumber = 0;
            $scope.finalNumber = 0;
    		$scope.displayNumber = $scope.total;
    		
    	}

        $scope.wholeOrDecimal = 'whole';
        $scope.decimalPlace = 0;

    };
});