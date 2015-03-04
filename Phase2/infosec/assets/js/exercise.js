$(function(){

	$("#submitExercise").submit(function(e){

		var postData = $(this).serialize();
    	//var formURL = $(this).attr("action");

    	console.log(postData);

	  $.ajax(
	    {
	        url : "/exercise/validate?" + postData,
	        type: "GET",
	        dataType : "json",
	        success: function(data, textStatus, jqXHR) 
	        {
	            alert(JSON.stringify(data));
	        }
	    });


	  	e.preventDefault();
	  	e.unbind();
		
	});

});


