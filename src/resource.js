var res = {
    //321倒计时 V1
    countDown_v1_plist: "res/countDown_V1.plist",
    countDown_v1_png: "res/countDown_V1.png",

    //场景内
    mainLayer_studio_json:"res/mainLayer.json",
    gilrNode_studio_json:"res/gilrNode.json",
    helpNode_studio_json:"res/helpNode.json",
    rankNode_studio_json:"res/rankNode.json",
    treeNode_studio_json:"res/treeNode.json",
    logoNode_studio_json:"res/logoNode.json",
    mvpLayer_studio_json:"res/mvpLayer.json",
    dlgNode_studio_json:"res/dlgNode.json",
    passNode_studio_json:"res/passNode.json",
    head_png:"res/fw_dynamicRank_v1_avatar.png",
    gankuai_logo:"res/goooku_logo.png",
    mvp:"res/mvp_V3.plist",
    ImageFile:"res/Default/ImageFile.png",

    mvp_json:"res/mvpLayer.json",
    cell_json:"res/cell.json",
};

var effects = [
    //TODO: 此处添加音效
];

var g_resources = [];
for(var resIdx in res) {
    g_resources.push(res[resIdx]);
}
