//配置信息
GK.debug = false; //是否为debug模式，输入log


GK.screen = GK.SCREEN_TYPE.ACTIVITY; //屏幕类型
GK.screen_offset_x = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.screen.posX : 0; //屏幕左上角X坐标偏移量
GK.screen_offset_y = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.screen.posY : 0; //屏幕左上角Y坐标偏移量
GK.screen_width = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.screen.width : 1366; //屏幕宽
GK.screen_height = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.screen.height : 768; //屏幕高

GK.scene_title = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.title : "开心大炮"; //场景名称
GK.scene_max_connection = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.maxConnection : 1000; //场景最大连接人数
GK.scene_duration = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? 1800 : 300; //场景时长
GK.scene_mvp_show_duration = 10; //MPV最短展示时间（秒）

//**************配置LED必填信息***********
GK.waitTime = 60; //等待用户加入的时间
GK.user_id = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.uid : undefined; //用户id
GK.screen_id = "57a1877d56906cbe7015fafe"; //屏幕id
GK.scene_wechat_url = "http://scene.goooku.com/scene/v1/wechat/cannonTest"; //微信对应场景的URL
GK.scene_id = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.muid : "576b7fa03ea2b40b4f0c84a2"; //场景id
GK.scene_plan_id = "57a1882156906cbe7015fb01"; //计划id
GK.activity_id = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.auid : undefined; //活动id
GK.access_token = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.accessToken: undefined; //access token
GK.scene_oid = (GK.screen == GK.SCREEN_TYPE.ACTIVITY) ? GKSceneCfg.oid : undefined; //活动中场景对应唯一id
//**************配置其它自定义信息***********
