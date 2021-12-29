/**
 * 购物车js文件
 * 
 */
$(function(){
	//把三个类型的input分别先获取
	var $theadInput = $('table thead input[type=checkbox]');//表头中的选择框
	var $tbodyInputs = $('table tbody input[type=checkbox]');//表格中的每一行选择框
	var $allpriceInput = $('.totalprice input[type=checkbox]');//计算总价中选择框
	
	/*全选*/
	/*
	1.给表头中的全选按钮 绑定点击事件 点击的时候 获取到它的选中状态（true/false）
	2.给表格中的每一行的数据的input选择框，赋值为表头的选中状态（true/false）
	3.给计算总价中的全选框，也赋值为表头的选中状态（true/false）
	*/
	//表头的全选
	$theadInput.change(function(){
		var checkState = $(this).prop('checked');//获取全选框的选中状态
		$tbodyInputs.prop('checked',checkState);//把状态给表格中的全选框
		$allpriceInput.prop('checked',checkState);//把状态给计算总价中的全选框
		
		allTotal();//总计
	});
	
	/*
	计算总价的全选
	1.给计算总价的全选按钮 绑定点击事件 点击的时候 获取到它的选中状态（true/false）
	2.给表格中的每一行的数据的input选择框，赋值为计算总价的选中状态（true/false）
	3.给表头的全选框，也赋值为计算总价的选中状态（true/false）
	*/
	$allpriceInput.change(function(){
		var checkState = $(this).prop('checked');//获取计算总价中的全选状态
		$tbodyInputs.prop('checked',checkState);//把状态给表格中的全选框
		$theadInput.prop('checked',checkState);//把状态给表头的全选框
		
		allTotal();//总计
	});
	
	/*表格中的选择框 反过来影响两个全选框
	1.给表格中的选择框 绑定点击事件
	2.定标杆：flag =true;
	3.循环表格中的选择框
	4.获取每一个选择框的选中状态
		判断：如果有一个是false 那么就不是全选 . flag = false
	5.将flag的值赋值给两个全选框(flag就是对应全选状态)
	*/
	$tbodyInputs.change(function() {//给表格单选框绑定事件
		var flag = true;//定标杆为true
		$tbodyInputs.each(function(index,input) {//循环表格input
			var checkState = $(this).prop('checked');//获取选中状态
			if (checkState == false){//如果有一个等于false
				flag = false;//标杆变为flase(全选的状态变为false)
			}
		})
		$theadInput.prop('checked',flag);//把状态赋值给头部全选框
		$allpriceInput.prop('checked',flag);//把状态赋值给计算价格全选框
		
		allTotal();//总计
	})
	
	/*减法功能
	1.获取-按钮，绑定点击事件
	2.点击的时候，获取后面输入框的值
	3.输入框的值自减,边界判断,如果小于0,那么等于0 否则等于自己
	4.把自减后的值重新赋值给后面的输入框
	*/
	$('.reduce').click(function(){//给减少绑定事件
		var count = parseInt($(this).next().val());//取后面输入框的值
		count--;//自减
		count = count < 0 ? 0 : count;//边界判断
		$(this).next().val(count);//把自减的值 赋值给后面的输入框
	//小计
	subTotal($(this),count);
	allTotal();//总计
	})
	
	/*加法功能
	1.获取+按钮，绑定点击事件
	2.点击的时候，获取前面输入框的值
	3.输入框的值自增
	4.把自增后的值重新赋值给前面的输入框
	*/
	$('.add').click(function(){//给增加绑定事件
		var count = parseInt($(this).prev().val());//取前面输入框的值
		count++;//自增
		$(this).prev().val(count);//把自增的值 赋值给前面的输入框
	//小计
	subTotal($(this),count);
	allTotal();//总计
	})
	
	/*
	封装小计函数：(点击 + 或者 - 的时候 需要调用小计函数)
	*/
	function subTotal(dom, count) {
		var singlePrice = parseFloat(dom.closest('tr').find('.price').text());//找到单价
		var subTotalPrice = singlePrice * count;//单价 * 数量 = 小计
		dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))//把小计的结果渲染页面 保留两位小数
	}
	
	/*
	总计功能实现：(头部全选 计算总计全选 表格的选择框 + - 删除 六个地方调用总计)
	1.定义一个变量，用于保存总价 定义一个变量， 用于保存已选商品数量
	2.获取所有表格中选择框——循环，获取选中状态，判断
	3.如果选中，那么就要累加这一行的小计
	*/
	function allTotal(){
		var allprice = 0;//定义一个变量，用于保存总价
		var selectedCount = 0;//定义一个变量， 用于保存已选商品数量
		$('table tbody input[type=checkbox]').each(function(){//获取表格中的选择框循环
			var checkState = $(this).prop('checked');//获取选中状态
			if (checkState){//如果是true
				allprice += parseFloat($(this).closest('tr').find('.subprice').text());//累加这一行的小计
				selectedCount ++;//数量+1
			}
		})
		//渲染
		$('.total').text(allprice.toFixed(2));//渲染总价
		$('.count').text(selectedCount);//渲染数量
	}
	
	/*
	关于下面的删除功能：模拟，不是真正的逻辑，是“伪”的
	*/
	//删除
	$('.del').click(function(){
		$(this).closest('tr').remove()//干掉自己
		getGoodsCount();//重新计算商品数量
		allTotal();//总计
	})
	
	//删除选中
	$('.deleteChecked').click(function(){
		$('table tbody input[type=checkbox]').each(function(){//获取表格中的选择框循环
			var checkState = $(this).prop('checked');//获取选中状态
			if (checkState){//如果是true
				$(this).closest('tr').remove()
			}
		})
		getGoodsCount();//重新计算商品数量
		allTotal();//总计
	})
	
	//封装一个获取全部商品的函数
	function getGoodsCount(){
		//获取数量
		var goodsCount = $('.shopcart table tbody tr').length;
		//渲染
		$('.goodsCount').text(goodsCount);
	}
	getGoodsCount();//页面加载调用一次
})