//1. 搜索输入框(search)
var height1 = $(".site-nav")[0].offsetHeight;
var height2 = $(".top-banner")[0].offsetHeight;
var height3 = $(".search")[0].offsetHeight;
var height = height1 + height2 + height3;

window.onscroll = function () {
    if(scroll().top > height){
        $(".line-search").show();
    }else {
        $(".line-search").hide();        
    }
}




// 2. tab栏(site-nav)
$("#nav #put").mouseenter(function(){
    $(this).children("#spread").show();
    var navSubtitle = $(this).children("#spread").children("li");
    for(var i = 0; i < navSubtitle.length; i++) {
        $(navSubtitle[i]).mouseenter(function(){
            $(this).addClass("selected").siblings("li").removeClass("selected");
        });
    }
});
$("#nav #put").mouseleave(function(){
    $(this).children("#spread").hide();
    $(this).children("#spread").children("li").removeClass("selected");
});




// 3. tab栏(menu)
var menu = $(".main-left-header .main-left-header-l .menu").children("li");
var menuMore = $(".main-left-header .main-left-header-l .menu li .menu-more").children("#detail");
    for(var j = 0; j < menu.length; j++) {
        $(menu[j]).mouseenter(function(){
            $(this).children("#detail").show();
        });
        $(menu[j]).mouseleave(function(){
            $(this).children("#detail").hide();
        });
    }

//  4. tab栏（cover）
var coverList = $(".cover .cover-list").children("li");
var coverBox = $(".cover-box").children("div")
for(var k = 0; k < 3; k++) {
    $(coverList[k]).mouseenter(function(){
        $(".cover-box").show();
        $(this).addClass("scover-list-selected").siblings("li").removeClass("cover-list-selected");
        $(coverBox).eq($(this).index()).show().siblings("div").hide();
    });
}
$(".cover-box-close").click(function(){
    $(".cover-box").hide();
})




//4. 无缝滚动轮播图(main)
//思路：赋值第一张图片放到Img的最后，然后当图片切换到第五张的时候
//     直接切换第六章，再次从第一张切换到第二张的时候先瞬间切换到
//     第一张图片，然后滑动到第二张
//步骤：
//1.获取事件源及相关元素。
//2.复制第一张图片所在的li,添加到ul的最后面。
//3.给ol中添加li，ul中的个数-1个，并点亮第一个按钮。
//4.鼠标放到ol的li上切换图片
//5.添加定时器
//6.左右切换图片（鼠标放上去隐藏，移开显示）


//1.获取事件源及相关元素。
var carousel = document.getElementsByClassName("carousel")[0];
var imgWidth = carousel.offsetWidth;
var ulImg = carousel.firstElementChild || carousel.firstChild;
var ulIndex = carousel.children[1];
var divBtn = carousel.lastElementChild || carousel.lastChild;
var spanArr = divBtn.children;

//2.复制第一张图片所在的li,添加到ulImg的最后面。
var ulImgNewLi = ulImg.children[0].cloneNode(true);
ulImg.appendChild(ulImgNewLi);
//3.给ulIndex中添加li，ulImg中的个数-1个，并点亮第一个按钮。
for(var i=0;i<ulImg.children.length-1;i++){
    var ulIndexNewLi = document.createElement("li");
    ulIndexNewLi.innerHTML = i+1;
    ulIndex.appendChild(ulIndexNewLi)
}
var ulIndexLiArr = ulIndex.children;
ulIndexLiArr[0].className = "current";

//4.鼠标点击ulIndex的li上切换图片
for(var i=0;i<ulIndexLiArr.length;i++){
    //自定义属性，把索引值绑定到元素的index属性上
    ulIndexLiArr[i].index = i;
    ulIndexLiArr[i].onclick = function () {
        //排他思想
        for(var j=0;j<ulIndexLiArr.length;j++){
            ulIndexLiArr[j].className = "";
        }
        this.className = "current";
        //鼠标放到小的方块上的时候索引值和key以及square同步
        key = square = this.index;
        //移动盒子
        animate(ulImg,-this.index*imgWidth);
    }
}
            
//5.添加定时器
var timer = setInterval(autoPlay,4000);
//固定向右切换图片
//两个定时器（一个记录图片，一个记录小方块）
var key = 0;
var square = 0;
function autoPlay(){
    //通过控制key的自增来模拟图片的索引值，然后移动ulImg
    key++;
    if(key>ulIndexLiArr.length){
        //图片已经滑动到最后一张，接下来，跳转到第一张，然后在滑动到第二张
        ulImg.style.left = 0;
        key = 1;
    }
    animate(ulImg,-key*imgWidth);
    //通过控制square的自增来模拟小方块的索引值，然后点亮盒子
    //排他思想做小方块
    square++;
    if(square>ulIndexLiArr.length-1){//索引值不能大于等于5，如果等于5，立刻变为0；
        square = 0;
    }
    for(var i=0;i<ulIndexLiArr.length;i++){
        ulIndexLiArr[i].className = "";
    }
    ulIndexLiArr[square].className = "current";
}

//鼠标放上去清除定时器，移开后在开启定时器
carousel.onmouseover = function () {
    divBtn.style.display = "block";
    clearInterval(timer);
}
carousel.onmouseout = function () {
    divBtn.style.display = "none";
    timer = setInterval(autoPlay,4000);
}

//6.左右切换图片（鼠标放上去显示，移开隐藏）
spanArr[0].onclick = function () {
    //通过控制key的自增来模拟图片的索引值，然后移动ulImg
    key--;
    if(key<0){
        //先移动到最后一张，然后key的值取之前一张的索引值，然后在向前移动
        ulImg.style.left = -imgWidth*(ulIndexLiArr.length)+"px";
        key = ulIndexLiArr.length-1;
    }
    animate(ulImg,-key*imgWidth);
    //通过控制square的自增来模拟小方块的索引值，然后点亮盒子
    //排他思想做小方块
    square--;
    if(square<0){//索引值不能大于等于5，如果等于5，立刻变为0；
        square = ulIndexLiArr.length-1;
    }
    for(var i=0;i<ulIndexLiArr.length;i++){
        ulIndexLiArr[i].className = "";
    }
    ulIndexLiArr[square].className = "current";
}
spanArr[1].onclick = function () {
    //右侧的和定时器一模一样
    autoPlay();
}

function animate(ele,target){
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function () {
        var val = target - ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + "px";
        if(Math.abs(val)<Math.abs(speed)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },10)
}
