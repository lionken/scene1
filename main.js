function GK_InitProcess() {
    GK.process = {};
    if(GK.screen == GK.SCREEN_TYPE.LED) {
        GK.process = new GK_WebPageProcess();
    } else if(GK.screen == GK.SCREEN_TYPE.ANDROID) {
        GK.process = new GK_AndroidProcess();
    } else if(GK.screen == GK.SCREEN_TYPE.ACTIVITY) {
        GK.process = new GK_ActivityProcess();
    } else {
        throw "暂时不支持该屏幕类型";
    }
    GK.process.configGameSocketCallback(new GameSocketCallback());
}

function GK_InitAudioPlayer() {
    GK.AudioPlayer = {};

    if(GK.screen == GK.SCREEN_TYPE.LED || GK.screen == GK.SCREEN_TYPE.ACTIVITY) {
        GK.AudioPlayer = new GK_WebAudioPlayer();
    } else if(GK.screen == GK.SCREEN_TYPE.ANDROID) {
        GK.AudioPlayer = new GK_AndroidAudioPlayer();
    } else {
        throw "暂时不支持该屏幕类型";
    }

    GK.AudioPlayer.initEffect(effects);
}

function GK_InitVideoPlayer() {
    GK.VideoPlayer = {};

    if(GK.screen == GK.SCREEN_TYPE.LED || GK.screen == GK.SCREEN_TYPE.ACTIVITY) {
        GK.VideoPlayer = new GK_WebVideoPlayer();
    } else if(GK.screen == GK.SCREEN_TYPE.ANDROID) {
        GK.VideoPlayer = new GK_AndroidVideoPlayer();
    } else {
        throw "暂时不支持该屏幕类型";
    }
}

function GK_Start() {
    GK_InitProcess();

    GK_InitAudioPlayer();

    GK.process.run();
}

function getGameInfo() {
    GK.process.getGameInfo();
}

function initGameConfig() {
    GK.process.initGameConfig();
}

function gameConnect() {
    GK.process.gameConnect();
}

function gameStart() {
    GK.process.gameStart();
}

cc.game.prepare(function() {
    GK_Start();
});

cc.game.onStart = function() {
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) {
        document.body.removeChild(document.getElementById("cocosLoading"));
    }

    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    cc.view.adjustViewPort(false);
    cc.view.setDesignResolutionSize(GK.screen_width, GK.screen_height, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(false);

    //load resources
    cc.LoaderScene.preload(g_resources, function() {
        cc.director.runScene(new GameScene());
    }, this);
};


