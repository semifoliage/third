//utils/pageContent.js
/*
    show the page content
*/

var inputDataOneShow = {
    text:{
      pageTitle: '透析上机数据',
      systemDate: '',
      userAccount: 'lala',
      inputValue: '',
      weight_lasttime: "上次下机体重",
      weight_lasttimeNum: "",
      beforeWeight: "本次上机体重",
      beforeWeightNum: '',
      analyzeWeight:"预计下机体重",
      weightToH: "体重增加",
      weightToHAdjust: "调整后透析量",
      weightToHNum: "20",
      bloodHigh: '血压高血压',
      bloodHighNum:'',
      bloodLow:'血压低血压',
      bloodLowNum:'',
      heartBit: '心跳',
      heartBitNum:'',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      kg: "(Kg)",
      updateButton:'更新数据',
      okButton: '返回上机',
      nextButton:'输入下机数据'

    }
};

var index = {
    data: {
      newuserWorning: '',
      bingLiBen: "肾病综合症（透析小本）"
    }
};

var main= {
        data: {
          lastHDateText: '上次透析日期 ',
          lastHWeightText: '上次下机体重:  ',
          nextHDateText: "下次透析日期 ",
          nextHstartText: '上机状态: ',
          start: '已经开始透析',
          notStart: '未开始透析',
          submit: "submit",
          inputDataOneNew: '输入上机透析数据',
          inputDataOneUpdate: '输入下机透析数据',
          inputDataTwo: "输入2上机透析数据",
          queryData: "查询透析历史数据",
          listAllData: "list all old data"
        }
};

var inputDataOne={
    data:{
        weight_lasttime: "上次下机体重",
        weight_lasttimeNum: '',
        beforeWeight: "此次上机前体重",
        weightToH: "需要透析体重",
        weightToHNum: "20",
        bloodHigh: '高血压',
        bloodHighNum: '140',
        bloodLow: '低血压',
        bloodLowNum: '90',
        heartBit: '心跳',
        heartBitNum: '70',
        next: '输入下机数据',
        saveNew:'输入上机数据',
        saveUpdate:'上机数据已经输入',
        summary:'展示上机数据给医生'

    }
};

var inputDataTwo={
    data:{
        weight_toH: '需要透析体重',
        afterWeight: '下机体重',
        weightH:'实际减少体重',
        OverH:'多透析的体重',
        bloodHighPressureAfter: '高血压',
        bloodLowPressureAfter: '低血压',
        heartBitAfter: '心跳',
        hDuration: 'duration of H',
        hasUserInfo: false,
        userAccount: 'lala',
        inputValue: '',
        saveNext: "Save and Next",
        save: "保存数据",
    }
};

module.exports = {index, inputDataOneShow, main, inputDataOne, inputDataTwo}