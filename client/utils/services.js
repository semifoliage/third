//services.js
/*
    this file is to provide the services to client, such as network checking
*/
var utils=require('./util.js')

var networkStatus =()=>{
    wx.request({
        url:   `${config.service.requestUrl}`,
        login: false,
        success(result) {

        },
        fail(err){

        }
    })

};


var isEmptyObject= (obj)=>{

     if(JSON.stringify(obj.data)==="[]") return true;   //false ,  is empty
     return false;  //true , is not empty

};

var userInfoStorage=(obj)=>{
    wx.setStorage({
                    key: 'user',
                    data: obj,
                    success: function (res) {
                      console.log('successfully story user ');
                      console.log(res);
                    }
                  });
};

var getStorage =(key)=>{
    var result={};
    wx.getStorage({
          key: 'userRecords',
          success: function (res) {
            console.log('get the storage data from subfunction in service');
            result=res;
             },
           fail: function(err){
             console.log('storage inf can not be reload from subfunction in service. ');
             util.showModel('xxxx', 'xxxxxx');
           }
          });
    return result;
};

//validate number
var numberValidate =(num)=>{
    if (num===''||num==null){      
      utils.showModel('error', 'please fill number')
      return false;
    };
      if(!isNaN(num)){
        return true;
      }else{
        utils.showModel('error', 'please input number')
        return false;
    }

};


module.exports = { isEmptyObject, userInfoStorage, getStorage, numberValidate};