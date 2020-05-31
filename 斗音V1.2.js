"auto";

/*
 *作者: 赤耳听风
 *发布平台:  酷安
 *  V1.2
 *新版特性
 *1.屏蔽更新
 *
 *  #历史版本
 *  V1.1
 *完成时间:  2020.4.23  13:04
 *1.自定义屏蔽词
 *  V1.0    2020.4.20  10:13
 *防止检测功能如下：
 *1.非线性滑动（图1）
 *2.自定义概率点赞
 *3.自定义概率视频等待时长
 */

    
var delay_min = 20;//最小间隔时间
var delay_max = 36;
    
var proba = 6;    //点赞概率
var thumbs_sum = 0;
    
var xo = 1000;    //焦点x
var yo = 1700;    //焦点y
var oo = 36;      //焦点偏移量
var thum = 36;    //随机点赞和长按屏幕偏移量
    
//      按照下面格式填写，要屏蔽的关键词   慎重添加 平均三秒钟可以找到一个关键词
var Shielding_textContains = new Array("安小贝","捞月狼服饰","疯读小说","一品官大人","立即下载","查看详情","至尊蓝月");



console.show();
var back_name = "com.ss.android.ugc.aweme.lite";
var r = 0;

if(currentPackage() != back_name){
    launch(back_name);
    sleep(1000);
}
//主要流程
var number = 0;
var time_sum = 0;  //运行时间
var time_coefficient = 1;//如非必要，请勿修改
while(true){
    number++;
    r = random(delay_min,delay_max);
    log("第"+number+"次等待时间:"+r);
    sleep(2*1000);
    if(time_sum>=time_coefficient*60*60*1000){
        console.info("已经运行"+time_coefficient+"个小时啦");
        time_coefficient += 1;
    }
    time_sum += r;
    
    Shielding_video((r-5)*1000);
    thumbs(proba);
    
    After_Update();
    
    slip(random(xo-oo,xo+oo),random(yo-oo,yo+oo));
    
}
//消磨时间
function pauseTime(millTime,Past) {
    //var start=Date.now();
    while(true){
        var nowTime=Date.now();
        var offset=nowTime-Past;
        if(offset>=millTime){
            break;
        }
    }
}
//屏蔽关键词
function Shielding_video(limitTime){
    var start=Date.now();
    
    var Shielding_exists;
    var Shielding_descContains;
    var Shielding_Result;
    
    for(var textContains_i = 0; Shielding_textContains.length > textContains_i;textContains_i += 1){
        //console.info("执行中");
        Shielding_exists = textContains(Shielding_textContains[textContains_i]).boundsInside(0,device.height/2,device.width,device.height-205).exists();        
        Shielding_descContains = descMatches(Shielding_textContains[textContains_i]).boundsInside(0,device.height/2,device.width,device.height-205).exists();
        
        if(Shielding_exists || Shielding_descContains){
            //log(textContains(Shielding_textContains[textContains_i]).findOne());
            console.info("找到关键词_"+Shielding_textContains[textContains_i]+"->"+Shielding_exists);
            break;
        }
    }
    if(Shielding_exists || Shielding_exists){
        //Shielding_Result = true;
        longClick(random(device.width/4-thum,device.width/4+thum),random(device.height/2-thum,device.height/2+thum))
        //log(longClick(device.width/4,device.height/2));
        sleep(200);
        var Shielding_Key = textContains("不感兴趣").findOne().bounds();
        log("点击【不感兴趣】，执行:"+click(Shielding_Key.centerX(), Shielding_Key.centerY()-280));
    }else{
        log("未找到屏蔽词");
    }

    pauseTime(limitTime,start);
};
//屏蔽更新
function After_Update(){
    var start=Date.now();
    
    var After;
        
    if(textContains("检测到更新").exists()){
        console.error("检测到更新提醒");
        if(textContains("以后再说").exists()){
            After = textContains("以后再说").findOne().bounds();
            log("点击以后再说，执行:"+click(After.centerX(), After.centerY()));
        }
    }
    pauseTime(5*1000,start);
};




//自动点赞
function thumbs(proba) {

    var x = 800;
    var y = 930;
    if(random(1,100)<=proba){
        log((++thumbs_sum)+"点赞成功");
        click(random(x-thum,x+thum),random(y-thum,y+thum));
        sleep(80);
        click(random(x-thum,x+thum),random(y-thum,y+thum));
    }
    
}

//**********非线性滑动
function slip(x0, y0) {
setScreenMetrics(1080, 1920);

    var points = [500];//点集合
    var interval = 0.01;//间隔
    //var x0 = 1000;    //焦点x
    //var y0 = 1700;    //焦点y
    var a = 600;      //半径

    for(var t = 1.5 * Math.PI; t > Math.PI; t -= interval){
        var x = x0 + a * Math.sin(t);
        var y = y0 + 2.1* a * Math.cos(t);
        x = random(x-10,x+10);    //偏移量
        y = random(y-10,y+10);
        points.push([parseInt(x), parseInt(y)]);
    }

    gesture.apply(null, points);
}

























