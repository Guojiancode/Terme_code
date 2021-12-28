/**
 * 购物车js文件
 */
$(function(){
	//全选
	/*
	1.点击表头的全选框，获取表头全选框的的选中状态
	2.表格中的选择框状态需要一致
	3.结算中的全选状态一致
	*/
   //定义三个变量
   var $theadInput = $('table thead input[type=checkbox]');//头部选择框
   var $bodyInput = $('table tbody input[type=checkbox]');//中间选择框
   var $allpriceInput = $('.totalprice input[type=checkbox]');//结算选择框
   
   $theadInput.change(function(){
	  //获取选中状态
	  var state = $(this).prop('checked');
	  //让表格和结算中的选择框保持一致
	  $bodyInput.prop('checked',state);
	  $allpriceInput.prop('checked',state);
	  
	  //调用计算总价函数
	  calcTotalPrice();
	})
	
	//结算中的选择框也需要和表头全选框有相同的选择功能
	$allpriceInput.change(function(){
		//获取选中状态
	  var state = $(this).prop('checked');
		//让表格和结算中的选择框保持一致
	  $theadInput.prop('checked',state);
	  $bodyInput.prop('checked',state);
	  
	  //调用计算总价函数
	  calcTotalPrice();
	  })
	
	//表格中的状态影响全选
	$bodyInput.change(function(){
		//标杆
		var flag = true;
		
		//循环表格中的所有选择框的选中状态
		$bodyInput.each(function(i,v){
			if (!$(v).prop('checked')){//只要有一个未选择，状态就为false
				flag = false;
			}
		})
		$theadInput.prop('checked',flag)
		$allpriceInput.prop('checked',flag)
		
		//调用计算总价函数
		calcTotalPrice();
	  })
	  
	  //数量的加减
	$('.add').on('click', function(){
		//下一个input节点
		var $prevInput = $(this).prev();
		
		//获取输入值
		var oldVal = parseInt($prevInput.val());
		//自增
		oldVal++;
		
		//重新赋值给输入框
		$prevInput.val(oldVal);
		//小计
		subTotalPrice(oldVal,$(this));
		
		//调用计算总价函数
		calcTotalPrice();
	})
	//减少
	$('.reduce').on('click',function(){
		//上一个input节点
			var $nextInput = $(this).next();
			
			//获取输入值
			var oldVal = parseInt($nextInput.val());
			//自减
			oldVal--;
			oldVal = oldVal < 0 ? 0 :oldVal;//如果小于0，那么就等于0，否则等于自己
			//重新赋值给输入框
			$nextInput.val(oldVal);
			//小计
			subTotalPrice(oldVal,$(this));
			
			//调用计算总价函数
			calcTotalPrice();
	  })
	function subTotalPrice(val,dom){
		var subtotal = val * parseFloat(dom.closest('tr').find('.price').text());
		//把小结放入对应的位置
		dom.closest('tr').find('.subtotal').text(subtotal.toFixed(2)); 
	}
	
	//删除
	$('.del').click(function(){
		//删除整行
		$(this).closest('tr').remove();
		calcGoodsCount();//调用商品总数量
	})
	
	//计算总价和选中数量的函数
	function calcTotalPrice(){
		//定一个数量
		var count = 0;
		
		//定义变量 保持总价格
		var totalPrice = 0;
		
		//循环表格选择框，选中状态的计算总价
		$('table tbody input[type=checkbox]').each(function(i,input){
			if ($(input).prop('checked')){
				//自增
				count++;
				//累加价格
				totalPrice += parseFloat( $(input).closest('tr').find('.subtotal').text() )
			}
		})
		
		//把总价渲染到对应位置
		$('.total').text(totalPrice.toFixed(2))
		//把数量渲染到对应的dom位置
		$('.count').text(count)
	}
	
	//全部商品
	function calcGoodsCount(){
		$('.goodsCount').text( $('.shopcart table tbody tr').length ) 
	}
	calcGoodsCount();//一进入界面就自定调用一次
	
	//删除选中商品
	$('.deleteChecked').on('click',function(){
		//循环单选框，如果选中，择删除
		$bodyInput.each(function(i,input){
			if($(this).prop('checked')){
				$(this).closest('tr').remove();
			}
		})
		//计算总价
		calcTotalPrice();
		//计算商品数量
		calcGoodsCount();
	})
})