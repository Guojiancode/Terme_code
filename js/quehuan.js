/**
 *乐购商城首页js
 *
 */
//当页面加载完毕
$(function(){
/*首页大图轮播*/
	$('#bannerInner').tyslide({
		boxh:460,//盒子的高度
		w:1000,//盒子的宽度
		h:390,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:40,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:20,//控制按钮高度
		radius:10,//控制按钮圆角度数
		controlsColor:"#d7d7d7",//普通控制按钮的颜色
		controlsCurrentColor:"#ff6600",//当前控制按钮的颜色
		isShowNum:true //是否显示数字
    });
			
/*图书 电子书小轮播*/
	$('#ebooks-banner').tyslide({
		boxh:223,//盒子的高度
		w:332,//盒子的宽度
		h:223,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:2,//控制按钮高度
		controlsColor:"#d7d7d7",//普通控制按钮的颜色
		controlsCurrentColor:"#00ff00",//当前控制按钮的颜色
	});
/* 服装小轮播*/
	$('#clothes-banner').tyslide({
		boxh:334,//盒子的高度
		w:430,//盒子的宽度
		h:334,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:10,//控制按钮宽度
		controlsH:2,//控制按钮高度
		controlsColor:"#d7d7d7",//普通控制按钮的颜色
		controlsCurrentColor:"#00ff00",//当前控制按钮的颜色
	});
/* 户外运动小轮播*/
	$('#sport-banner').tyslide({
		boxh:334,//盒子的高度
		w:430,//盒子的宽度
		h:334,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:10,//控制按钮宽度
		controlsH:2,//控制按钮高度
		controlsColor:"#d7d7d7",//普通控制按钮的颜色
		controlsCurrentColor:"#00ff00",//当前控制按钮的颜色
	});
/* 童装小轮播*/
	$('#children-banner').tyslide({
		boxh:334,//盒子的高度
		w:430,//盒子的宽度
		h:334,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:10,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:10,//控制按钮宽度
		controlsH:2,//控制按钮高度
		controlsColor:"#d7d7d7",//普通控制按钮的颜色
		controlsCurrentColor:"#00ff00",//当前控制按钮的颜色
	});
		
/*推广商品tab切换*/
	$('.promotion-title ul li').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active')
		
		var index = $(this).index();
		$('.promotion .promotion-content .promotion-block').animate({
			'left': -index * 1200
		})
	})


/*返回顶部*/
//绑定滚动事件
	$(document).scroll(function(){
	//获取距离顶部的位置
		var topDistance = $('html,body').scrollTop();
	//判断
		if(topDistance > 500){
			$('.backToTop').fadeIn();
			} else {
			$('.backToTop').fadeOut();
			}
			}) 
	//返回顶部功能
			$('.backToTop').click(function(){
			$('html,body').animate({
			scrollTop:0
			},300)
	})

/*二维码划出效果*/
	$('.qr-code .ticket').hover(function(){
	//让二维码出现
		$('.qr-code div').stop(true).animate({
			left: '-100px'
		})
	},function(){
	//让二维码消失
		$('.qr-code div').stop(true).animate({
			left: 0
		})
	})

/*顶部搜索框交互*/
	$(document).scroll(function(){
	//获取到顶部的距离
		var topDistance = $('html,body').scrollTop();
	//判断
		if(topDistance > 500){
	//滚动距离大于500，则出现
			$('.top-search-box').slideDown()
			}else{
	//否则消失
			$('.top-search-box').slideUp()
			}
	})

/*楼梯跳转*/
	$('.floor li').click(function(){
	//获取索引
		var index = $(this).index();
	//选择每一个板块到顶部的偏移
		var topOffset = $('.floorBox').eq(index).offset().top;
	//让滚动条滚到该位置
		$('html,body').animate({
			scrollTop:topOffset - 50
		})
	})
})