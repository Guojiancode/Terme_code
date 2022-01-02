/**
 * 封装星级评分函数
 */
$(function(){
	//写一个创建星星评分的函数 挂在window上
	window.createStarRate = function(score){
	//$.fn.createStarRate = function(score){  扩展
		//满星
	    var on = '<span class="on iconfont icon-xingxing"></span>';
	    //半星
	    var half = '<span class="half iconfont icon-banxing"></span>';
	    //灰星
	    var off = '<span class="off iconfont icon-xingxing"></span>';
		//计算分数
		var calcScore = Math.floor(score * 2) / 2;
		//计算满星
		var onCount = Math.floor(calcScore);
		//计算半星
		var isHasHalf = 0;
		if (calcScore % 1 !==0){
			isHasHalf = 1;
		}
		//计算灰色星星
		var offCount = 5 - onCount - isHasHalf;
		
		//拼接结果
		var rst = '';
		for(var i = 0; i < onCount; i++){
			rst += on;
		}
		//拼接半星
		if (isHasHalf === 1){
			rst += half;
		}
		//拼接灰色星星
		for (var k = 0; k < offCount; k++){
			rst += off;
		}
		
		return rst;
		//$(this).html(rst);
	}
})