// pages/inputDataOne/inputDataOne.js
// input data page one

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var services= require('../../utils/services')
var page=require('../../utils/pageContent.js')
var pageText=page.inputDataOne.data;


Page({
  data: {
    userInfo: {},
    nickName:'',
    openId:'',
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    saveNextButtonStatus: false,
    hDate:'',
    weight_lasttimeNum: '',
    weightToHNum: '',
    beforeWeightNum: '',
    bloodHighNum:'',
    bloodLowNum:'',
    heartBitNum:'',
    next: "Save and Next",
    nextStatus: false,
    save: "Next",
    saveStatus: true,
    summary:'',
    service: {
      todayTitle: 'today time',
      pageTitle: 'Hello World really?',
      systemDate: '',
      userAccount: 'lala',
      inputValue: '',
      weight_lasttime: "Weight of last time",
      weight_lasttimeNum: "",
      beforeWeight: "before Weight (kg)",
      beforeWeightNum: '',
      weightToH: "weight to Hm",
      weightToHNum: "20",
      bloodHigh: 'Blood High Press',
      bloodHighNum:'',
      bloodLow:'Blood Low Press',
      bloodLowNum:'',
      heartBit: 'Heart Bit Number',
      heartBitNum:'',
      canIUse: wx.canIUse('button.open-type.getUserInfo')

    },
  },

  onLoad: function (options) {
    //check the existing records
    console.log(options.onH);
    var that =this;
    wx.request({
          url: `${config.service.host}/weapp/input` +'?openId='+options.openId +'&nextHDate='+options.nextHDate,
          method: 'get',
          login: true,
          success(result) {
            console.log(result);
            util.showSuccess('查询已输入数据完成');
            var param= {};
            if(services.isEmptyObject(result)){
                console.log('not input the data before')
                param.dateToH = options.nextHDate;
                param.lastWeight = options.weight;
                param.weightToH='';
                param.weightBeforeH='';
                param.highPressureBefore='';
                param.lowPressureBefore='';
                param.heartBeatRateB='';
                param.saveStatus=false;
            }else {
                param=result.data[0];
                param.saveStatus=true;
                console.log(param);
            };

            //set initial data
            that.setData({
              title: options.title,
              nickName:options.nickName,
              openId:options.openId,
              hDate: param.dateToH,
              weight_lasttimeNum: param.lastWeight,
              weightToHNum: param.weightToH,
              beforeWeightNum: param.weightBeforeH,
              bloodHighNum: param.highPressureBefore,
              bloodLowNum: param.lowPressureBefore,
              heartBitNum: param.heartBeatRateB,
              next: pageText.next,
              nextStatus: options.onH == 'N' ? true: false,
              save: options.onH == 'N' ? pageText.saveNew :pageText.saveUpdate ,
              saveStatus: options.onH == 'N' ? false : true,
              summary: pageText.summary,
              service: {
                todayTitle: 'Today : '+ util.formatTime(util.todayDate()),
                pageTitle: pageText.pageDate +': ' + options.nextHDate,//util.formatAll(util.todayDate()),
                systemDate: util.formatAll(util.todayDate()),
                userAccount: 'lala',
                inputValue: '',
                weight_lasttime: pageText.weight_lasttime,
                weight_lasttimeNum: options.weight,
                beforeWeight: pageText.beforeWeight,
                weightToH: pageText.weightToH,
                weightToHNum: "20",
                bloodHigh: pageText.bloodHigh,
                bloodHighNum: '140',
                bloodLow: pageText.bloodLow,
                bloodLowNum: '90',
                heartBit: pageText.heartBit,
                heartBitNum: '70',
                canIUse: wx.canIUse('button.open-type.getUserInfo')
                        }

                    })
              },
                fail(error) {
                  util.showModel('请求失败', error);
                  console.log('request fail', error);
                }
              });


  },

  //calculate the weight to h
  beforeWeightKeyInput: function (option) {
    //number validate
    if(!services.numberValidate(option.detail.value)&& option.detail.cursor==0){
            return
          }
    var newWeight = option.detail.value;
    var cleanWeight = newWeight - this.data.service.weight_lasttimeNum;
    this.setData({
      beforeWeightNum: option.detail.value,
      weightToHNum: cleanWeight.toFixed(1),
      saveStatus: false
    });

  },

  //update date once the inputs changed
  inputOneSave: function () {
    //check the input data valuable 
    if(this.data.beforeWeightNum==''){
      util.showModel(pageText.noInputTitle, pageText.noInputContent);
      return 
    }
    //submit the data
    util.showBusy('请求中...')
    var that = this
    console.log('start request  ' + config.service.inputFirstDataUrl)
    wx.request({
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `${config.service.host}/weapp/input`,
      method: 'post',
      data: {
              nickName:this.data.nickName,
              openId: this.data.openId,
              lastWeight: this.data.weight_lasttimeNum,
              weightBeforeH: this.data.beforeWeightNum,
              weightToH: this.data.weightToHNum,
              highPressBefore: this.data.bloodHighNum,
              lowPressBefore: this.data.bloodLowNum,
              heartBitRateB: this.data.heartBitNum,
              hDate: this.data.hDate,
              hospitalName: ''
            },
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data),
          nextStatus: false,
          save: 'Update',
          saveStatus: true
        });

        //navigate to inputoneshow page after input the inputDataOne
        console.log('navigate to inputOneShow')
        util.showSuccess('上机数据输入成功完成')
        var string= '&weightToH='+that.data.weightToHNum
                    +'&hDate='+that.data.hDate
                    +'&nickName='+that.data.nickName
                    +'&openId='+that.data.openId
                    +'&weightBeforeH='+that.data.beforeWeightNum
                    +'&lastWeight='+ that.data.weight_lasttimeNum
                    +'&highPressureBefore=' +that.data.bloodHighNum
                    +'&lowPressureBefore='+ that.data.bloodLowNum
                    +'&heartBeatRateB='+ that.data.heartBitNum
                    +'&hospitalName='+ '';
        wx.navigateTo({
              url: '../inputDataOneShow/inputDataOneShow?title=Input Data Two'+string,
          });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });


  },

  dataKeyInput: function(e){
    //number validate
     if(!services.numberValidate(e.detail.value)&& e.detail.cursor==0){
                return
              }
    switch(e.target.id)
        {
            case 'bloodHigh':
                this.setData({
                  bloodHighNum : e.detail.value
                });
                break;
            case 'bloodLow':
                this.setData({
                  bloodLowNum : e.detail.value
                });
                break;
            case 'heartBit':
              this.setData({
                heartBitNum: e.detail.value
              });
              break;
        }
  },

  //inputOneSummary
  inputOneSummary: function () {
     var string= '&weightToH='+this.data.weightToHNum
                    +'&hDate='+this.data.hDate
                    +'&nickName='+this.data.nickName
                    +'&openId='+this.data.openId
                    +'&weightBeforeH='+this.data.beforeWeightNum
                    +'&lastWeight='+ this.data.weight_lasttimeNum
                    +'&highPressureBefore=' +this.data.bloodHighNum
                    +'&lowPressureBefore='+ this.data.bloodLowNum
                    +'&heartBeatRateB='+ this.data.heartBitNum
                    +'&hospitalName='+ '';
    wx.navigateTo({
          url: '../inputDataOneShow/inputDataOneShow?title=Input Data Two'+string,
        });

  },

  inputOneNext: function(){
    var string= '&weightToH='+this.data.weightToHNum
                +'&hDate='+this.data.hDate
                +'&nickName='+this.data.nickName
                +'&openId='+this.data.openId
                +'&weightBeforeH='+this.data.beforeWeightNum
                +'&lastWeight='+ this.data.weight_lasttimeNum
                +'&highPressureBefore=' +this.data.bloodHighNum
                +'&lowPressureBefore='+ this.data.bloodLowNum
                +'&heartBeatRateB='+ this.data.heartBitNum
                +'&hospitalName='+ '';

    wx.navigateTo({
      url: '../inputDataTwo/inputDataTwo?title=Input Data Two'+string,
    });
    console.log(string);
  },
  nex: function(e){
        wx.switchTab({
              url: '../main/main',
            });
    }



})
