//全局配置信息

var GK = GK || {};

//**************配置屏幕信息***********
GK.SCREEN_TYPE = {
    LED: 1,
    ANDROID: 2,
    ACTIVITY: 3
};

//*************全局变量****************
GK.KVPStore = null;
GK.UserManager = null;
GK.MainLayer = null;
GK.GameDataSender = null;
GK.AudioPlayer = null;

//**************全局作用域***********
GK.global = GK.global || {};
var userArray =[];