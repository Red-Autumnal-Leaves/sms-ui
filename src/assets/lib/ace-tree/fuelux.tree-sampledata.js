var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};

var tree_data = {
	'for-sale' : {name: '美妆', type: 'folder'}	,
	'vehicles' : {name: '女鞋', type: 'folder'}	,
	'rentals' : {name: '裤子', type: 'folder'}	,
	'real-estate' : {name: '包包', type: 'folder'}	,
	'pets' : {name: '裙子', type: 'folder'}	,
	'tickets' : {name: '上衣', type: 'item'}	,
	'services' : {name: '家具', type: 'item'}	,
	'personals' : {name: '配饰', type: 'item'}
}
tree_data['for-sale']['additionalParameters'] = {
	'children' : {
		'appliances' : {name: '洁面', type: 'item'},
		'arts-crafts' : {name: '粉饼', type: 'item'},
		'clothing' : {name: '唇膏口红', type: 'item'},
		'computers' : {name: '身体乳', type: 'item'},
		'jewelry' : {name: '卸妆水', type: 'item'}
	}
}
tree_data['vehicles']['additionalParameters'] = {
	'children' : {
		'cars' : {name: '冬季新品', type: 'folder'},
		'motorcycles' : {name: '经典必备', type: 'item'},
		'boats' : {name: '潮流速递', type: 'item'}
	}
}
tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
	'children' : {
		'classics' : {name: '应季新品', type: 'item'},
		'convertibles' : {name: '潮流速递', type: 'item'},
		'coupes' : {name: '畅销热卖', type: 'item'},
		'hatchbacks' : {name: '经典必备', type: 'item'}
	}
}

tree_data['rentals']['additionalParameters'] = {
	'children' : {
		'apartments-rentals' : {name: '应季美包', type: 'item'},
		'office-space-rentals' : {name: '畅销热卖', type: 'item'},
		'vacation-rentals' : {name: '人气精选', type: 'item'}
	}
}
tree_data['real-estate']['additionalParameters'] = {
	'children' : {
		'apartments' : {name: '应季裙子', type: 'item'},
		'villas' : {name: '潮流速递', type: 'item'},
		'plots' : {name: '经典必备', type: 'item'}
	}
}
tree_data['pets']['additionalParameters'] = {
	'children' : {
		'cats' : {name: '应季新品', type: 'item'},
		'dogs' : {name: '上衣', type: 'item'},
		'horses' : {name: '下装', type: 'item'},
		'reptiles' : {name: '鞋包配饰', type: 'item'}
	}
}

var treeDataSource = new DataSourceTree({data: tree_data});











var tree_data_2 = {
	'pictures'  : {name: 'Pictures',      type: 'folder',    'icon-class':'red'     }	,
	'music'     : {name: 'Music',         type: 'folder',    'icon-class':'orange'  }	,
	'video'     : {name: 'Video',         type: 'folder',    'icon-class':'blue'    }	,
	'documents' : {name: 'Documents',     type: 'folder',    'icon-class':'green'   }	,
	'backup'    : {name: 'Backup',        type: 'folder'}	,
	'readme'    : {name: '<i class="icon-file-text grey"></i> ReadMe.txt', type: 'item'},
	'manual'    : {name: '<i class="icon-book blue"></i> Manual.html', type: 'item'}
}
tree_data_2['music']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text   brown"></i> song1.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song2.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song3.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song4.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song5.ogg', type: 'item'}
	]
}
tree_data_2['video']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text  brown"></i> movie1.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie2.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie3.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie4.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie5.avi', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters'] = {
	'children' : {
		'wallpapers' : {name: 'Wallpapers', type: 'folder', 'icon-class':'pink'},
		'camera' : {name: 'Camera', type: 'folder', 'icon-class':'pink'}
	}
}
tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> wallpaper1.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper2.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper3.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper4.jpg', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> photo1.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo2.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo3.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo4.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo5.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo6.jpg', type: 'item'}
	]
}


tree_data_2['documents']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> document1.pdf', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document2.doc', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document3.doc', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document4.pdf', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document5.doc', type: 'item'}
	]
}

tree_data_2['backup']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> backup1.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup2.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup3.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup4.zip', type: 'item'}
	]
}
var treeDataSource2 = new DataSourceTree({data: tree_data_2});