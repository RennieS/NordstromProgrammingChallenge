// Norstrom JavaScript
//

// Add "Why work with us?" link in header
$(document).ready(function() {
	$("header").append("<a class='RightAlignedLink' href='http://about.nordstrom.com/careers/#/about-us/main'>Why work with us?</a>");
});

var searchResults = {
	showSearchResults: function() {
		$.getJSON("Database.json", function(result){searchResults.appendSearchItems(result);});
	},
	
	appendSearchItems: function(result) {
		$.each(result, function(i, itemData) {searchResults.appendItem(i, itemData);});
	},
	
	appendItem: function(index, itemData) {
		var image = "<img src='http://g.nordstromimage.com/imagegallery/store/product/medium/" +
			itemData.image_url + ".jpg'>";
		var detailLink = $("<a></a>").attr("href", "detail.html?"+itemData.style_id);
		detailLink.append(image, "<br/>", itemData.formatted_regular_price, "<br/>", itemData.name, "<br/>", itemData.brand);
		$("article").append($("<div class='SearchItem'></div>").append(detailLink));
	},
	
	showItemDetail: function(styleId) {
		$.getJSON("Database.json", function(result){
			for (i=0; i<result.length; i++) {
				if (result[i].style_id == styleId) {
					searchResults.formatItem(result[i]);
					return;
				}
			}
			$("#detaildiv").text("Error: Item not found");
		});
	},
	
	formatItem: function(itemData) {
		var image = "<img src='http://g.nordstromimage.com/imagegallery/store/product/large/" +
			itemData.image_url + ".jpg'>";

		$("article div:first").prepend(image);
		$("#brand").text(itemData.brand);
		$("#description").text(itemData.name);
		$("#price").text(itemData.formatted_regular_price);
		$("#prodid").text(itemData.style_id);
		$("#addtocart").click(function() {alert("Added to cart")} );
	}
};
