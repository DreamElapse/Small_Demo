window.onload=function()
{
    waterfall();
    //要加载的图片位置
    var dataImg={"data":[{src:"images/16.jpg"},{src:"images/17.jpg"},{src:"images/18.jpg"},{src:"images/19.jpg"}
        ,{src:"images/20.jpg"},{src:"images/21.jpg"},{src:"images/22.jpg"},{src:"images/23.jpg"}
        ,{src:"images/25.jpg"},{src:"images/25.jpg"},{src:"images/26.jpg"},{src:"images/27.jpg"}
        ,{src:"images/28.jpg"},{src:"images/29.jpg"},{src:"images/30.jpg"},{src:"images/31.jpg"}
        ,{src:"images/32.jpg"},{src:"images/33.jpg"},{src:"images/34.jpg"}]};

    window.onscroll=function()
    {
        if(checkScrollSlide())
        {
            var oParent=document.getElementById("main");
            for(var i=0;i<dataImg.data.length;i++)
            {
                var oPin=document.createElement("div"); //创建一个div
                oPin.className="pin";   //给div一个pin的类
                oParent.appendChild(oPin);
                var oBox=document.createElement("div"); //再创建一个div,用来定义一个box类
                oBox.className="box";      //给div定义一个box类
                oPin.appendChild(oBox);  //把创建好的div给oPin(div),也就是外层的div
                var oImg=document.createElement("img");
                oImg.src=dataImg.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall();
        }

    }
};

function waterfall()
{
    var apin=get();
    var iPinW=apin[0].offsetWidth;  //获取页面自身的宽度
    var num=Math.floor(document.documentElement.clientWidth/iPinW); //算法
    var oparent=document.getElementById("main");
    oparent.style.cssText="width:"+iPinW*num+"px;margin:0 auto;";
    var pinHArr=[];
    for(var i=0;i<apin.length;i++)
    {
        var pinH=apin[i].offsetHeight;
        if(i<num)
        {
            pinHArr[i]=pinH;
        }
        else
        {
            //min() 方法可返回指定的数字中带有最低值的数字
            var minH=Math.min.apply(null,pinHArr);  //获取最小高度值  getMinHIndex()方法用到minH
            var minHIndex=getMinHIndex(pinHArr,minH);  //函数getMinHIndex() 传参
            apin[i].style.position="absolute";
            apin[i].style.top=minH+"px";
            apin[i].style.left=apin[minHIndex].offsetLeft+"px";
            pinHArr[minHIndex]+=apin[i].offsetHeight;
        }
    }
}

function get()
{
    var obj=document.getElementById("main").getElementsByClassName("pin");
    var pinS=[];
    for(var i=0;i<obj.length;i++)
    {
        pinS.push(obj[i]);  //把循环的类,添加到pinS数组中
    }
    return pinS;
}

function getMinHIndex(arr,minH)
{
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]==minH)
        {
            return i;
        }
    }
}

function checkScrollSlide()
{
    var aPin=document.getElementsByClassName("pin");
    var lastPinH=aPin[aPin.length-1].offsetTop-(Math.floor(aPin[aPin.length-1].offsetHeight)/2);
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var documentH=document.documentElement.clientHeight;

    return (lastPinH<scrollTop+documentH)?true:false;
}