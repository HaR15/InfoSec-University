/**
 * ValidatorService
 *
 * @module      :: Service
 * @description :: Service to validate Exercises
 * @docs        :: http://sailsjs.org/#!documentation/services
 *
 */

module.exports = {
	
	validate: function(exercise, code){

    switch(exercise.validationType){

      // fullMatchString will match the received solution to the expected solution using exact string match
      case "fullMatchString":
        var received = String(code).replace(/[\n\r\t]/g,'').replace(/ /g,'');
        var expected = exercise.expected[0].replace(/[\n\r\t]/g,'').replace(/ /g,'');
        if(received===expected){
          return true;
        }else{
          return false;
        }

        break;

      // partialMatchString will match the received solution to the expected solution using partial string matching
      // by checking the list of partial string matches in the expected solution that must be in the received solution
      // and in the same order 
      case "partialMatchString":
        var received = String(code).replace(/[\n\r\t]/g,'').replace(/ /g,'');
        var validated = false;
        for(var i=0;i<exercise.expected.length;i++){
          var expected = exercise.expected[i].replace(/[\n\r\t]/g,'').replace(/ /g,'').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

          var re = new RegExp(expected, "g");
          if(re.test(received)){
            validated=true;
          }else{
            validated=false;
            break;
          }

        }

        return validated;

        break;

      case "multipleAnswers":
        var received = String(code).replace(/[\n\r\t]/g,'').replace(/ /g,'');
        var validated = false;
        for(var i=0;i<exercise.expected.length;i++){
          var expected = exercise.expected[i].replace(/[\n\r\t]/g,'').replace(/ /g,'').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

          var re = new RegExp(expected, "g");
          if(re.test(received)){
            validated = true;
            break;
          }
            

        }

        return validated;

        break;


      default:
        return false;
        break

    }

  }

}