$(function(){

	var exerciseSuccess = '<div id="validation-sucess" class="exercise-alert" style="color: green;">Well done! You successfully completed the exercise.</div>';
	var exerciseFailure = '<div id="validation-invalid" class="exercise-alert" style="color: red;">Oops, try again.</div>';

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
	            if(data["validation"]=="true"){
	            	//$("#validation-sucess").toggle(true);
	            	$("#validation-message").html(exerciseSuccess);
   					$("#button-submit").toggle(false);
   					$("#button-more").toggle(true);
	            	$("#exercise-picture-before").toggle(false);   					
	            	$("#exercise-picture-after").toggle(true);   					
	            }else{
	            	//$("#validation-invalid").toggle(true);
	            	$("#validation-message").html(exerciseFailure);
	            	$("#exercise-picture-failure").toggle(true);
	            	$("#exercise-picture-before").toggle(false);
	            	$("#exercise-picture-after").toggle(false);

	            }
	        }
	    });


	  	e.preventDefault();
	  	e.unbind();
		
	});


		var textarea = $('#code');

        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/twilight");
        editor.getSession().setMode("ace/mode/sql");

        editor.getSession().on('change', function () {
       		textarea.val(editor.getSession().getValue());
       		$("#validation-sucess").toggle(false);
   			$("#validation-invalid").toggle(false);
   			$("#button-more").toggle(false);
   			$("#button-submit").toggle(true);
			$("#exercise-picture-before").toggle(true);
			$("#exercise-picture-after").toggle(false);
			$("#exercise-picture-failure").toggle(false);

   		});


   	$("#validation-sucess").toggle(false);
   	$("#validation-invalid").toggle(false);
   	$("#button-more").toggle(false);
	$("#exercise-picture-after").toggle(false);
	$("#exercise-picture-failure").toggle(false);
       
    

});




