(function() {

  function getFormData() {
    var formElements=document.getElementById("myForm").elements;    
    var formData={};

    for (var i=0; i<formElements.length; i++) {
      //we dont want to include the submit-buttom
      if (formElements[i].type!="submit") {
        formData[formElements[i].name] = formElements[i].value;
      }
    }

    return formData;
  };

  function outputFirstName(firstName) {
  	var value = firstName.split('').join(' ');
  	document.querySelector('#first-name-div').innerHTML = value;
  };

  function outputLastName(lastName) {
  	var value = lastName.split('').reverse().join('');
    document.querySelector('#last-name-div').innerHTML = value;
  };

  function outputFavoriteFood(favoriteFood) {
    var numbers = [];
    var sum = 0;

    for (var i=0; i<favoriteFood.length; i++) {
      var num = favoriteFood.charCodeAt(i)
      numbers.push(num);
      sum += num;
    }

    var value = numbers.join(' + ') + " = " + sum;
    document.querySelector('#favorite-food-div').innerHTML = value;

    //Bonus
    var numbers_bonus = [];

    var prev = -1;
    var prev_sum = 1;

    for (var i=0; i<numbers.length; i++) {
      var num = numbers[i];

      if (num == prev)  {
        prev_sum += 1;
        numbers_bonus.pop();
        numbers_bonus.push("" + num + " x " + prev_sum + "");
      } else {
        numbers_bonus.push(num);
        prev = num;
        prev_sum = 1;
      }
    }
    value = numbers_bonus.join(' + ') + " = " + sum;
    document.querySelector('#favorite-food-div-bonus').innerHTML = value;
  };

  function outputFavoriteNumber(favoriteNumber) {
    var value = 1;

    for (var i=1; i<favoriteNumber; i++) {
      if (favoriteNumber % i == 0) {
        value = i;
      }
    } 

    document.querySelector('#favorite-number-div').innerHTML = value;
  };

  function getDateString(date) {
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()%2000;
  }

  function outputFavoriteDay(favoriteDay) {
    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    var day_num = days.indexOf(favoriteDay) +  1;

    var today = new Date();
    var tomorrow = new Date(today); 
    tomorrow.setDate(today.getDate()+1);

    //find the next favorite day, start with tomorrow
    var next_fav_day = tomorrow;
    while (next_fav_day.getDay() !== day_num) {
      //go to next day
      next_fav_day.setDate(next_fav_day.getDate()+1);
    }

    var result = [ getDateString(next_fav_day) ];

    //get the other 5 dates
    for (var i=0; i<5; i++) {
      next_fav_day.setDate(next_fav_day.getDate()+7);
      result.push(getDateString(next_fav_day));
    }

    var value = result.join(", ");
    document.querySelector('#favorite-day-div').innerHTML = value;

  };

  function outputFavoriteColor(favoriteColor) {
    var hex_codes = {
      'White': '#FFFFFF',
      'Black': '#000000',
      'Yellow': '#ffff00',
      'Blue': '#0000ff',
      'Red': '#ff0000',
      'Green': '#00ff00',
      'Purple': '#551a8b'
    };

    var value = hex_codes[favoriteColor];
    document.querySelector('#favorite-color-div-hexcode').innerHTML = value;
    document.querySelector('#favorite-color-div-hexcode').style.color = value;
    document.querySelector('#favorite-color-div').style.background = value;
  }

  document.getElementById("myForm").onsubmit=function(){
  	var formData = getFormData();
  	console.log(formData);

    outputFirstName(formData["firstName"]);
    outputLastName(formData["lastName"]);
    outputFavoriteFood(formData["favoriteFood"]);
    outputFavoriteNumber(formData["favoriteNumber"]);
    outputFavoriteDay(formData["favoriteDay"]);
    outputFavoriteColor(formData["favoriteColor"]);
    
    //reset form
    document.getElementById("myForm").reset();

    //prevent page refresh
    return false;
  };

})();