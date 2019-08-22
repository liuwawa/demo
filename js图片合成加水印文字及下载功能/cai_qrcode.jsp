<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@ include file="/common/taglibs.jsp" %>
    <%@ include file="/common/meta.jsp" %>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <title>系统</title>
    <link href="${ctx}/statics/pages/css/store-list_v1.css" rel="stylesheet" type="text/css">
    <link href="${ctx}/statics/pages/css/default.css" rel="stylesheet" type="text/css">
    <script src="${ctx}/statics/pages/js/canvas2image.js?_dc=${staticVersion}"></script>
</head>
<body>
<input type="hidden" id="queryImgFilePath" value="${queryImgFilePath}"/>
<input type="hidden" id="merchantNo" value="${merchantNo}"/>
<input type="hidden" id="storeName" value="${storeName}"/>
 <div class="simple-alert" id="qrCodeModal">
    <div class="simple-alert-overlay"></div>
    <div class="simple-alert-content" style="width: 540px; transform: translate(-270px, -382px);">
        <div class="simple-alert-header">
            <h4 class="simple-alert-title">  二维码</h4>
            <img class="simple-alert-close-btn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAgdJREFUWAnN2TFWwkAQBuDsdhTpuBFwAFux8QRaaA3U2ngBadSWA0A6juERLOzowPl5Gd5CssnObDbCe7rrvJ2ZjyWQEM12u813u92bMebmcDj8ZFk2m0wmXzT2/liv17fUdEGWIVlWg8HgwVDwnYL3rsZa+zwajV7dWOp5URRP+/3+5aLP0mLnLoIZFiLhMp7qbw8ug82WL2uld19IHw4g2LCD84quDKRGNuFKwsyOx+NPHHN9I9twMOHNahgWktDVG0fS6wQEVJLIT0w6SnucAVMjpTh4KsBUSA3OC+waqcU1ArtCxuBagbHIWFwQUIvsAhcMlCK7womAoUisq7kqQfj4kF4p1X7McLG6sW136nI4JsUhTwxEkgapwamBUqQWFwUMRcbg0MPi1zU/VMcgnpDkOIzZRRVQguNXR4sUAzW4GKQI2IbDLgHzLx/UITj+SiBZy7vrG4N2UNNQk1OHbAXGNIrJZWwjsIsGsTW8wNjCvAMYY2rVAmMKujB3rq1ZAWoLuRjfXFP7DKgp4MP44tIeJ6A00QcIiUt6HYGShBBAyJrQnmaz2UzpPtyHr6j2JO+r58bbkLR2ihuYczfJnafEoQ9OjXz+dvs68wVuYA6dwGmaGseNmpCwYQdXvJjHvnDcz4eEzeZ5/kgLl6T9pfGbfqZ8VcIF+hjRkwx3MJSWJf4N8Qf0tAygjAbjNQAAAABJRU5ErkJggg==">
        </div>
        <div class="simple-alert-body qrcode-body">

            <div class="main-content-container" id="qrcode">
                <div class="qrcode-container">
                    <div class="qrcode" >
                        <canvas  id='myCanvas' width="1200" height="1560" ></canvas>
                    </div>
                </div>
                <div class="btn-container">
                    <a class="btn-important" onclick="downloadPic();" >点击下载后可打印</a>
                </div>
            </div>
        </div>

    </div>
</div>

</body>
<script type="text/javascript">
    $(function() {

        init();
        addbg();
        //初始列表
        setTimeout(addlogo(),150) ;
        setTimeout(addPayImg(),1000) ;

    });
    function addPayImg(canvas,ctx) {
        var canvas=document.getElementById("myCanvas");
        var ctx=canvas.getContext("2d");
        var payImg= GLOBAL.WEBROOT +$("#queryImgFilePath").val();
        var img = new Image();
        img.src = payImg;
        // 加载完成开始绘制
        img.onload=function(){
            // 绘制图片
            ctx.drawImage(img,300,390,600,600);
        }
    }
    function addbg(canvas,ctx) {
        var canvas=document.getElementById("myCanvas");
        var ctx=canvas.getContext("2d");
        var bg = GLOBAL.WEBROOT +"/statics/pages/images/pay/qrcode-bg.png";
        var merchantNo =$("#merchantNo").val();
        var storeName =$("#storeName").val();
        var img = new Image();
        img.src = bg;
        img.height=560;
        img.width=400;
        // 加载完成开始绘制
        img.onload=function(){
            //准备canvas环境
            // 绘制图片
            ctx.drawImage(img,0,0,1200,1560);

            // 绘制水印
            ctx.font="54px microsoft yahei";
            ctx.fillStyle = "rgba(7,178,170,1)";
            ctx.fillText(storeName,460,320);

            ctx.font="36px microsoft yahei";
            ctx.fillText("商户号: "+merchantNo,380,380);

            ctx.fillStyle = "rgba(245,245,245,1)";
            ctx.fillText("由XX提供技术支持",460,1280);
            ctx.fillText("客服热线：137111111",460,1350);

            ctx.fillStyle = "rgba(7,178,170,1)";
            ctx.font="48px microsoft yahei";
            ctx.fillText("服务商电话：137111111",330,1480);
        }


    }
    function addlogo(canvas,ctx) {
        var canvas=document.getElementById("myCanvas");
        var ctx=canvas.getContext("2d");
        var logo = GLOBAL.WEBROOT +"/statics/pages/images/pay/caibao_logo.png";
        var img = new Image();
        img.src = logo;
        // 加载完成开始绘制
        img.onload=function(){
            //准备canvas环境
            // 绘制图片
            ctx.drawImage(img,270,1222,150,150);
        }
    }
    //下载二维码-----------------------

    var canvas, ctx, bMouseIsDown = false, iLastX, iLastY,
            $save, $imgs,
            $convert, $imgW, $imgH,
            $sel;
    function init () {
        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');
        $save = document.getElementById('save');
        $convert = document.getElementById('convert');
        $sel = document.getElementById('sel');
        $imgs = document.getElementById('imgs');
        $imgW = document.getElementById('imgW');
        $imgH = document.getElementById('imgH');
        bind();
    }
    function downloadPic() {
        Canvas2Image.saveAsImage(canvas, 400, 560, "png");
    }
    function bind () {
        canvas.onmousedown = function(e) {
            bMouseIsDown = true;
            iLastX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
            iLastY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
        }
        canvas.onmouseup = function() {
            bMouseIsDown = false;
            iLastX = -1;
            iLastY = -1;
        }
        canvas.onmousemove = function(e) {
            if (bMouseIsDown) {
                var iX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
                var iY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
                ctx.moveTo(iLastX, iLastY);
                ctx.lineTo(iX, iY);
                ctx.stroke();
                iLastX = iX;
                iLastY = iY;
            }
        };


    }



</script>
</html>
