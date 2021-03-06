/**
 * 所有的服务Ajax请求
 */
function Config() {
    var URLset = {
        BaseURI: "http://127.0.0.1:5000/",
        PreviewURI: "http://127.0.0.1:5000/trans/get_preview"
    };
    this.getUrl = function (key) {
        return URLset[key];
    };
}

var UrlConfig = function () {
};
var instance = new Config();
UrlConfig.getBaseURI = function () {
    return instance.getUrl('BaseURI');
};
UrlConfig.getPreviewURL = function () {
    return instance.getUrl('PreviewURI');
};
UrlConfig.getFileURI = function () {
    return instance.getUrl('FileURI');
};

/**
 * 所有的查询服务Ajax请求类
 */
function RestQueryAjax(callback) {
    this.login_REST = function (data) {
        ResultGet(data, 'user', 'login');
    };
    this.check_login_REST = function (data) {
        ResultGet(data, 'user', 'check_login');
    };
    this.logout_REST = function (data) {
        ResultGet(data, 'user', 'logout');
    };
    this.sign_up_REST = function (data) {
        ResultGet(data, 'user', 'sign_up');
    };
    this.delete_user_REST = function (data) {
        ResultGet(data, 'user', 'delete_user');
    };
    this.get_tree_REST = function (data) {
        ResultPost(data, 'tree', 'get_tree');
    };
    this.del_tree_REST = function (data) {
        ResultGet(data, 'tree', 'del_tree');
    };
    this.create_tree_REST = function (data) {
        ResultGet(data, 'tree', 'create_tree');
    };
    this.add_node_REST = function (data) {
        ResultGet(data, 'tree', 'add_node');
    };
    this.rename_node_REST = function (data) {
        ResultGet(data, 'tree', 'rename_node');
    };
    this.del_node_REST = function (data) {
        ResultGet(data, 'tree', 'del_node');
    };
    this.del_file_REST = function (data) {
        ResultGet(data, 'tree', 'del_file');
    };
    this.add_file_REST = function (data) {
        ResultPost(data, 'tree', 'add_file');
    };
    this.count_file_REST = function (data) {
        ResultGet(data, 'tree', 'count_file');
    };
    this.get_icon_REST = function (data) {
        ResultPost(data, 'tree', 'get_icons');
    };
    this.del_file_REST = function (data) {
        ResultGet(data, 'tree', 'del_file');
    };
    this.after_upload_REST = function (data) {
        ResultGet(data, 'file', 'after_upload');
    };
    this.cache_file_REST = function (data) {
        ResultGet(data, 'file', 'cache_file');
    };
    this.convert_doc_REST = function (data) {
        ResultGet(data, 'trans', 'office_pdf');
    };
    this.create_views_REST = function (data) {
        ResultGet(data, 'logic', 'create_views');
    };
    this.get_views_REST = function (data) {
        ResultGet(data, 'logic', 'get_views');
    };
    this.modify_views_REST = function (data) {
        ResultPost(data, 'logic', 'modify_views');
    };
    this.cache_list_REST = function (data) {
        ResultPost(data, 'logic', 'cache_list');
    };
    this.get_list_REST = function (data) {
        ResultPost(data, 'logic', 'get_list');
    };
    this.get_info_REST = function (data) {
        ResultPost(data, 'logic', 'get_music_info');
    };
    this.get_audio_info_REST = function (data) {
        ResultPost(data, 'logic', 'get_file_info');
    };
    this.update_info_REST = function (data) {
        ResultPost(data, 'logic', 'update_music_info');
    };
    // 返回函数
    RestQueryAjax.prototype = {
        callback: callback
    };
    // 返回值生成器
    var responseBuilder = function (request, response) {
        return {
            request: request,
            response: response
        }
    };

    // POST-Ajax
    var ResultPost = function postQuery(data, restin, method) {
        $.ajax({
            type: 'POST',
            url: UrlConfig.getBaseURI() + restin + '/' + method,
            data: data,
            dataType: 'json',
            xhrFields: {
                'Access-Control-Allow-Origin': UrlConfig.getBaseURI(),
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'withCredentials': true
            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (result) {
                if (result != null) {
                    callback(responseBuilder(data, result));
                } else {
                    callback(responseBuilder(data, '响应错误'));
                }
            },
            error: function (jqXHR, textStatus) {
                callback(responseBuilder(data, jqXHR.responseText, 0, textStatus));
            }
        });
    };

    // GET-Ajax
    var ResultGet = function getQuery(data, restin, method) {
        $.ajax({
            url: UrlConfig.getBaseURI() + restin + '/' + method,
            type: "GET",
            data: data,
            timeout: 0,
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                if (result != null) {
                    callback(responseBuilder(data, result));
                } else {
                    callback(responseBuilder(data, '响应错误'));
                }
            },
            error: function (jqXHR, textStatus) {
                callback(responseBuilder(data, jqXHR.responseText, 0, textStatus));
            }
        });
    };
}
