

(function($){
    var pageSize = 10;
    var nowPage = 1;
    var tableData = [];
    var searchWord = "";

    function init () {
        bindEvent();
        $('#menu > dd').eq(0).trigger('click');
    }
    function bindEvent() {
        // 左侧菜单切换事件
        $('#menu').on('click', 'dd',function (e) {
            $('#menu > dd.active').removeClass('active');
            $(this).addClass('active');
            var id = $(this).attr('data-id');
            // console.log($(this).data('id'))
            if (id == 'student-list') {
                getTableData(nowPage);
                $('#add-student-form')[0].reset();
            }
            $('.content').fadeOut();
            $('#' + id).fadeIn();
        }); 
        // 编辑学生提交->mode层始终存在，因此可在此绑定事件 -> 源码底层调用$.swap();将display:none进行了转换
        $('#edit-submit').click(function (e) {
            e.preventDefault();//表单默认get方式直接提交(刷新页面),其不会执行下面的代码 ->阻止默认行为
            var data = $('#edit-student-form').serialize();//获取表单数据[对象形式]，serializeArray();//数组形式
            transferData('/api/student/updateStudent', data, function() {
                alert('修改成功');
                $('#modal').slideUp();
                $('#menu > dd[data-id=student-list]').trigger('click');
            });
        });
        // 新增学生提交 
        $('#add-submit').click(function(e) {
            e.preventDefault();
            var data = $('#add-student-form').serialize();
            transferData('/api/student/addStudent', data, function() {
                alert('提交成功');
                $('#add-student-form')[0].reset();//表单内容进行重置为默认值
                $('#menu > dd[data-id=student-list]').trigger('click');
            });
        });
        // 搜索过滤功能
        $('#search-submit').click(function(e) {
            var value = $('#search-word').val();
            // 如果搜索框里面没有内容 则调用findByPage接口
            nowPage = 1;
            if (!value) {
                getTableData(nowPage);
                return false;
            }
            searchWord = value;
            // 有内容则 让其获取searchStudent接口数据数据 
            getSearchTableData();
        })

    }
    // 绑定表格编辑等事件
    function bindTableEvent() {
        // 编辑事件
        $('.edit').click(function (e) {
            var index = $(this).data('index');
            $('#modal').slideDown();
            initEditForm(tableData[index]);
        });
        $('.modal-content').click(function(e) {
            e.stopPropagation();
        })
        $('#modal').click(function(e) {
            $('#modal').slideUp();
        });
        // 删除事件
        $('.del').click(function(e) {
            var index = $(this).data('index');
            var isDel = window.confirm('确认删除？');
            var sNo = tableData[index].sNo;
            if (isDel) {
                transferData('/api/student/delBySno', {
                    sNo: sNo
                }, function (req) {
                    alert('删除成功');
                    $('#menu > dd[data-id=student-list]').trigger('click');
                });
            }
        })
    }
    // 获取表格数据
    function getTableData(page) {
        transferData('/api/student/findByPage',{
            page: page,
            size: pageSize
        }, function(req) {
            // 总页数
            allPage = Math.ceil(req.data.cont / pageSize);
            // 添加翻页
            $('#turn-page').turnPage({
                allPage: allPage,
                curPage: page,
                // 改变页码时触发函数  重新获取搜索后的表格数据
                changePage: function (page) {
                    nowPage = page;
                    getTableData(page);
                }
            });
            // 渲染数据
            renderTable(req.data.findByPage);
        });
    }
    // 搜索
    function getSearchTableData() {
        transferData("/api/student/searchStudent", {
            sex: -1,
            search: searchWord,
            page: nowPage,
            size: pageSize,
        }, function (req) {
            // 总页数
            var allPage = Math.ceil(req.data.cont / pageSize);
            // 插入翻页插件
            $('#turn-page').turnPage({
                curPage: nowPage,
                allPage: allPage,
                // 切换页码时触发函数  要重新获取数据 并且当前页码保存
                changePage: function (page) {
                    nowPage = page;
                    getSearchTableData();
                }
            });
            // 渲染表格数据
            renderTable(req.data.searchList);
        });
    }
    // 编辑按钮回填数据
    function initEditForm(data) {
        var editForm = $('#edit-student-form')[0];
        // console.log(data);
        for (var prop in data) {
            if (editForm[prop]) {
                editForm[prop].value = data[prop];
            }
        }
    }
    // 渲染表格数据
    function renderTable(data) {
        tableData = data;
        var str = '';
        data.forEach(function (item, index) {
            str += '<tr>\
                <td>' + item.sNo + '</td>\
                <td> ' + item.name + ' </td>\
                <td>' + (item.sex ? '女' : '男') + '</td>\
                <td> ' + item.email + '</td>\
                <td>' + ( new Date().getFullYear() - item.birth) +'</td>\
                <td> ' + item.phone + '</td>\
                <td> ' + item.address + '</td>\
                <td>\
                    <button class="btn edit" data-index=' + index + '>编辑</button>\
                    <button class="btn del" data-index=' + index + '>删除</button>\
                </td>\
            </tr>';
        });
        $('#student-body').html(str);
        bindTableEvent();//表格渲染完成才能绑定“编辑”表格事件
    }
    // 获取后台数据
    function transferData(api, data, callback) {
        if ($.type(data) == 'string') {
            data += "&appkey=dongmeiqi_1547441744650";
        } else {
            data = $.extend(data, {
                appkey: 'dongmeiqi_1547441744650'
                // appkey: 'PaulMing_1551928268954',
            });
        }
        $.ajax({
            type: 'get',
            url: 'http://api.duyiedu.com' + api,
            data: data,
            dataType: 'json',
            success: function (req) {
                if (req.status == 'success') {
                    callback(req);
                } else {
                    alert(req.msg);
                }
            }
        });
    }
    init();
})(jQuery)
