/*
This file contains miscallaneous functions which are used throughout the app.
Custom conversions, like the JS date object to SQLite timestamp conversion function
we have is defined in this file. This file is imported in every endpoint file.
*/


module.exports = {
  DateMePlease: function(){
    Number.prototype.padLeft = function(base,chr){
       var  len = (String(base || 10).length - String(this).length)+1;
       return len > 0? new Array(len).join(chr || '0')+this : this;
    }

        var d = new Date,
            dformat = [ d.getFullYear(),
                        (d.getMonth()+1).padLeft(),
                        d.getDate().padLeft()].join('-')+
                        ' ' +
                      [ d.getHours().padLeft(),
                        d.getMinutes().padLeft(),
                        d.getSeconds().padLeft()].join(':');
      return dformat;
    }

}
