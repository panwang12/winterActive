var pageH=$("#my-body").height();
function slidePage(){
    var para=0;
    $("#page1").swipe({
        swipe:function(event, direction) {
            if (direction=="up"){
                para++;
                para=para>=2?2:para;
                $("#page1").animate({
                    top:-pageH*para
                },400);
                if(para===1){
                }
                if(para===2){
                    getPage2();
                }
            }
            if (direction=="down"){
                para--;
                para=para<=0?0:para;
                $("#page1").animate({
                    top:-pageH*para
                },400);
            }
            if(para===0){

            }
        },

        threshold:2

    })
}
slidePage();

function getPage2(){
    window.location="detail.html";
}
$("#view-rule").click(function(){
    $("#p1-notice").css("display","block");
});
$("#p1-notice").click(function(){
    $("#p1-notice").css("display","none");
});


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
    var r = window.location.search.substr(1).match(reg);  //ƥ��Ŀ�����
    if (r != null) return unescape(r[2]); return ""; //���ز���
};
var openid=getUrlParam("openid");
sessionStorage["openid"]=getUrlParam("openid");
var isVerrify=0;
$.ajax({
    type:"post",
    url:"http://winter.dfcitroenclub.com/api/Values/CheckUserForWinner",
    contentType:"application/json",
    data:JSON.stringify({openid:openid}),
    success:function(obj){
        if(obj.data===null){
            //�û�δע��
            isVerrify=0
        }else if(obj.data.iswinner===false){
            //�û�ע���ˣ���δ�齱
            isVerrify=1;

        } else if(obj.data.iswinner===true){
            //�Ѿ��������
            isVerrify=2;

        };
        $("#view-box").click(function(){
            switch (isVerrify){
                case 0:
                    alert("请先选择您心仪的奖券放入龙友宝箱哦！");
                    break;
                case 1:
                    getPage2();
                    break;
                case 2:
                    alert("您已经抽过奖了，快到我的券包中查看哦！");
                    break;
            }
        });
        $("#view-package").click(function(){
            switch (isVerrify){
                case 0:
                    alert("您还未参与抢券哦！");
                    break;
                case 1:
                    alert("您的券包还没有奖券，需要先去龙友宝箱抽取奖券！");
                    break;
                case 2:
                    getPage2();
                    break;
            }
        })
    },
    error:function(){
        console.log("请求错误")
    }
});