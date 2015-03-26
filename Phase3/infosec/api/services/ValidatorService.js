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

      case "fullMatchString":
        var received = String(code).replace(/[\n\r\t]/g,'').replace(/ /g,'');
        var expected = exercise.expected[0].replace(/[\n\r\t]/g,'').replace(/ /g,'');
        if(received===expected){
          return true;
        }else{
          return false;
        }

        break;

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