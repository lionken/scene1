var MainLayer = GK_MainLayer.extend({
    tip:3,
    cheerTip:0,
    time:null,
    firstRank:true,
    ctor: function() {
        this._super();
        //基层
        this.w = GK.const.WIDTH;
        this.h = GK.const.HEIGHT;
        this.mainNode = new cc.LayerColor(cc.color(0, 0, 0, 0), this.w, this.h);
        this.mainNode.setScale(GK.screen_width / this.w, GK.screen_height / this.h);
        this.mainNode.setPosition(cc.p(0, 0));
        this.mainNode.setAnchorPoint(cc.p(0, 0));
        this.addChild(this.mainNode, GK.const.ZORDER.ZERO);


        //添加studio层
        this._studio_layer = this.loadStudioJsonFile(res.mainLayer_studio_json);
        this._studio_layer.setPosition(cc.p(0, 0));
        this.mainNode.addChild(this._studio_layer, GK.const.ZORDER.ZERO);

        //绑定控件
        this._logo = this.getStudioWidgetByName(this._studio_layer, "logo");
        this._pass = this.getStudioWidgetByName(this._studio_layer, "pass");
        this._help = this.getStudioWidgetByName(this._studio_layer, "help");
        this._tree = this.getStudioWidgetByName(this._studio_layer, "tree");
        this._rank = this.getStudioWidgetByName(this._studio_layer, "rank");
        this._girl = this.getStudioWidgetByName(this._studio_layer, "girl");
        this._loadingBar = this.getStudioWidgetByName(this._studio_layer, "loadingBar");
        this._left_time = this.getStudioWidgetByName(this._studio_layer, "left_time");
        this._gameLayer = this.getStudioWidgetByName(this._studio_layer, "gameLayer");
        this._dlgNode = this.getStudioWidgetByName(this._studio_layer, "dlgNode");
        this._left_time.setString(GK.const.TIME);
        this._dlg = this.getStudioWidgetByName(this._dlgNode, "qipao_dlg");
        this.isDlgPlaying = false;

        //给对话框创建clipNode
        for(var i =1;i<=2;i++)
        {
            var head = this.getStudioWidgetByName(this._dlgNode, "head"+i);
            var clipp = new cc.ClippingNode();
            var stencil = new cc.Sprite(res.head_png);
            var content = new cc.Sprite(res.gankuai_logo);
            content.setScale(0.7);
            clipp.setStencil(stencil);
            clipp.setInverted(false);
            clipp.setAlphaThreshold(0);
            clipp.addChild(content,1,GK.const.TAG.ICON);
            this._dlg.addChild(clipp, 1, i);
            clipp.setPosition(head.getPosition());
            clipp.width = 50;
            clipp.height = 50;
            clipp.setScale(1.5);
        }


        //初始化变量
        this.passTime = 0;
        this.gameState = 1;
        this.rankNameNodes = [];
        for(var i =0;i<7;i++)
        {
            this.rankNameNodes[i] = this.getStudioWidgetByName(this._rank, "name_node_"+(i+1));
            this.rankNameNodes[i].setVisible(false);
            var head = this.getStudioWidgetByName( this.rankNameNodes[i], "head");
            var score = this.getStudioWidgetByName( this.rankNameNodes[i], "score");
            score.setString(0);
            var clipp = new cc.ClippingNode();
            var stencil = new cc.Sprite(res.head_png);
            var content = new cc.Sprite(res.gankuai_logo);
            content.setScale(0.7);
            clipp.setStencil(stencil);
            clipp.setInverted(false);
            clipp.setAlphaThreshold(0);
            clipp.addChild(content,1,GK.const.TAG.ICON);
            this.rankNameNodes[i].addChild(clipp, 1, GK.const.TAG.CLIP_NODE);
            clipp.setPosition(head.getPosition());
            clipp.width = 50;
            clipp.height = 50;
        }




        var self = this;
        self.playStudioAction(self._studio_layer,res.mainLayer_studio_json,"move1",false);
        this.runAction(cc.sequence(
            cc.delayTime(1),cc.callFunc(function()//播放logo动画
            {
                self.playStudioAction(self._logo,res.logoNode_studio_json,"play",false);
                self.playStudioAction(self._pass,res.passNode_studio_json,"play",false);
            }),
            cc.delayTime(3),cc.callFunc(function()//播放帮助墙壁移动动画
            {
                self.playStudioAction(self._studio_layer,res.mainLayer_studio_json,"move2",false);
            }),
            cc.delayTime(1),cc.callFunc(function()//播放帮助动画
            {
                self.playStudioAction(self._help,res.helpNode_studio_json,"play",false);
            }),
            cc.delayTime(5),cc.callFunc(function()//播放游戏墙壁移动动画
            {
                self.playStudioAction(self._studio_layer,res.mainLayer_studio_json,"move3",false);
            }),
            cc.delayTime(1),cc.callFunc(function()
            {
                self.show321();
                self.ligthUp();
            })
        ));




        //this._logo.runAction(cc.sequence(cc.delayTime(3),cc.fadeOut(1),cc.callFunc(function()
        //{
        //    self._help.setVisible(true);
        //    self.playStudioAction(self._help,res.helpNode_studio_json,"play",false);
        //    self._help.runAction(cc.sequence(cc.delayTime(5),cc.fadeOut(1),cc.callFunc(function()
        //    {
        //        self._gameLayer.setVisible(true);
        //
        //
        //    }),cc.delayTime(0.3),cc.callFunc(function()
        //    {
        //        //self.playStudioAction(self._rank,res.rankNode_studio_json,"play",true);
        //        //self.playStudioAction(self._girl,res.gilrNode_studio_json,"play",true);
        //
        //    })));
        //})));

        GK.AudioPlayer.playMusic("res/sayHi.mp3",100,true);
        //this.showPreBackground();
        return true;
    },
    ligthUp:function()
    {
        var self = this;



        self.playStudioAction(self._studio_layer,res.mainLayer_studio_json,"play",false);
        this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function()
        {
            self.playStudioAction(self._tree,res.treeNode_studio_json,"play",false);
        }),
            cc.delayTime(1),cc.callFunc(function()
            {
                self.playStudioAction(self._girl,res.gilrNode_studio_json,"play",false);
            }),
            cc.delayTime(1),cc.callFunc(function()
            {
                self.playStudioAction(self._rank,res.rankNode_studio_json,"play",false);
            })
        ));

    },
    countTime:function()
    {
        if(this.gameState == 2)return;

        this.passTime++;

        if(this.passTime <= GK.const.TIME*25)
        {
            this._loadingBar.setPercent(100-this.passTime/(GK.const.TIME*25)*100);

            this._left_time.setString(Math.floor((GK.const.TIME*25-this.passTime)/25))
        }
        else if(this.passTime > GK.const.TIME*25 && this.gameState == 1)
        {

        }


    },
    //321倒计时
    show321: function() {
        var self = this;
        var counterLayer = new GK_CountDownLayerV1();
        this.mainNode.addChild(counterLayer, 5);
        counterLayer.startCountDown(function() {
            self.schedule(self.countTime);
            self.gameState = 1;
            self.showBG();
            GK.GameDataSender.sendGameData({id:GK.const.SOCKET_ID.START,randStartIndex:Math.floor(Math.random()*300)});

        });
    },
    //开始主场景
    showBG:function(){
        //显示排行榜
        this.startTime();
    },
    //绘制排行榜背景
    createList:function(){
        this.addSprite(GK.const.IMAGE_NAME.RankingBg,1.5,1.5,this.w/2,this.h*1.5,GK.const.ZORDER.ONE,GK.const.TAG.RankingBG,this.mainNode);

        var RankingFrame = this.mainNode.getChildByTag(GK.const.TAG.RankingBG);

        for(var i = 0;i<7;i++) {
            this.addSprite(GK.const.IMAGE_NAME.information,1.1,1.1,RankingFrame.width/2,RankingFrame.height*0.78-RankingFrame.height*0.12*i,GK.const.ZORDER.ONE,GK.const.TAG.CELLTAG+i,RankingFrame);
        }
    },
    //开始倒计时start
    startTime:function(){
        this.step = GK.const.TIME;
        this.schedule(this.tickLabel,1);
    },
    tickLabel:function(){
        this.step--;
        if(this.step < 0){
            //游戏结束
            this.unschedule(this.tickLabel);
            //游戏结束
            this.gameOver();
        }else{
            this.freshRank();
        }
    },
    //开始倒计时end
    gameOver:function(){
        if(GK.UserManager.getUserCount()>0){
            GK.UserManager.setAllUsersWin(1);
            var userIdxArr = GK.UserManager.rankUserFinal();
            var gameResult = GK.UserManager.generateGameResult(userIdxArr);
            console.log("666666666");
            console.log(userIdxArr);
            console.log(gameResult);
            this._rank.setVisible(false);
            if(gameResult)
            {
                for(var i = 0; i < gameResult.length; i++) {
                    var userWin = GK.UserManager.getUserByIdx(gameResult[i].uIdx);
                    if(userWin && userWin.mWin == 1)userArray.push(userWin);
                }
            }

            //不发卷
            this.showMvpLayer(GK.UserManager.getUserByIdx(userIdxArr[0]));


            GK.GameDataSender.sendActivityResult(gameResult,function(err)
            {

            });



        }else{
            this._rank.setVisible(false);
            this.showMvpLayer(null);

        }
    },
    //不发卷
    showMvpLayer:function(aMVPInfo)
    {
        var mvpLayer = new GK_MvpLayerV3();
        this.mainNode.addChild(mvpLayer, 100);

        var mvps = [];
        if(aMVPInfo)
        {
            var user = aMVPInfo;
            if(user) {
                mvps.push({
                    userIcon: user.getAvatarUrl(),
                    sex: user.getSex(),
                    nickname: user.getNickname()
                });
            }
        }
        mvpLayer.showMVP(mvps);
    },
    //刷新动态排行
    freshRank: function() {
        var ranker = GK.UserManager.getRealTimeRanker();
        var user = GK.UserManager.getUsers();
        var num = GK.UserManager.getUserCount() > 6 ? 6 : GK.UserManager.getUserCount();
        var userIdx = ranker.rankUsers(GK.UserManager.getUsers(), num);
        console.log(user);
        for(var i = 0; i < this.rankNameNodes.length; i++) {

            var cell = this.rankNameNodes[i];
            if(i<num)
            {
                cell.setVisible(true);
                //头像
                var icon = cell.getChildByTag(GK.const.TAG.CLIP_NODE).getChildByTag(GK.const.TAG.ICON);
                if(icon) {
                    icon.removeFromParent(true);
                }

                if(user[userIdx[i]].getAvatarUrl()){
                    icon = new cc.Sprite(user[userIdx[i]].getAvatarUrl());
                    cell.getChildByTag(GK.const.TAG.CLIP_NODE).addChild(icon,1,GK.const.TAG.ICON);
                }

                //昵称
                var name = this.getStudioWidgetByName(cell,"name");
                var scoreSprite =  this.getStudioWidgetByName(cell,"score");

                var nickName = user[userIdx[i]].getNickname();
                var score = user[userIdx[i]].getScore();
                console.log(score);
                if(this.getStringLength(nickName) > 5) {
                    nickName =
                        nickName.substring(0, this.getStringIndex(nickName)) + "..";
                }
                name.setString(nickName);
                scoreSprite.setString(score);
            }
            else
            {
                cell.setVisible(false);
            }

        }
    },

    //返回MainNode
    getMainNode: function() {
        return this.mainNode;
    },

    //数据绑定后数据变化
    onData: function(key, value) {
    },

    //数据绑定后数据删除
    delData: function(key) {
    },
    //场景中添加文本方法
    addLabel: function(text, font, size, color, scaleX, scaleY, posX, posY, Zorder, tag, parent) {
        var label = cc.LabelTTF.create(text, font, size);
        label.setColor(color);
        label.setScale(scaleX, scaleY);
        label.setPosition(cc.p(posX, posY));
        parent.addChild(label, Zorder, tag);
        return label;
    },
    //场景中添加精灵方法
    addSprite: function(name, scaleX, scaleY, posX, posY, Zorder, tag, parent) {
        var sprite = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(name + ".png"));
        sprite.setScale(scaleX, scaleY);
        sprite.setPosition(cc.p(posX, posY));
        parent.addChild(sprite, Zorder, tag);
        return sprite;
    },
    addUrlSprite: function(name, scaleX, scaleY, posX, posY, Zorder, tag, parent) {
        var sprite = new cc.Sprite(name);
        sprite.setScale(scaleX, scaleY);
        sprite.setPosition(cc.p(posX, posY));
        parent.addChild(sprite, Zorder, tag);
        return sprite;
    },
    getStringIndex: function(aStr) {
        var len = 0;
        for(var i = 0; i < aStr.length; i++) {
            if(aStr.charCodeAt(i) > 127 || aStr.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
            if(len >= 10)return i;
        }
        return aStr.length;
    },

    getStringLength: function(aStr) {
        var len = 0;
        for(var i = 0; i < aStr.length; i++) {
            if(aStr.charCodeAt(i) > 127 || aStr.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    },
    loadStudioJsonFile: function(jsonFile) {
        var json = ccs.load(jsonFile);
        return json.node;
    },
    getStudioWidgetByName: function(root, widgetName) {
        if(!root) {
            cc.log("getStudioWidgetByName error root null");
            return null;
        }
        var widget = ccui.helper.seekWidgetByName(root, widgetName);
        if(!widget) {
            cc.log("getStudioWidgetByName error widgetName " + widgetName + " rootName " + root.getName());
            return null;
        }
        return widget;
    },
    playStudioAction: function(root, json_file, name, loop, speed) {
        var json = ccs.load(json_file);
        var action = json.action;

        if(!!speed) {
            action.setTimeSpeed(speed);
        }

        if(action) {
            root.runAction(action);
            action.play(name, loop);
        }
        return action;
    },
    showDlg: function(index1,index2) {
        var self = this;
        var player1 = GK.UserManager.getUserByIdx(index1);
        var player2 = GK.UserManager.getUserByIdx(index2);
        if(player1 && player2 &&  this.isDlgPlaying == false)
        {
            var head1 = this._dlg.getChildByTag(1).getChildByTag(GK.const.TAG.ICON);
            var head2 = this._dlg.getChildByTag(2).getChildByTag(GK.const.TAG.ICON);
            head1.removeFromParent();
            head2.removeFromParent();
            var iconUrl = [0,player1.mAvatarUrl,player2.mAvatarUrl];
            var nickNames = [0,player1.mNickname,player2.mNickname];
            for(var i =1;i<=2;i++)
            {
                var head = this.getStudioWidgetByName(this._dlgNode, "head"+i);
                var text = this.getStudioWidgetByName(this._dlgNode, "text"+i);

                var nickName = nickNames[i];
                if(this.getStringLength(nickName) > 5) {
                    nickName = nickName.substring(0, this.getStringIndex(nickName)) + "..";

                }
                if(i == 1)nickName+="对";
                if(i == 2)nickName+="SayHi";

                text.setString(nickName);


                var clipp = this._dlg.getChildByTag(i);
                var content = new cc.Sprite(iconUrl[i]);
                content.setScale(0.7);
                clipp.addChild(content,1,GK.const.TAG.ICON);
            }
            self.playStudioAction(self._dlgNode,res.dlgNode_studio_json,"play",false);
            this.isDlgPlaying = true;

            this.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function()
            {
                self.isDlgPlaying = false;
            })));
        }
    },
});