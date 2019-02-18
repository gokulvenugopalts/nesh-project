function search_item_func(){
	var search_item = document.getElementById("search_item").value;
	alert(search_item);
	$.getJSON($SCRIPT_ROOT + "/search_item_func", search_item, function(result){
		var table = document.getElementById("category_table");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.innerHTML = result;
	});
	
}
function search_item_ajax(){
	var search_item = document.getElementById("search_item").value;
	
	 $.ajax({
            url: '/search_item_func',
            data: {search_item},
            type: 'POST',
            success: function(response) {
                
				fill_articles(response);
				
            },
            error: function(error) {
                alert(error);
            }
        });
		event.preventDefault();
}

function fill_articles(response){
	var table = document.getElementById("category_table");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "New value";
	var val = JSON.parse(response);
	console.log(val);
	var row_val=0;
	$.each(val, function(top_key,top_val){
		$.each(top_val, function(inner_key, inner_val){
			var row = table.insertRow(row_val);
			var cell = row.insertCell(0);
			var cell_div = document.createElement("div");
			var a = document.createElement('a');
			a.href = inner_val['href'];
			a.innerHTML = inner_val['text'];
			cell_div.appendChild(a);
			var para = document.createElement("p");
			var node = document.createTextNode(inner_val['promo']);
			para.appendChild(node);
			cell_div.appendChild(para);
			cell.appendChild(cell_div);
			row_val = row_val +1;
		});
	});
}	