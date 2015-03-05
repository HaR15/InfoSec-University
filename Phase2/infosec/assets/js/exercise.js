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
	            if(data["validation"]=="true"){
	            	$("#validation-sucess").toggle(true);
   					$("#button-submit").toggle(false);
   					$("#button-more").toggle(true);
	            }else{
	            	$("#validation-invalid").toggle(true);            	
   					
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
   		});


   	$("#validation-sucess").toggle(false);
   	$("#validation-invalid").toggle(false);
   	$("#button-more").toggle(false);
        
    

});




